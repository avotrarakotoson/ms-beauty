use crate::AppState;
use tauri::{command, State};
use crate::dtos::{CreateSalePayload};
use crate::sale;

#[command]
pub fn create_sale_prestation(payload: CreateSalePayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating sale prestation...");
  let sale_prestation = sale::create(&mut conn, payload).unwrap();

  serde_json::to_string(&sale_prestation).unwrap()
}

#[command]
pub fn get_all_sales(state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let sale_prestation = sale::list(&mut conn).unwrap();

  serde_json::to_string(&sale_prestation).unwrap()
}

#[command]
pub fn get_all_sale_by_customer_id(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let all_sale_by_customer_id = sale::list_by_customer_id(&mut conn, id).unwrap();

  serde_json::to_string(&all_sale_by_customer_id).unwrap()
}
