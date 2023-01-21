// @generated automatically by Diesel CLI.

diesel::table! {
    agendas (id) {
        id -> Integer,
        agenda_date -> Text,
        comment -> Nullable<Text>,
        customer_id -> Nullable<Integer>,
    }
}

diesel::table! {
    agendas_details (id) {
        id -> Integer,
        agenda_id -> Nullable<Integer>,
        title -> Text,
        items -> Text,
    }
}

diesel::table! {
    customers (id) {
        id -> Integer,
        first_name -> Nullable<Text>,
        last_name -> Text,
        gender -> Text,
        dob -> Nullable<Text>,
        email -> Nullable<Text>,
        address -> Nullable<Text>,
        primary_phone -> Text,
        registry_date -> Timestamp,
    }
}

diesel::table! {
    items (id) {
        id -> Integer,
        label -> Text,
    }
}

diesel::table! {
    prestations (id) {
        id -> Integer,
        title -> Text,
        items -> Text,
        description -> Nullable<Text>,
        rate -> Float,
        currency -> Text,
    }
}

diesel::table! {
    sales (id) {
        id -> Integer,
        sale_date -> Timestamp,
        amount -> Float,
        reduction -> Nullable<Float>,
        customer_id -> Nullable<Integer>,
    }
}

diesel::table! {
    sales_details (id) {
        id -> Integer,
        sale_id -> Nullable<Integer>,
        title -> Text,
        items -> Text,
        rate -> Float,
        currency -> Text,
    }
}

diesel::joinable!(agendas -> customers (customer_id));
diesel::joinable!(agendas_details -> agendas (agenda_id));
diesel::joinable!(sales -> customers (customer_id));
diesel::joinable!(sales_details -> sales (sale_id));

diesel::allow_tables_to_appear_in_same_query!(
    agendas,
    agendas_details,
    customers,
    items,
    prestations,
    sales,
    sales_details,
);
