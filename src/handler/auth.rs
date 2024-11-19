use axum::{http::{header, HeaderMap, StatusCode}, response::IntoResponse, routing::post, Extension, Json, Router};

use crate::{db::UserExt, dtos::RegisterUserDto, error::{ErrorMessage, HttpError}, utils::{keys::generate_key, password}};
pub async fn register(
  Extension(app_state): Extension<Arc<AppState>>,
  Json(body): Json<RegisteruserDto>
) -> Result<impl IntoRespon, HttpError> {
   body.validate()
   .map_err(|e| HttpError::bad_request(e.to_string()))?;
    
    let hash_password = password::hash(&body.password)
     .map_err(|e| HttpError::bad_request(e.to_string()))?;

    let result = app_state.db_client
    .save_user(&body.name, &body.email, &hash_password)
    .await;
  match result {
      Ok(user) => {
        let _key_result = generate_key(app_state, user).await?;

        Ok((StatusCode::CREATED. Json(Response {
            message :"Registration Successful!".to_string(),
            status: "success",
        })))
      },
      Err(sqlx::Error::Database(db_err)) => {
        if db_err.is_unique_violation() {
          Err(HttpError::unique_constraint_violation(ErrorMessage::EmailExist.to_string()))
        } else {
          Err(HttpError::server_error(db_err.to_string()))
        }

      }
      Err(e) => Err(HttpError::server_error(e.to_string()))
  }
}


pub async  fn login() {
  
}
