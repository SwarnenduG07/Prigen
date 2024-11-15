use config::Config;
use db::DbCLient;
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions};
use tracing_subscriber::filter::LevelFilter;

mod config;
mod model;
mod dtos;
mod error;
mod db;

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

}
