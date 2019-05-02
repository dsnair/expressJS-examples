const faker = require('faker')

const createFakeCohort = () => ({
  name: faker.commerce.department()
})

exports.seed = async function(knex, Promise) {
  const fakeCohorts = []
  for (let i = 0; i < 10; i++) {
    fakeCohorts.push(createFakeCohort())
  }
  return await knex('cohorts').insert(fakeCohorts)
}
