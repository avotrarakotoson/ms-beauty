extern crate dotenv;

use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenv::dotenv;
use std::env;
use std::io;
use std::path;
use std::fs;

pub mod models;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");
pub const DATABASE_NAME: &str = "store.db";

pub fn establish_connection_and_migrate_database() -> SqliteConnection {
  dotenv().ok();

  let env = env::var("DATABASE_URL");
  let database_url;

  match env {
    Ok(env) => {
      database_url = env;
    }
    Err(_) => {
      println!("no MS_BEAUTY_ENV");
      database_url = self::create_database_folder().unwrap();
    }
  }

  let mut conn = SqliteConnection::establish(&database_url)
    .expect(&format!("Error connecting to {}", &database_url));

  conn.run_pending_migrations(MIGRATIONS).unwrap();

  return conn;
}

pub fn create_database_folder() -> Result<String, io::Error> {
  let database_path = path::Path::new(&tauri::api::path::home_dir().unwrap()).join(".ms-beauty");
  fs::create_dir_all(database_path.to_str().clone().unwrap())?;

  Ok(database_path.join(DATABASE_NAME).as_os_str().to_str().unwrap().to_string())
}