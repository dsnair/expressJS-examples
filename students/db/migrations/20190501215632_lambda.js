// implement changes to schema
exports.up = async function(knex, Promise) {
  return await knex.schema
    .createTable('cohorts', table => {
      table.increments('cohortId')
      table.string('name').notNullable()
    })
    .createTable('students', table => {
      table.increments('studentId').references('cohorts.cohortId')
      table.string('name').notNullable()
    })
}

// undo changes
exports.down = async function(knex, Promise) {
  return await knex.schema.dropTable('cohorts').dropTable('students')
}
