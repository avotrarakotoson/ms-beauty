use serde::{Deserialize, Serialize};
use std::{string::String};
use chrono::NaiveDateTime;
use crate::db::models::{SaleDetails, AgendaDetails};

// Customer DTO
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreateCustomerPayload {
  pub last_name: String,
  pub first_name: Option<String>,
  pub gender: String,
  pub dob: String,
  pub email: Option<String>,
  pub primary_phone: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct UpdateCustomerPayload {
  pub customer: CreateCustomerPayload,
  pub id: i32,
}

// Item DTO
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreateItemPayload {
  pub label: String,
}

// Prestation DTO
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreatePrestationPayload {
  pub title: String,
  pub description: Option<String>,
  pub items: String,
  pub rate: f32,
  pub currency: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct UpdatePrestationPayload {
  pub prestation: CreatePrestationPayload,
  pub id: i32,
}

// Sale DTO
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreateSalePayload {
  pub sale_date: i64,
  pub amount: f32,
  pub reduction: f32,
  pub customer_id: i32,
  pub items: Vec<SaleDetailPayload>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct SaleDetailPayload {
  pub title: String,
  pub items: String,
  pub rate: f32,
  pub currency: String,
}

#[derive(Debug, Serialize, Clone)]
pub struct SaleDto {
  pub id: i32,
  pub sale_date: NaiveDateTime,
  pub amount: f32,
  pub reduction: Option<f32>,
  pub customer_id: i32,
  pub full_name: String,
  pub items: Vec<SaleDetails>,
}

// Agenda DTO
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreateAgendaPayload {
  pub agenda_date: String,
  pub comment: String,
  pub customer_id: i32,
  pub prestations: Vec<AgendaDetailPayload>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct AgendaDetailPayload {
  pub title: String,
  pub items: String,
}

#[derive(Debug, Serialize, Clone)]
pub struct AgendaDto {
  pub id: i32,
  pub agenda_date: String,
  pub comment: Option<String>,
  pub customer_id: i32,
  pub full_name: String,
  pub prestations: Vec<AgendaDetails>,
}

#[derive(Deserialize, Debug)]
pub struct AgendaFilter {
  pub is_next: bool,
  pub customer_id: i32,
}