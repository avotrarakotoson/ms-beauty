use crate::AppState;
use crate::dtos::{CreateItemPayload};
use crate::item;

#[tauri::command]
pub fn get_all_item(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all items...");
  item::list(&mut conn)
}

#[tauri::command]
pub fn get_item(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting item...");
  item::toggle(&mut conn, id).to_string()
}

#[tauri::command]
pub fn create_item(payload: CreateItemPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating item...");
  let result = item::create(&mut conn, payload);
  let item = result.unwrap();

  serde_json::to_string(&item).unwrap()
}

#[tauri::command]
pub fn delete_item(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start deleting item...");
  item::delete(&mut conn, id).expect("Couldn't delete item");
  String::from("true")
}