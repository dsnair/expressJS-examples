exports.up = async function(knex, Promise) {
  return await knex.schema.createTable('zoos', table => {
    table
      .increments('id')
      .unsigned()
      .primary()
    table
      .string('name')
      .notNullable()
      .unique()
  })
}

exports.down = async function(knex, Promise) {
  return await knex.schema.dropTable('zoos')
}
