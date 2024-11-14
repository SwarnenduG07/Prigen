use std::fs::File;

use axum::async_trait;
use chrono::{DateTime, Utc};

use sqlx::{Pool, Postgres};
use uuid::Uuid;

use crate::model::{ReciveFileDetails, SendFileDetails, ShareLink, User};



#[derive(Debug, Clone)]
pub struct DbCLient {
    pool: Pool<Postgres>,
}

impl DbCLient {
    pub fn new(pool : Pool<Postgres>) -> Self {
        DbCLient { pool }
    }
}

#[async_trait]
pub trait UserExt {
    async fn get_user(
       &self,
       user_id: Option<Uuid>,
       name: Option<&str>,
       email : Option<&str>,
    ) -> Result<Option<User>, sqlx::Error>;

    async  fn save_user<T: Into<String> + Send>(
        &self,
        name: T,
        email:T,
        password: T,
    ) -> Result<User, sqlx::Error>;

    async fn update_user_name<T: Into<String> + Send>(
        &self,
        user_id: Uuid,
        name: T,
    ) -> Result<User,sqlx::Error>;
    async fn update_user_password(
        &self,
        user_id: Uuid,
        password: String,
    ) -> Result<User, sqlx::Error>;

    async fn save_user_key(&self, user_id: Uuid, public_key: String) -> Result<(), sqlx::Error>;

    async fn search_by_email(&self, user_id: Uuid, query:String) -> Result<Vec<User>, sqlx::Error>;

    async fn save_encrypted_file(&self, user_id: Uuid,
    file_name: String,
    file_size :i64,
    recipient_user_id: Uuid,
    password: String,
    expiration_date: DateTime<Utc>,
    encrypted_aes_key: Vec<u8>,
    encrypted_file: Vec<u8>,
    iv: Vec<u8>
) -> Result<(), sqlx::Error>;

async fn get_shared(
    &self,
    shared_id: Uuid,
    user_id: Uuid,
) -> Result<Option<ShareLink>, sqlx::Error>;
 async  fn get_file(
    &self,
    fle_id: Uuid,
 ) -> Result<Option<File>,sqlx::Error>;

 async fn get_sent_files(
    &self,
    file_id: Uuid,
    page: u32,
    limit: usize
 ) -> Result<(Vec<SendFileDetails>, i64), sqlx::Error>;

 async fn get_receive_files(
    &self,
    user_id: Uuid,
    page: u32,
    limit: usize,
 ) -> Result<(Vec<ReciveFileDetails>, i64), sqlx::Error>;

 async fn delete_expired_files(
    &self
 ) -> Result<(), sqlx::Error>;

}

#[async_trait]
impl UserExt for DbCLient {
    async fn get_user(
        &self,
        user_id: Option<Uuid>,
        name: Option<&str>,
        email: Option<&str>,
    ) -> Result<Option<User>, sqlx::Error> {
        let mut user: Option<User> = None;

        if let Some(user_id) = user_id {
            user = sqlx::query_as!(
                User,
                r#"SELECT id, name, email, password, public_key, created_at, updated_at FROM users WHERE id = $1"#,
                user_id
            )
            .fetch_optional(&self.pool)
            .await?;
        } else if let Some(name) = name {
            user = sqlx::query_as!(
                User,
                r#"SELECT id, name, email, password, public_key, created_at, updated_at FROM users WHERE name = $1"#,
                name
            )
            .fetch_optional(&self.pool)
            .await?;
        } else if let Some(email) = email {
            user = sqlx::query_as!(
                User,
                r#"SELECT id, name, email, password, public_key, created_at, updated_at FROM users WHERE email = $1"#,
                email
            )
            .fetch_optional(&self.pool)
            .await?;
        }

        Ok(user)
    }

    async fn save_user<T: Into<String> + Send>(
        &self,
        name: T,
        email: T,
        password: T,
    ) -> Result<User, sqlx::Error> {
        let user = sqlx::query_as!(
            User,
            r#"
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, password, public_key, created_at, updated_at
            "#,
            name.into(),
            email.into(),
            password.into()
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(user)
    }

    async fn update_user_name<T: Into<String> + Send> (
        &self,
        user_id: Uuid,
        new_name: T,
    ) -> Result<User, sqlx::Error>  {
        let user = sqlx::query_as!(
           User,
           r#"
            UPDATE users
            SET name = $1, updated_at = Now()
            WHERE id = $2
            RETURNING id, name, email, password, public_key, created_at, updated_at
           "#,
           new_name.into(),
           user_id
        )
        .fetch_one(&self.pool).await?;
    Ok(user)
    }
   async fn update_user_password(
    &self,
    user_id: Uuid,
    new_password: String,
   ) -> Result<User, sqlx::Error> {
    let user = sqlx::query_as!(
        User,
        r#"
        UPDATE users
        SET password = $1, updated_at = Now()
        WHERE id = $2
        RETURNING id, name, email, password, public_key, created_at, updated_at
        "#,
        new_password,
        user_id
    ).fetch_one(&self.pool).await?;

    Ok(user)
   }
   async fn save_user_key(&self, user_id: Uuid, public_key: String) -> Result<(), sqlx::Error> {
    sqlx::query_as!(
        User,
        r#"
        UPDATE users
        SET public_key = $1, updated_at = Now()
        WHERE id = $2
        RETURNING id, name, email, password, public_key, created_at, updated_at
        "#,
        public_key,
        user_id
    )
    .fetch_one(&self.pool)
    .await?;

    Ok(())
  }
  async fn search_by_email(
    &self,
    user_id: Uuid,
    query: String,
) -> Result<Vec<User>, sqlx::Error> {
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT id, name, email, password, public_key, created_at, updated_at
        FROM users
        WHERE email LIKE $1
        AND public_key IS NOT NULL
        AND id != $2
        "#,
        query,
        user_id
    )
    .fetch_all(&self.pool)
    .await?;

    Ok(user)
 }
 async fn save_encrypted_file(
    &self,
    user_id: Uuid,
    file_name:String,
    file_size: i64,
    recipient_user_id:  Uuid,
    passord: String,
    expiration_date: DateTime<Utc>,
    encrypted_aes_key: Vec<u8>,
    encrypted_file: Vec<u8>,
    iv: Vec<u8>
 ) -> Result<(), sqlx::Error> {
     let file_id: Uuid = sqlx::query_scalar!(
        r#"
        INSERT INTO files (user_id, file_name, file_size, encrypted_aes_key, encrypted_file, iv, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id
        "#,
        user_id,
        file_name,
        file_size,
        encrypted_aes_key,
        encrypted_file,
        iv
     ).fetch_one(&self.pool).await?;

     sqlx::query!(
        r#"
        INSERT INTO files ( file_id,recipient_user_id,password,expiration_date, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        "#,
        file_id,
        recipient_user_id,
        passord,
        expiration_date
     )
     .execute(&self.pool)
     .await?;
    Ok(())
 }
}