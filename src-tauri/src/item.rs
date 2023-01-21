use diesel::prelude::*;
use diesel::result::Error;
use crate::models::{Item, NewItem};
use crate::schema::items;
use crate::dtos::{CreateItemPayload};

pub fn list(conn: &mut SqliteConnection) -> String {
  let all_items = items::dsl::items
      .load::<Item>(conn)
      .expect("Error loading items");

  let serialized = serde_json::to_string(&all_items).unwrap();
  serialized
}

pub fn toggle(conn: &mut SqliteConnection, cid: i32) -> String {
  use items::dsl::{id};

  let item = items::dsl::items
    .filter(id.eq(&cid))
    .first::<Item>(conn)
    .expect("Item not found");

  serde_json::to_string(&item).unwrap()
}

pub fn create(conn: &mut SqliteConnection, payload: CreateItemPayload) -> QueryResult<Item> {
  let new_item = NewItem {
    label: payload.label,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::insert_into(items::table)
      .values(&new_item)
      .execute(conn)
      .expect("Error saving new item");

    items::dsl::items
      .order(items::id.desc())
      .first(conn)
  })
}

pub fn delete(conn: &mut SqliteConnection, cid: i32) -> QueryResult<usize> {
  use items::dsl::{id};

  conn.transaction::<_, Error, _>(|conn| {
    let item = items::dsl::items.filter(id.eq(&cid));

    Ok(diesel::delete(item).execute(conn).expect("Error deleting item"))
  })
}