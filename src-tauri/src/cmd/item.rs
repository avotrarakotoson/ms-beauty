use tauri::{command, State};
use crate::AppState;
use crate::dtos::{CreateItemPayload};
use crate::item;

#[command]
pub fn get_all_item(state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all items...");
  let items = item::list(&mut conn).unwrap();

  serde_json::to_string(&items).unwrap()
}

#[command]
pub fn get_item(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting item...");
  let item = item::toggle(&mut conn, id).unwrap();

  serde_json::to_string(&item).unwrap()
}

#[command]
pub fn create_item(payload: CreateItemPayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating item...");
  let item = item::create(&mut conn, payload).unwrap();

  serde_json::to_string(&item).unwrap()
}

#[command]
pub fn delete_item(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start deleting item...");
  item::delete(&mut conn, id).expect("Couldn't delete item");
  String::from("true")
}
