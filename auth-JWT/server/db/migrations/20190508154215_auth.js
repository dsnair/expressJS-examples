exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('users', table => {
      table.increments('userId').unsigned()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.string('department').notNullable()
    })
  }
  
  exports.down = async function(knex, Promise) {
    return await knex.schema.dropTable('users') // 'users' is a table in 'auth' DB
  }