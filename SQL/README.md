# SQL Assignment

## 1. Write Basic Queries

Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all) using the **Google Chrome (or Chromium if you use Linux) browser** and write _SQL queries_ for the following requirements in `Queries.md`:

1. find all customers that live in London. Returns 6 records.
1. find all customers with postal code 1010. Returns 3 customers.
1. find the phone number for the supplier with the id 11. Should be (010) 9984510.
1. list orders descending by the order date. The order with date 1997-02-12 should be at the top.
1. find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.
1. find all customers that include the word "market" in the name. Should return 4 records.
1. add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
1. update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.
1. delete all customers that have no orders. Should delete 18 records.
1. list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.
1. list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.
1. list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.

### Query Order
```sql
SELECT
FROM
WHERE
GROUP BY
HAVING  /* requires GROUP BY*/
ORDER BY
LIMIT
```

*Clicking the `Restore Database` button in the page will repopulate the database with the original data and discard all changes you have made*.

## 2. Create Database and Table

1. create a Postgres database, name it `budget`.

```bash
createdb budget
```

2. add an `accounts` table with the following _schema_:

  - `id`, numeric value with no decimal places that should auto-increment.
  - `name`, string, add whatever is necessary to make searching by name faster.
  - `budget` numeric value.

and _constraints_:
  - the `id` should be the primary key for the table.
  - account `name` should be unique.
  - account `budget` is required.

```bash
psql budget
```

```sql
CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    budget NUMERIC NOT NULL
);
```

```bash
\dt # list tables in DB
\q # quit psql REPL
```