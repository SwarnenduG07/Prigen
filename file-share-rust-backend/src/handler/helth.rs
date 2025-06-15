use std::{sync::Arc, time::Instant};

use axum::{http::StatusCode, response::IntoResponse, routing::get, Extension, Router, Json};

use crate::AppState;

pub fn health_handler() -> Router {
    Router::new().route("/health", get(health_check))
}

pub async fn health_check(Extension(app_state): Extension<Arc<AppState>>) -> impl IntoResponse {
    let db_client = &app_state.db_client;
    let db_time = Instant::now();
    let result = db_client.get_users().await;

    let db_duration = db_time.elapsed();

    let response = json!({
        "status": "ok",
        "db_time": db_duration.as_millis(),
    });

    (StatusCode::OK, Json(response))
}