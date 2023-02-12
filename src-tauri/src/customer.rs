use diesel::prelude::*;
use diesel::result::Error;
use crate::db::models::{Customer, NewOrUpdateCustomer};
use crate::schema::customers;
use crate::dtos::{CreateCustomerPayload, UpdateCustomerPayload};

pub fn list(conn: &mut SqliteConnection) -> QueryResult<Vec<Customer>> {
  let customers = customers::dsl::customers
      .load::<Customer>(conn)
      .expect("Error loading customers");

  Ok(customers)
}

pub fn toggle(conn: &mut SqliteConnection, cid: i32) -> QueryResult<Customer> {
  use customers::dsl::{id};

  conn.transaction::<_, Error, _>(|conn| {
    let customer = customers::dsl::customers
      .filter(id.eq(&cid))
      .first::<Customer>(conn)
      .expect("Customer not found");

    Ok(customer)
  })
}

pub fn list_by_id(conn: &mut SqliteConnection, cid: i32) -> QueryResult<Vec<Customer>> {
  use customers::dsl::{id};

  conn.transaction::<_, Error, _>(|conn| {
    let customers = customers::dsl::customers
      .filter(id.eq(&cid))
      .get_results::<Customer>(conn)
      .expect("Error loading customers by id");

    Ok(customers)
  })
}

pub fn create(conn: &mut SqliteConnection, payload: CreateCustomerPayload) -> QueryResult<Customer> {
  let new_customer = NewOrUpdateCustomer {
    first_name: payload.first_name.expect("Empty value").to_string(),
    last_name: payload.last_name,
    gender: payload.gender,
    dob: payload.dob,
    email: payload.email.expect("Empty value").to_string(),
    primary_phone: payload.primary_phone,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::insert_into(customers::table)
      .values(&new_customer)
      .execute(conn)
      .expect("Error saving new customer");

    customers::dsl::customers
      .order(customers::id.desc())
      .first(conn)
  })
}

pub fn update(conn: &mut SqliteConnection, payload: UpdateCustomerPayload) -> QueryResult<usize> {
  let update_customer = NewOrUpdateCustomer {
    first_name: payload.customer.first_name.expect("Empty value").to_string(),
    last_name: payload.customer.last_name,
    gender: payload.customer.gender,
    dob: payload.customer.dob,
    email: payload.customer.email.expect("Empty value").to_string(),
    primary_phone: payload.customer.primary_phone,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::update(customers::table.find(payload.id))
      .set(&update_customer)
      .execute(conn)
  })
}

pub fn delete(conn: &mut SqliteConnection, cid: i32) -> QueryResult<usize> {
  use customers::dsl::{id};

  conn.transaction::<_, Error, _>(|conn| {
    let customer = customers::dsl::customers.filter(id.eq(&cid));

    Ok(diesel::delete(customer).execute(conn).expect("Error deleting customer"))
  })
}
