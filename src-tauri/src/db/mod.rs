extern crate dotenv;

use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenv::dotenv;
use std::env;

pub mod models;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

pub fn establish_connection() -> SqliteConnection {
  dotenv().ok();

  let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
  SqliteConnection::establish(&database_url)
    .unwrap_or_else(|_| panic!("Error connection to {}", database_url))
}

pub fn run_migration(conn: &mut SqliteConnection) {
  conn.run_pending_migrations(MIGRATIONS).unwrap();
}
