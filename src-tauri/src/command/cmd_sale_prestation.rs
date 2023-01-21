use crate::AppState;
use crate::dtos::{CreateSalePayload};
use crate::sale;
use chrono::NaiveDateTime;

#[tauri::command]
pub fn create_sale_prestation(payload: CreateSalePayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating sale prestation...");
  let result = sale::create(&mut conn, payload);
  let sale_prestation = result.unwrap();

  serde_json::to_string(&sale_prestation).unwrap()
}

#[tauri::command]
pub fn get_all_sales(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let result = sale::list(&mut conn);
  let sale_prestation = result.unwrap();

  serde_json::to_string(&sale_prestation).unwrap()
}

#[tauri::command]
pub fn get_all_sale_by_customer_id(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let result = sale::list_by_customer_id(&mut conn, id);
  let all_sale_by_customer_id = result.unwrap();

  serde_json::to_string(&all_sale_by_customer_id).unwrap()
}