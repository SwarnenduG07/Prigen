use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use validator::{Validate, ValidationError};

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

#[derive(Debug, Serialize, Deserialize)]

pub struct UserReceiverFileListResponseDto {
    pub status: String,
    pub files: Vec<UserReceiveFileDto>,
    pub results: i64,
}

#[derive(Serialize, Deserialize)]

pub struct Response {
    pub status: &'static str,
    pub message: String,
}
#[derive(Validate,Debug, Serialize, Deserialize, Clone, Default)]
pub struct NameUpdateDto {
    #[validate(
        length(min = 1, message="Name is required")
    )]
    pub name : String
}

#[derive(Validate,Debug, Serialize, Deserialize, Clone, Default)]

pub struct UserPassowrdUpdateDto {
    #[validate(
        length(min = 6, message = "Password must contain 6 characters")
    )]
    pub new_passowrd: String,

    #[validate(
        length(min = 6, message = " new Password must contain 6 characters")
    )]
    pub new_passowrd_confirm: String,

    #[validate(
        length(min = 6, message = " Old Password must contain 6 characters")
    )]
    pub old_password: String
}
#[derive(Validate, Debug, Default, Clone, Serialize, Deserialize)]
pub struct SearchQueryByEmailDTO {
    #[validate(length(min = 1, message = "Query is requireed"))]
    pub query: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FilterEmailDto {
    pub email: String,
}

impl FilterEmailDto {
    pub fn filter_email(user: &User) -> Self {
        FilterEmailDto {
            email: user.email.to_owned(),
        }
    }

    pub fn filter_emails(user: &[User]) -> Vec<FilterEmailDto> {
        user.iter().map(FilterEmailDto::filter_email).collect()
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EmailListResponseDto {
    pub status: String,
    pub emails: Vec<FilterEmailDto>,
}

#[derive(Validate, Debug, Default, Clone, Serialize, Deserialize)]
pub struct FileUploadDtos {
    #[validate(email(message = "Invalid email format"))]
    pub recipient_email: String,

    #[validate(
        length(min = 6, message = "New password must be at least 6 characters")
    )]
    pub password: String,

    #[validate(custom = "validate_expiration_date")]
    pub expiration_date: String,
}

fn validate_expiration_date(expiration_date: &str) -> Result<(), ValidationError> {
    if expiration_date.is_empty() {
        let mut error = ValidationError::new("expiration_date_required");
        error.message = Some("Expiration date is required.".into());
        return Err(error);
    }

    let parsed_date = DateTime::parse_from_rfc3339(expiration_date)
        .map_err(|_| {
            let mut error = ValidationError::new("invalid_date_format");
            error.message = Some("Invalid date format. Expected format is YYYY-MM-DDTHH:MM:SS.ssssssZ.".into());
            error
        })?;

    let now = Utc::now();

    if parsed_date <= now {
        let mut error = ValidationError::new("expiration_date_future");
        error.message = Some("Expiration date must be in the future.".into());
        return Err(error);
    }

    Ok(())
}

#[derive(Validate, Debug, Default, Clone, Serialize, Deserialize)]
pub struct RetrieveFileDto {
    #[validate(length(min = 1, message = "Shared id is required"))]
    pub shared_id: String,

    #[validate(
        length(min = 6, message = "Password must be at least 6 characters")
    )]
    pub password: String,
}

