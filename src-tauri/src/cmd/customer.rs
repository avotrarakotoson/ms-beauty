use tauri::{command, State};
use crate::AppState;
use crate::dtos::{CreateCustomerPayload, UpdateCustomerPayload};
use crate::customer;


#[command]
pub fn get_all_customer(state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all customers...");
  let customers = customer::list(&mut conn).unwrap();

  serde_json::to_string(&customers).unwrap()
}

#[command]
pub fn get_customer(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting customer...");
  let customer = customer::toggle(&mut conn, id).unwrap();

  serde_json::to_string(&customer).unwrap()
}

#[command]
pub fn create_customer(payload: CreateCustomerPayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating customer...");
  let customer = customer::create(&mut conn, payload).unwrap();

  serde_json::to_string(&customer).unwrap()
}

#[command]
pub fn update_customer(payload: UpdateCustomerPayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start updating customer...");
  customer::update(&mut conn, payload).expect("Couldn't update customer");
  String::from("true")
}

#[command]
pub fn delete_customer(id: i32, state: State<AppState>) -> String {
    let mut conn = state.conn.lock().unwrap();
    println!("Start deleting customer...");
    customer::delete(&mut conn, id).expect("Couldn't detele customer");
    String::from("true")
}
