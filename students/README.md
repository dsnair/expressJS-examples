# Building an API using a Relational Database

## Topics

- Databases
- Relational Databases
- Knex migrations
- Seeding data

## Assignment

Build an API that persists data to postgreSQL (or SQLite3).

Use knex migrations to create a database called `lambda` and add the following tables:

#### cohorts

- `cohortId`: primary key, auto-increments.
- `name`: text, required.

#### students

- `studentId`: primary key, auto-increments.
- `name`: text, required.
- `cohortId`: references the `cohortId` in the cohorts table.

Use knex seeding feature to add test data to your tables.

Implement the following endpoints:

- `[POST] /api/cohorts` This route should save a new cohort to the database.
- `[GET] /api/cohorts` This route will return an array of all cohorts.
- `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
- `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
- `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
- `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.

## STEPS

#1 Init Express app

```bash
yarn init -y  # creates package.json, -y skips all the terminal questions by answering yes to them all
yarn add express knex pg faker
yarn add nodemon -D
./node_modules/.bin/knex init  # creates knexfile.js
```

Include the following in `package.json`:

```json
"scripts": {
  "server": "nodemon index.js",
  "start": "node index.js"
}
```

Write the `index.js` file to initialize the Express app

#2 Configure Knex

- Edit the `knexfile.js` file
- Create the following two sub-directories in the root project directory: `/db/migrations`, `/db/seeds`
- Also, create the `knex.js` file in the `/db` directory

#3 Setup migrations

```bash
./node_modules/.bin/knex migrate:make lambda
```

Write `cohorts` and `students` table schema in `/db/migrations/[timestamp]_lambda.js` file

#4 Setup seeds

```bash
./node_modules/.bin/knex seed:make 01_cohorts
./node_modules/.bin/knex seed:make 02_students
```

- Replace `table_name` with `cohorts` in `/db/seeds/01_cohorts.js` and `students` in `/db/seeds/02_students.js` files. `01` and `02` is for determining the order in which the DB should run the files. `students` runs second because it references `cohortId` in `cohorts`.
- Write initial table rows in `/db/seeds/01_cohorts.js` and `/db/seeds/02_students.js` files.

#5 Setup Postgres DB

```bash
# install postgres
brew install postgres

# start postgres server
pg_ctl -D /usr/local/var/postgres start

# create DB
initdb /usr/local/var/postgres  

# if the previous step throws a terminal error 'directory "/usr/local/var/postgres" exists ...',
# remove old DB and re-run the previous command
rm -r /usr/local/var/postgres 
initdb /usr/local/var/postgres

# create new DB named lambda
createdb lambda
```

#5 Migrate seeds into DB

```bash
./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run
```

#6 Test HTTP methods (GET, etc.) in Postman

#7 The following deletes the lambda DB just created

```bash
dropdb lambda
```

## Stretch Problem

Add the following endpoints.

- `[POST] /students` This route should save a new student to the database.
- `[GET] /students` This route will return an array of all students.
- `[GET] /students/:id` This route will return the student with the matching `id`.
- `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
- `[DELETE] /students/:id` This route should delete the specified student.

Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohortId` fields. The returned object should look like this:

```js
{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
}
```