const faker = require('faker')

const createFakeUser = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  password: faker.internet.password(),
  department: faker.commerce.department(),
  role: Math.floor(Math.random() * 2) ? 'Manager' : 'Employee'
})

exports.seed = async function(knex, Promise) {
  const fakeUsers = []
  for (let i = 0; i < 10; i++) {
    fakeUsers.push(createFakeUser())
  }
  return await knex('users').insert(fakeUsers)
}
