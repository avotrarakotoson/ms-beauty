use crate::AppState;
use tauri::{command, State};
use crate::dtos::{CreatePrestationPayload, UpdatePrestationPayload};
use crate::prestation;

#[command]
pub fn get_all_prestation(state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting all prestations...");
  let prestations = prestation::list(&mut conn).unwrap();

  serde_json::to_string(&prestations).unwrap()
}

#[command]
pub fn get_prestation(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start getting prestation...");
  let prestation = prestation::toggle(&mut conn, id).unwrap();

  serde_json::to_string(&prestation).unwrap()
}

#[command]
pub fn create_prestation(payload: CreatePrestationPayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating prestation...");
  let prestation = prestation::create(&mut conn, payload).unwrap();

  serde_json::to_string(&prestation).unwrap()
}

#[command]
pub fn update_prestation(payload: UpdatePrestationPayload, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start updating prestation...");
  prestation::update(&mut conn, payload).expect("Couldn't update prestation");

  String::from("true")
}

#[command]
pub fn delete_prestation(id: i32, state: State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start deleting prestation...");
  prestation::delete(&mut conn, id).expect("Couldn't delete prestation");
  String::from("true")
}
