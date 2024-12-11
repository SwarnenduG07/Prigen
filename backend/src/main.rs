
use axum::{http::{header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}, HeaderValue, Method}, Router};
use config::Config;
use db::{DbCLient, UserExt};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::CorsLayer;
use tracing_subscriber::filter::LevelFilter;
use tokio_cron_scheduler::{JobScheduler, Job};

mod config;
mod model;
mod dtos;
mod error;
mod db;
mod utils;
mod handler;
mod middleware;
mod router;

#[derive(Debug, Clone)]

pub struct AppState {
    pub env: Config,
    pub db_client: DbCLient
}


#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
    .with_max_level(LevelFilter::DEBUG)
    .init();

    dotenv().ok();

    let config = Config::init();
    let pool = match PgPoolOptions::new()
    .max_connections(10)
    .connect(&config.database_url)
    .await {
        Ok(pool) => {
            println!("Connection to db is succesfull! 🤝");
            pool
        }
        Err(err) => {
            println!("Fialed to connect to the database: {:?}", err);
            std::process::exit(1)
        }
    };
   let cors = CorsLayer::new()
   .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
   .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE])
   .allow_credentials(true)
   .allow_methods([Method::GET, Method::POST, Method:: PUT]);

   let db_client = DbCLient::new(pool);
   let app_state = AppState {
    env: config.clone(),
    db_client: db_client.clone(),
   };
   let sched  = JobScheduler::new().await.unwrap();

   let job = Job::new_async("0 0 * * * *", {
      move |_, _| {
        let db_client = db_client.clone();
        Box::pin(async move {
            println!("Running scheduled taskto delete expired files...");
            if let Err(err) = db_client.delete_expired_files().await {
                eprintln!("Error deleting expired file: {:?}", err);
            } else {
                 println!("Successfulley deleted ecpired files")
            }
        })
      }
   }).unwrap();
   sched.add(job).await.unwrap();

   tokio::spawn(async move {
      sched.start().await.unwrap();
   });

   let app = Router::new().layer(cors.clone());
   println!(
    "{}" , 
    format!("Server is running on http://localhost:{}", config.port)
   );
   let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", &config.port))
   .await.unwrap();
axum::serve(listener, app).await.unwrap();
}
