use diesel::prelude::*;
use diesel::result::Error;
use serde::{Serialize, Deserialize};
use crate::db::models::{Customer, Sale, NewSale, SaleDetails, NewSaleDetails};
use crate::schema::{sales, sales_details};
use crate::dtos::{CreateSalePayload, SaleDto};
use crate::customer;
use chrono::NaiveDateTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct SaleFilter {
  limit: Option<i32>
}

pub fn list(conn: &mut SqliteConnection) -> QueryResult<Vec<SaleDto>> {
  conn.transaction::<_, Error, _>(|conn| {
    let sales: Vec<Sale> = sales::dsl::sales
      .order(sales::id.desc())
      .load::<Sale>(conn)
      .expect("Error loading sale");

    let sales_details: Vec<SaleDetails> = SaleDetails::belonging_to(&sales)
      .load::<SaleDetails>(conn)
      .expect("Error loading sales details");

    let grouped_sales_details = sales_details.grouped_by(&sales);
    let data = sales.into_iter().zip(grouped_sales_details).collect::<Vec<_>>();


    let sales_with_details: Vec<SaleDto> = data
      .into_iter()
      .map(|(sale, sales_details)| {
        let customer: Customer = customer::toggle(conn, sale.customer_id.unwrap_or(0)).unwrap();

        SaleDto {
          id: sale.id,
          sale_date: sale.sale_date,
          amount: sale.amount,
          reduction: sale.reduction,
          customer_id: customer.id,
          full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
          items: sales_details,
        }
      })
      .collect();

    Ok(sales_with_details)
  })
}

pub fn list_by_customer_id(conn: &mut SqliteConnection, cid: i32) -> QueryResult<Vec<SaleDto>> {
  conn.transaction::<_, Error, _>(|conn| {
    let customer = customer::toggle(conn, cid).unwrap();
    let sales: Vec<Sale> = Sale::belonging_to(&customer)
      .order(sales::id.desc())
      .limit(10)
      .load::<Sale>(conn)
      .expect("Error loading sale");

    let sales_details: Vec<SaleDetails> = SaleDetails::belonging_to(&sales)
      .load::<SaleDetails>(conn)
      .expect("Error loading sales details");

    let grouped_sales_details = sales_details.grouped_by(&sales);
    let data = sales.into_iter().zip(grouped_sales_details).collect::<Vec<_>>();

    let sales_with_details: Vec<SaleDto> = data
      .into_iter()
      .map(|(sale, sales_details)| {
        SaleDto {
          id: sale.id,
          sale_date: sale.sale_date,
          amount: sale.amount,
          reduction: sale.reduction,
          customer_id: customer.id,
          full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
          items: sales_details,
        }
      })
      .collect();

    Ok(sales_with_details)
  })
}

pub fn create(conn: &mut SqliteConnection, payload: CreateSalePayload) -> QueryResult<SaleDto> {
  let sale_naive_datetime = NaiveDateTime::from_timestamp_millis(payload.sale_date);
  let new_sale = NewSale {
    sale_date: sale_naive_datetime.unwrap(),
    amount: payload.amount,
    reduction: payload.reduction,
    customer_id: payload.customer_id,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::insert_into(sales::table)
      .values(&new_sale)
      .execute(conn)
      .expect("Error saving new sale");

    let customer = customer::toggle(conn, payload.customer_id).unwrap();
    let sale = Sale::belonging_to(&customer)
      .order(sales::id.desc())
      .first::<Sale>(conn)
      .expect("Error loading sale");

    for item in &payload.items {
      let new_sale_detail = NewSaleDetails {
        sale_id: sale.id,
        title: item.title.clone(),
        items: item.items.clone(),
        rate: item.rate,
        currency: item.currency.clone(),
      };

      diesel::insert_into(sales_details::table)
        .values(&new_sale_detail)
        .execute(conn)
        .expect("Error saving new sale detail");
    }

    let sales_details = SaleDetails::belonging_to(&sale)
      .load::<SaleDetails>(conn)
      .expect("Error loading sales details");

    Ok(
      SaleDto {
        id: sale.id,
        sale_date: sale.sale_date,
        amount: sale.amount,
        reduction: sale.reduction,
        customer_id: customer.id,
        full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
        items: sales_details,
      }
    )
  })
}