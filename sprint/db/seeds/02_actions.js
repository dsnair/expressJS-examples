const faker = require('faker')

const createFakeAction = () => ({
  description: faker.hacker.ingverb(),
  notes: faker.hacker.phrase(),
  isCompleted: faker.random.boolean(),
  projectId: Math.floor(Math.random() * 2) + 1 // random number between 1 and 2
})

exports.seed = async function(knex, Promise) {
  const fakeActions = []
  for (let i = 0; i < 3; i++) {
    fakeActions.push(createFakeAction())
  }
  return await knex('actions').insert(fakeActions)
}