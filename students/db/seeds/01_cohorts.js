exports.seed = async function(knex, Promise) {
  const cohorts = [
    {
      cohortId: 1,
      name: 'Web'
    },
    {
      cohortId: 2,
      name: 'iOS'
    },
    {
      cohortId: 3,
      name: 'UX'
    }
  ]
  return await knex('cohorts').insert(cohorts)
}
