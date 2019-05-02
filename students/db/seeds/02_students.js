const faker = require('faker')

const createFakeStudent = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  cohortId: Math.floor(Math.random() * 3) + 1 // random number between 1 to 3
})

exports.seed = async function(knex, Promise) {
  const fakeStudents = []
  for (let i = 0; i < 10; i++) {
    fakeStudents.push(createFakeStudent())
  }
  return await knex('students').insert(fakeStudents)
}
