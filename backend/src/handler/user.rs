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
    
)