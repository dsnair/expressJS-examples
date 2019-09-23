exports.up = async function(knex) {
  return await knex.schema.createTable('users', table => {
    table.increments('userId')
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
  })
}

exports.down = async function(knex) {
  return await knex.schema.dropTable('users') // 'users' is a table in 'project' DB
}
