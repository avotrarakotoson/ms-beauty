use crate::AppState;
use crate::dtos::{CreateCustomerPayload, UpdateCustomerPayload};
use crate::customer;

#[tauri::command]
pub fn get_all_customer(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all customers...");
  customer::list(&mut conn)
}

#[tauri::command]
pub fn get_customer(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting customer...");
  let result = customer::toggle(&mut conn, id);
  let customer = result.unwrap();

  serde_json::to_string(&customer).unwrap()
}

#[tauri::command]
pub fn create_customer(payload: CreateCustomerPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating customer...");
  let result = customer::create(&mut conn, payload);
  let customer = result.unwrap();

  serde_json::to_string(&customer).unwrap()
}

#[tauri::command]
pub fn update_customer(payload: UpdateCustomerPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start updating customer...");
  customer::update(&mut conn, payload).expect("Couldn't update customer");

  String::from("true")
}

#[tauri::command]
pub fn delete_customer(id: i32, state: tauri::State<AppState>) -> String {
    let mut conn = state.conn.lock().unwrap();
    println!("Start deleting customer...");
    customer::delete(&mut conn, id).expect("Couldn't detele customer");
    String::from("true")
}