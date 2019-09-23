exports.up = async function(knex) {
    return await knex.schema.createTable('users', table => {
      table.increments('userId')
      table.string('name').notNullable().unique()
      table.string('password').notNullable()
      table.string('department').notNullable()
      table.string('role').notNullable().defaultTo('Employee')
    })
  }
  
  exports.down = async function(knex) {
    return await knex.schema.dropTable('users') // 'users' is a table in 'auth' DB
  }