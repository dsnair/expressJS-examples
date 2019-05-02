const faker = require('faker')

const createFakeStudent = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`
})

exports.seed = async function(knex, Promise) {
  const fakeStudents = []
  for (let i = 0; i < 10; i++) {
    fakeStudents.push(createFakeStudent())
  }
  return await knex('students').insert(fakeStudents)
}
