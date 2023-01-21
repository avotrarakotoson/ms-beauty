use diesel::prelude::*;
use diesel::result::Error;
use crate::models::{Prestation, NewOrUpdatePrestation};
use crate::schema::prestations;
use crate::dtos::{CreatePrestationPayload, UpdatePrestationPayload};

pub fn list(conn: &mut SqliteConnection) -> String {
  let all_prestations = prestations::dsl::prestations
      .load::<Prestation>(conn)
      .expect("Error loading prestations");

  let serialized = serde_json::to_string(&all_prestations).unwrap();
  serialized
}

pub fn toggle(conn: &mut SqliteConnection, cid: i32) -> String {
  use prestations::dsl::{id};

  let prestation = prestations::dsl::prestations
    .filter(id.eq(&cid))
    .first::<Prestation>(conn)
    .expect("Prestation not found");

  serde_json::to_string(&prestation).unwrap()
}

pub fn create(conn: &mut SqliteConnection, payload: CreatePrestationPayload) -> QueryResult<Prestation> {
  let new_prestation = NewOrUpdatePrestation {
    title: payload.title,
    description: payload.description.expect("Empty value").to_string(),
    items: payload.items,
    rate: payload.rate,
    currency: payload.currency,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::insert_into(prestations::table)
      .values(&new_prestation)
      .execute(conn)
      .expect("Error saving new prestation");

    prestations::dsl::prestations
      .order(prestations::id.desc())
      .first(conn)
  })
}

pub fn update(conn: &mut SqliteConnection, payload: UpdatePrestationPayload) -> QueryResult<usize> {
  let update_prestation = NewOrUpdatePrestation {
    title: payload.prestation.title,
    description: payload.prestation.description.expect("Empty value").to_string(),
    items: payload.prestation.items,
    rate: payload.prestation.rate,
    currency: payload.prestation.currency,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::update(prestations::table.find(payload.id))
      .set(&update_prestation)
      .execute(conn)
  })
}

pub fn delete(conn: &mut SqliteConnection, cid: i32) -> QueryResult<usize> {
  use prestations::dsl::{id};

  conn.transaction::<_, Error, _>(|conn| {
    let prestation = prestations::dsl::prestations.filter(id.eq(&cid));

    Ok(diesel::delete(prestation).execute(conn).expect("Error deleting prestation"))
  })
}