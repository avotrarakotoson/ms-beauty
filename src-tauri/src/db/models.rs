use serde::{Serialize, Deserialize};
use diesel::prelude::*;
use chrono::NaiveDateTime;
use crate::schema::*;

// Customer
#[derive(Identifiable, Queryable, Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct Customer {
  pub id: i32,
  pub first_name: Option<String>,
  pub last_name: String,
  pub gender: String,
  pub dob: Option<String>,
  pub email: Option<String>,
  pub address: Option<String>,
  pub primary_phone: String,
  pub registry_date: NaiveDateTime,
}

#[derive(Insertable, AsChangeset, Serialize, Debug, Clone)]
#[diesel(table_name = customers)]
pub struct NewOrUpdateCustomer {
  pub first_name: String,
  pub last_name: String,
  pub gender: String,
  pub dob: String,
  pub email: String,
  pub primary_phone: String,
}

// Item
#[derive(Queryable, Serialize, Deserialize, PartialEq, Debug)]
pub struct Item {
  pub id: i32,
  pub label: String,
}

#[derive(Insertable, AsChangeset, Serialize, Debug, Clone)]
#[diesel(table_name = items)]
pub struct NewItem {
  pub label: String,
}

// Presatation
#[derive(Queryable, Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct Prestation {
  pub id: i32,
  pub title: String,
  pub items: String,
  pub description: Option<String>,
  pub rate: f32,
  pub currency: String,
}

#[derive(Insertable, AsChangeset, Serialize, Debug, Clone)]
#[diesel(table_name = prestations)]
pub struct NewOrUpdatePrestation {
  pub title: String,
  pub items: String,
  pub description: String,
  pub rate: f32,
  pub currency: String,
}

// Sales
#[derive(Identifiable, Queryable, Associations, Debug, PartialEq, Serialize, Clone)]
#[diesel(belongs_to(Customer))]
pub struct Sale {
  pub id: i32,
  pub sale_date: NaiveDateTime,
  pub amount: f32,
  pub reduction: Option<f32>,
  pub customer_id: Option<i32>,
}

#[derive(Insertable, AsChangeset, Serialize, Debug, Clone)]
#[diesel(table_name = sales)]
pub struct NewSale {
  pub sale_date: NaiveDateTime,
  pub amount: f32,
  pub reduction: f32,
  pub customer_id: i32,
}

#[derive(Identifiable, Queryable, Associations, Serialize, PartialEq, Debug, Clone)]
#[diesel(belongs_to(Sale))]
#[diesel(table_name = sales_details)]
pub struct SaleDetails {
  pub id: i32,
  pub sale_id: Option<i32>,
  pub title: String,
  pub items: String,
  pub rate: f32,
  pub currency: String,
}

#[derive(Insertable, AsChangeset, Serialize, Debug, Clone)]
#[diesel(table_name = sales_details)]
pub struct NewSaleDetails {
  pub sale_id: i32,
  pub title: String,
  pub items: String,
  pub rate: f32,
  pub currency: String,
}