use crate::AppState;
use crate::dtos::{CreateAgendaPayload};
use crate::agenda;

#[tauri::command]
pub fn create_agenda(payload: CreateAgendaPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating agenda...");
  let result = agenda::create(&mut conn, payload);
  let agenda = result.unwrap();

  serde_json::to_string(&agenda).unwrap()
}

#[tauri::command]
pub fn get_all_agendas(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let result = agenda::list(&mut conn);
  let agendas = result.unwrap();

  serde_json::to_string(&agendas).unwrap()
}

#[tauri::command]
pub fn get_all_agenda_by_customer_id(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let result = agenda::list_by_customer_id(&mut conn, id);
  let all_agenda_by_customer_id = result.unwrap();

  serde_json::to_string(&all_agenda_by_customer_id).unwrap()
}