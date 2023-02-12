use tauri::{command};
use crate::AppState;
use crate::dtos::{CreateAgendaPayload, AgendaFilter};
use crate::agenda;

#[command]
pub fn create_agenda(payload: CreateAgendaPayload, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  println!("Start creating agenda...");
  let result = agenda::create(&mut conn, payload);
  let agenda = result.unwrap();

  serde_json::to_string(&agenda).unwrap()
}

#[command]
pub fn get_all_agendas(state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let agendas = agenda::list(&mut conn).unwrap();

  serde_json::to_string(&agendas).unwrap()
}

#[command]
pub fn get_all_agenda_by_customer_id(id: i32, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let agendas_by_customer_id = agenda::list_by_customer_id(&mut conn, id).unwrap();

  serde_json::to_string(&agendas_by_customer_id).unwrap()
}

#[command]
pub fn get_agenda_date(filter: AgendaFilter, state: tauri::State<AppState>) -> String {
  let mut conn = state.conn.lock().unwrap();
  let agenda_date  = agenda::last_or_next_meet_date_customer(&mut conn, filter).unwrap();

  serde_json::to_string(&agenda_date).unwrap()
}
