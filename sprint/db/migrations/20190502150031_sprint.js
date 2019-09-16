exports.up = async function(knex) {
  return await knex.schema
    .createTable('projects', table => {
      table.increments('projectId').unsigned()
      table
        .string('name')
        .notNullable()
        .unique()
      table.text('description')
      table.boolean('isCompleted').defaultTo(false)
    })
    .createTable('actions', table => {
      table.increments('actionId').unsigned()
      table
        .text('description')
        .notNullable()
        .unique()
      table.text('notes')
      table.boolean('isCompleted').defaultTo(false)

      // add foreign key
      table
        .integer('projectId')
        .unsigned()
        .notNullable()
        .references('projects.projectId')
        .onDelete('CASCADE') // if primary key is deleted, delete foreign key records also
        .onUpdate('CASCADE') // if primary key value is changed, update foreign key also
    })
}

exports.down = async function(knex) {
  return await knex.schema.dropTable('actions').dropTable('projects') // drop tables in reverse order of dependency
}
