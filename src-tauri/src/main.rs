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

#[path = "db/models.rs"]
pub mod models;

#[path = "command/cmd_customer.rs"]
pub mod customer_command;

#[path = "command/cmd_item.rs"]
pub mod item_command;

#[path = "command/cmd_prestation.rs"]
pub mod prestation_command;

#[path = "command/cmd_sale_prestation.rs"]
pub mod sale_prestation_command;

#[path = "command/cmd_agenda.rs"]
pub mod agenda_command;

pub struct AppState {
  conn: Mutex<SqliteConnection>,
}

fn main() {
  let mut conn = db::establish_connection();
  db::run_migration(&mut conn);
  let state = AppState {
    conn: Mutex::new(conn),
  };

  let context = tauri::generate_context!();
  let app = tauri::Builder::default()
      .manage(state)
      .invoke_handler(tauri::generate_handler![
        customer_command::get_all_customer,
        customer_command::get_customer,
        customer_command::create_customer,
        customer_command::update_customer,
        customer_command::delete_customer,
        item_command::get_all_item,
        item_command::get_item,
        item_command::create_item,
        item_command::delete_item,
        prestation_command::get_all_prestation,
        prestation_command::get_prestation,
        prestation_command::create_prestation,
        prestation_command::update_prestation,
        prestation_command::delete_prestation,
        sale_prestation_command::create_sale_prestation,
        sale_prestation_command::get_all_sales,
        sale_prestation_command::get_all_sale_by_customer_id,
        agenda_command::create_agenda,
        agenda_command::get_all_agendas,
        agenda_command::get_all_agenda_by_customer_id,
      ])
      .plugin(omb::fs::FsExtra::default())
      .build(context)
      .expect("error while running Ms Beauty application");

  app.run(|_app_handle, event| match event {
      _ => {}
  });
}
