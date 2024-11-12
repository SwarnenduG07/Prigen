use serde::{Deserialize, Serialize};
use validator::Validate;



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

pub  struct LoginUserDto {
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
