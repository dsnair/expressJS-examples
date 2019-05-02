// implement changes to schema
exports.up = async function(knex, Promise) {
  return await knex.schema
    .createTable('cohorts', table => {
      table.increments('cohortId').unsigned()
      table
        .string('name')
        .notNullable()
        .unique()
    })
    .createTable('students', table => {
      table.increments('studentId').unsigned()
      table.string('name').notNullable()
      table
        .integer('cohortId')
        .unsigned()
        .references('cohorts.cohortId')
        // set the foreign key to null when the primary key it references is deleted
        .onDelete('SET NULL')
        // when the primary key changes, reflect those changes in foreign key
        .onUpdate('CASCADE')
    })
}

// undo changes
exports.down = async function(knex, Promise) {
  return await knex.schema.dropTable('cohorts').dropTable('students')
}
