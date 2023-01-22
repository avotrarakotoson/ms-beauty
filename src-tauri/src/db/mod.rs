extern crate dotenv;

use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenv::dotenv;
use std::env;
use std::path;
use std::fs;

pub mod models;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

pub fn establish_connection() -> SqliteConnection {
  dotenv().ok();

  let _env = env::var("MS_BEAUTY_ENV");

  match _env {
    Ok(_env) => {

      let database_url = &env::var("DATABASE_URL").unwrap();

      SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", &database_url))
    }
    Err(_) => {
      println!("no MS_BEAUTY_ENV");

      let database_path = path::Path::new(&tauri::api::path::home_dir().unwrap()).join(".ms-beauty");
      fs::create_dir_all(database_path.to_str().clone().unwrap());

      let database_url = database_path.join("stores.db");
      let database_url = database_url.to_str().clone().unwrap();

      SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", &database_url))
    }
  }
}

pub fn run_migration(conn: &mut SqliteConnection) {
  conn.run_pending_migrations(MIGRATIONS).unwrap();
}
