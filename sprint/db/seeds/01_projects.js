const faker = require('faker')

const createFakeProject = () => ({
  name: faker.random.words(),
  description: faker.lorem.words(),
  isCompleted: faker.random.boolean()
})

exports.seed = async function(knex, Promise) {
  const fakeProjects = []
  for (let i = 0; i < 2; i++) {
    fakeProjects.push(createFakeProject())
  }
  return await knex('projects').insert(fakeProjects)
}
