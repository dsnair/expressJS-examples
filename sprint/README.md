# Sprint Challenge: RDBMS and SQL - Projects & Actions

This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project.

This Sprint explored Adding Data Persistence to Web APIs and you were taught the following modules: Introduction to Relational Databases and SQL, Inserting and Modifying Data, Querying Data; Migrations and Seeding and Introduction to Data Modeling.

In your challenge for this Sprint, you will demonstrate proficiency by creating an API that persist data to PostgreSQL (or SQLite3).

## Description

In this challenge, you **design** and build an application for managing `Projects` and `Actions` in the spirit of David Allen's _Getting Things Done (GTD)_ methodology.

Use _Node.js_, _Express.js_ and _Knex_ to build a RESTful API for a `Project Tracker` application that persists data to a PostgreSQL (or SQLite) database.

This will be akin to the Web API that you built in the last sprint, only this time, you'll be writing the persistence layer.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. Explain the difference between `RDBMS` and `SQL`.

> RDBMS (relational database management system) store data in a tabular form
> SQL (structured query language) is the programming language that is used to query a RDBMS/tabular data

1. Why do tables need a `primary key`?

> Primary keys help uniquely identify a table record/row

1. What is the name given to a table column that references the primary key on another table.

> Foreign key

1. What do we need in order to have a _many to many_ relationship between two tables.

> A third table, called the join table, which is used to break the many-to-many relationships into two one-to-one relationships. The join table shows how the primary key value from one table relates to the primary key value from the other table.

## Minimum Viable Product

**NOTE** There is no boilerplate for you for this project. You will need to take the steps necessary for creating this project from scratch. Start by initializing your project with a `package.json` file and go from there.

- A `project` can contain multiple actions and has:
  - a unique Id.
  - a name.
  - a description.
  - a flag that indicates if the project is complete or not.
- An `action` belongs to only one project. An action has:
  - a unique id.
  - a description of what needs to be done.
  - a notes column to add additional information.
  - a flag that indicates if the action has been completed.

Feel free to name the tables and fields anything you want. **Add relationships** as you see fit.

### Tasks

- Build the database and tables using knex migrations. **Seeding is not needed**.
- Build the API with the following endpoints:

  - [x] POST for adding projects.
  - [x] POST for adding actions.
  - [x] GET for retrieving a `project` by its `id` that returns an object with the following structure:

    ```js
    {
      id: 1,
      name: 'project name here',
      description: 'the project description',
      completed: false, // or true, the database will return 1 for true and 0 for false
      actions: [
        {
          id: 1,
          description: 'action description',
          notes: 'the action notes',
          completed: false // or true
        },
        {
          id: 7,
          description: 'another action description',
          notes: 'the action notes',
          completed: false // or true
        }
      ]
    }
    ```

## Stretch Problem

This section is **optional** and not counted towards MVP. Start working on it after you're done with the main assignment.

Add the remaining CRUD operations for projects and actions.

[x] Use `knex` to add _data seeding_ scripts for projects and actions.

Add support for the concept of `contexts`. A context is something like _at home_, _at work_ or _at computer_. The idea is that some actions require one or more `contexts` in order to be worked on. For example, the action of _file income taxes_ may require that you are _at home_, _at computer_ and _online_, so if you are _at work_ and look at the list of pending actions you could do in your current context, filing your taxes will not be one of them.

A `context` can be applied to more than one `action`. An action can be tied to more than one context, like in the example above.

When retrieving an `action` by _id_, add a property that lists all the `contexts` related to that action.

**Remember to run `yarn init -y` to generate a _package.json_ before adding your dependencies.**

_Good luck and have fun!_
