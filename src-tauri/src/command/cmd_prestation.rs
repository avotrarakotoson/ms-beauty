use crate::AppState;
use crate::dtos::{CreatePrestationPayload, UpdatePrestationPayload};
use crate::prestation;

#[tauri::command]
pub fn get_all_prestation(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all prestations...");
  prestation::list(&mut conn)
}

#[tauri::command]
pub fn get_prestation(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting prestation...");
  prestation::toggle(&mut conn, id).to_string()
}

#[tauri::command]
pub fn create_prestation(payload: CreatePrestationPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating prestation...");
  let result = prestation::create(&mut conn, payload);
  let prestation = result.unwrap();

  serde_json::to_string(&prestation).unwrap()
}

#[tauri::command]
pub fn update_prestation(payload: UpdatePrestationPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start updating prestation...");
  prestation::update(&mut conn, payload).expect("Couldn't update prestation");

  String::from("true")
}

#[tauri::command]
pub fn delete_prestation(id: i32, state: tauri::State<AppState>) -> String {
    let mut conn = state.conn.lock().unwrap();
    println!("Start deleting prestation...");
    prestation::delete(&mut conn, id).expect("Couldn't delete prestation");
    String::from("true")
}