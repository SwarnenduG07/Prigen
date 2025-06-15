use std::{sync::Arc, time::Instant};

use axum::{http::StatusCode, response::IntoResponse, routing::get, Extension, Router, Json};
use serde_json::json;

use crate::AppState;

pub fn health_handler() -> Router {
    Router::new().route("/health", get(health_check))
}

pub async fn health_check(
    Extension(app_state): Extension<Arc<AppState>>
) -> impl IntoResponse {
    let db_time = Instant::now();
    
    let db_result = match app_state.db_client.execute("SELECT 1").await {
        Ok(_) => "connected",
        Err(_) => "disconnected"
    };

    let db_duration = db_time.elapsed();

    let response = json!({
        "status": "ok",
        "database": db_result,
        "db_time": db_duration.as_millis(),
    });

    (StatusCode::OK, Json(response))
}