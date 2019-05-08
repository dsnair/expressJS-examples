## Topics

- Authentication
- Express Middleware
- Password Hashing
- Sessions
- Cookies

## Description

Use `Node.js`, `Express` and `Knex` to build an API that provides **Register** and **Login** functionality using `Postgres` to store _User_ information. Make sure the password is not stored as plain text.

## Steps

#1 
```bash
chmod +x init.sh
./init.sh
```

#2 
- Edit `knexfile.js`
- Edit `knex.js`

#3 Write table schema in `/db/migrations/[timestamp]_${dbName}.js`

#4 Setup seeds
```bash
./node_modules/.bin/knex seed:make 01_users  # users is a table in ${dbName}
```
creates `01_users.js`. 

- Edit this file to have initial seed data, then

```bash
./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run
```

To see the seed data in DB,
```bash
psql ${dbName}
```

```sql
select * from "users";
```

#5 
- write Express app in `index.js`
```bash
source ./cookie.env
```
- test the endpoints in Postman

#6
```bash
dropdb ${dbName}
```
deletes the postgres DB


## Assignment

### Complete the following endpoints:

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.                                                                                                                                                         |
| POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' |
| GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.                                                                                                |

**After we cover the lecture on **sessions** and **cookies**, use them to keep a record of logged in users across requests.**

### Stretch Problem

- [x] Write a piece of **global** middleware that ensures a user is logged in when accessing _any_ route prefixed by `/api/restricted/`. For instance, `/api/restricted/something`, `/api/restricted/other`, and `/api/restricted/a` should all be protected by the middleware; only logged in users should be able to access these routes.
- Build a React application that implements components to register, login and view a list of users.
