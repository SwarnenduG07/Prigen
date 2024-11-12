use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use time::util;
use validator::Validate;

use crate::model::{ReciveFileDetails, SendFileDetails, User};



#[derive(Validate,Debug, Default, Clone, Serialize, Deserialize)]
pub struct RegisterUserDto {
    #[validate(length(min = 1, message = "Name is requires"))]
    pub name: String,
    #[validate(
        length(min = 1, message="Email is required"),
        email(message = "Email is invalid")
    )]
    pub email: String,
    #[validate(
        length(min = 6, message = "Password must be at least 6 characters")
    )]
    pub password: String,

    #[validate(
        length(min = 1, message = "Confirm Password is required"),
        must_match(other="password", message="Passwords do not match")
    )]
    pub password_confirm: String,
}
#[derive(Validate,Debug, Default, Clone, Serialize, Deserialize)]


pub struct LoginUserDto {
    #[validate(
        length(min = 1, message = "Email is required"),
        email(message = "Email is invalid")
    )]
    pub email: String,
    #[validate(
        length(min = 6, message = "Passowd must be at least 6 characters")
    )]
    pub password:String,
}

 #[derive(Serialize,Deserialize,Validate)]
 pub struct RequestQueryDto {
    #[validate(
        range(min =1)
    )]
    pub Page: Option<usize>,
    #[validate(range(min = 1, max = 50))]
    pub limit: Option<usize>,
 }

 #[derive(Serialize,Deserialize,Debug)]

 pub struct FilterUserDto {
    pub id: String,
    pub name:String,
    pub email: String,
    pub public_key: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
 }

 impl FilterUserDto {
     pub fn filter_user(user: &User) -> Self {
          FilterUserDto {
            id: user.id.to_string(),
            name: user.name.to_owned(),
            email: user.email.to_owned(),
            public_key: user.public_key.to_owned(),
            created_at:user.created_at.unwrap(),
            updated_at: user.updated_at.unwrap()
          }
     }
 }

 #[derive(Debug, Serialize, Deserialize)] 
 pub struct UserData {
    pub user: FilterUserDto,
 } 
 #[derive(Debug, Serialize, Deserialize)]

 pub struct userResponseDto {
     pub status: String,
     pub data: UserData
 }

 #[derive(Debug, Serialize,Deserialize)]
  pub struct UserSendFileDto {
    pub file_id: String,
    pub file_name: String,
    pub recipient_email: String,
    pub expiration_date: DateTime<Utc>,
    created_at: DateTime<Utc>
  }

impl UserSendFileDto {
    pub fn filter_send_user_file(file_data: &SendFileDetails) -> Self {
        UserSendFileDto {
            file_id: file_data.file_id.to_string(),
            file_name: file_data.file_name.to_owned(),
            recipient_email: file_data.recipient_email.to_owned(),
            expiration_date: file_data.expiration_data.unwrap(),
            created_at: file_data.created_at.unwrap()
        }
    }
    pub fn filter_send_user_files(user: &[SendFileDetails]) -> Vec<UserSendFileDto> {
        user.iter().map(UserSendFileDto::filter_send_user_file).collect()
    }
}  

#[derive(Debug, Serialize, Deserialize)]

pub struct UserReceiveFileDto {
    pub file_id: String,
    pub file_name: String,
    pub sender_email: String,
    pub expiration_date: DateTime<Utc>,
    pub created_at: DateTime<Utc>
}
impl UserReceiveFileDto {
    pub fn filter_receive_user_file(file_data: &ReciveFileDetails) -> Self {
        UserReceiveFileDto {
            file_id: file_data.file_id.to_string(),
            file_name: file_data.file_name.to_owned(),
            sender_email: file_data.sender_email.to_owned(),
            expiration_date: file_data.expiration_data.unwrap(),
            created_at: file_data.created_at.unwrap(),
        }
    }
    fn filter_receive_user_files(user : &[ReciveFileDetails]) -> Vec<UserReceiveFileDto> {
        user.iter().map(UserReceiveFileDto::filter_receive_user_file).collect()
    }
}