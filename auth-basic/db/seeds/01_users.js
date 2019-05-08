const faker = require('faker')

const createFakeUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})

exports.seed = async function(knex, Promise) {
  const fakeUsers = []
  for (let i = 0; i < 5; i++) {
    fakeUsers.push(createFakeUser())
  }
  return await knex('users').insert(fakeUsers)
}
