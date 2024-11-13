use std::fs::File;

use axum::async_trait;
use chrono::{DateTime, Utc};
use sqlx::{ Pool, Postgres};
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

    async fn swarch_by_email(&self, user_id: Uuid, query:String) -> Result<Vec<User>, sqlx::Error>;

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