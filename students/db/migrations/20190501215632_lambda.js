// implement changes to schema
exports.up = async function(knex, Promise) {
  return await knex.schema
    .createTable('cohorts', table => {
      table.increments('cohortId').unsigned()
      table.string('name').notNullable()
    })
    .createTable('students', table => {
      table.increments('studentId').unsigned()
      table.string('name').notNullable()
      table
        .integer('cohortId')
        .unsigned()
        .notNullable()  // don't want NULL foreign keys
        .references('cohorts.cohortId')
    })
}

// undo changes
exports.down = async function(knex, Promise) {
  return await knex.schema.dropTable('cohorts').dropTable('students')
}
