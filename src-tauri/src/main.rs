#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use diesel::SqliteConnection;
use std::env;
use std::{sync::Mutex};

pub mod omb;
pub mod db;
pub mod schema;
pub mod dtos;
pub mod customer;
pub mod item;
pub mod prestation;
pub mod sale;
pub mod agenda;
pub mod cmd;

pub struct AppState {
  conn: Mutex<SqliteConnection>,
}

fn main() {
  let conn = db::establish_connection_and_migrate_database();

  let state = AppState {
    conn: Mutex::new(conn),
  };

  let context = tauri::generate_context!();
  let app = tauri::Builder::default()
      .manage(state)
      .invoke_handler(tauri::generate_handler![
        cmd::customer::get_all_customer,
        cmd::customer::get_customer,
        cmd::customer::create_customer,
        cmd::customer::update_customer,
        cmd::customer::delete_customer,
        cmd::item::get_all_item,
        cmd::item::get_item,
        cmd::item::create_item,
        cmd::item::delete_item,
        cmd::prestation::get_all_prestation,
        cmd::prestation::get_prestation,
        cmd::prestation::create_prestation,
        cmd::prestation::update_prestation,
        cmd::prestation::delete_prestation,
        cmd::sale_prestation::create_sale_prestation,
        cmd::sale_prestation::get_all_sales,
        cmd::sale_prestation::get_all_sale_by_customer_id,
        cmd::agenda::create_agenda,
        cmd::agenda::get_all_agendas,
        cmd::agenda::get_all_agenda_by_customer_id,
        cmd::agenda::get_agenda_date,
      ])
      .plugin(omb::fs::FsExtra::default())
      .build(context)
      .expect("error while running Ms Beauty application");

  app.run(|_app_handle, event| match event {
      _ => {}
  });
}
