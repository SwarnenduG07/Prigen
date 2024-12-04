use std::sync::Arc;

use axum::{extract::Query, response::IntoResponse, routing::{get, put}, Extension, Json, Router};
use validator::Validate;

use crate::{db::UserExt, dtos::{EmailListResponseDto, FilterEmailDto, FilterUserDto, NameUpdateDto, Response, SearchQueryByEmailDTO, UserData, UserPasswordUpdateDto, UserResponseDto}, error::{ErrorMessage, HttpError}, middleware::JWTAuthMiddeware, utils::password, AppState};


pub async fn get_me(
    Extension(_app_state): Extension<Arc<AppState>>,
    Extension(user): Extension<JWTAuthMiddeware>,
) -> Result<impl IntoResponse, HttpError> {
    let filtered_user =FilterUserDto::filter_user(&user.user);
    let response_data = UserResponseDto {
        status: "success".to_string(),
        data: UserData {user: filter_user},
    };
    ok(Json(response_data))
}           

pub async fn update_user_name(
    Extension(_app_state): Extension<Arc<AppState>>,
    Extension(user): Extension<JWTAuthMiddeware>,
    Json(body): Json<NameUpdateDto>
) -> Result<impl IntoResponse, HttpError> {
     body.Validate()
     .map_err(|e| HttpError::bad_request(e.to_string()))?;

     let user = &user.user;
     let user_id = uuid:Uuid::parse_str(&user.id.to_string()).unwrap();


     let result = app_state.db_client
                    .update_user_name(user_id.clone(), &body.name)
                    .await
                    .map_err(|e| HttpError::server_error(e.to_string()))?;

                    let filter_user = FilterUserDto::filter_user(&result);

                    let response = UserResponseDto {
                        status: "success".to_string(),
                        data: UserData {user: filter_user},
                    };
                    Ok(Json(response))
}