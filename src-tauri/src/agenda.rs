use diesel::prelude::*;
use diesel::result::Error;
use crate::models::{Customer, Agenda, NewAgenda, AgendaDetails, NewAgendaDetails};
use crate::schema::{agendas, agendas_details};
use crate::dtos::{CreateAgendaPayload, AgendaDto};
use crate::customer;

pub fn list(conn: &mut SqliteConnection) -> QueryResult<Vec<AgendaDto>> {
  conn.transaction::<_, Error, _>(|conn| {
    let agendas: Vec<Agenda> = agendas::dsl::agendas
      .load::<Agenda>(conn)
      .expect("Error loading agenda");

    let agenda_details: Vec<AgendaDetails> = AgendaDetails::belonging_to(&agendas)
      .load::<AgendaDetails>(conn)
      .expect("Error loading agendas details");

    let grouped_agenda_details = agenda_details.grouped_by(&agendas);
    let data = agendas.into_iter().zip(grouped_agenda_details).collect::<Vec<_>>();


    let agendas_with_details: Vec<AgendaDto> = data
      .into_iter()
      .map(|(agenda, agendas_details)| {
        let customer: Customer = customer::toggle(conn, agenda.customer_id.unwrap_or(0)).unwrap();

        AgendaDto {
          id: agenda.id,
          agenda_date: agenda.agenda_date,
          comment: agenda.comment,
          customer_id: customer.id,
          full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
          prestations: agendas_details,
        }
      })
      .collect();

    Ok(agendas_with_details)
  })
}

pub fn list_by_customer_id(conn: &mut SqliteConnection, cid: i32) -> QueryResult<Vec<AgendaDto>> {
  conn.transaction::<_, Error, _>(|conn| {
    let customer = customer::toggle(conn, cid).unwrap();
    let agendas: Vec<Agenda> = Agenda::belonging_to(&customer)
      .load::<Agenda>(conn)
      .expect("Error loading agenda");

    let agendas_details: Vec<AgendaDetails> = AgendaDetails::belonging_to(&agendas)
      .load::<AgendaDetails>(conn)
      .expect("Error loading agendas details");

    let grouped_agendas_details = agendas_details.grouped_by(&agendas);
    let data = agendas.into_iter().zip(grouped_agendas_details).collect::<Vec<_>>();

    let agendas_with_details: Vec<AgendaDto> = data
      .into_iter()
      .map(|(agenda, agendas_details)| {
        AgendaDto {
          id: agenda.id,
          agenda_date: agenda.agenda_date,
          comment: agenda.comment,
          customer_id: customer.id,
          full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
          prestations: agendas_details,
        }
      })
      .collect();

    Ok(agendas_with_details)
  })
}

pub fn create(conn: &mut SqliteConnection, payload: CreateAgendaPayload) -> QueryResult<AgendaDto> {
  let new_agenda = NewAgenda {
    agenda_date: payload.agenda_date,
    comment: payload.comment,
    customer_id: payload.customer_id,
  };

  conn.transaction::<_, Error, _>(|conn| {
    diesel::insert_into(agendas::table)
      .values(&new_agenda)
      .execute(conn)
      .expect("Error saving new agenda");

    let customer = customer::toggle(conn, payload.customer_id).unwrap();
    let agenda = Agenda::belonging_to(&customer)
      .order(agendas::id.desc())
      .first::<Agenda>(conn)
      .expect("Error loading agenda");

    for item in &payload.prestations {
      let new_agenda_detail = NewAgendaDetails {
        agenda_id: agenda.id,
        title: item.title.clone(),
        items: item.items.clone(),
      };

      diesel::insert_into(agendas_details::table)
        .values(&new_agenda_detail)
        .execute(conn)
        .expect("Error saving new agenda detail");
    }

    let agendas_details = AgendaDetails::belonging_to(&agenda)
      .load::<AgendaDetails>(conn)
      .expect("Error loading agendas details");

    Ok(
      AgendaDto {
        id: agenda.id,
        agenda_date: agenda.agenda_date,
        comment: agenda.comment,
        customer_id: customer.id,
        full_name: format!("{} {}", customer.first_name.as_deref().unwrap_or("").to_string(), customer.last_name),
        prestations: agendas_details,
      }
    )
  })
}