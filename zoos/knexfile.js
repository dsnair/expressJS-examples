module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/zoos', // postgres DB name is zoos
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  }
}
