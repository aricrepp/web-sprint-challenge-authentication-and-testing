exports.seed = async function (knex) {
  await knex('users').truncate();
  await knex('users').insert([
    { username: 'sam', password: 'password' },
    { username: 'frodo', password: 'password' },
  ]);
};
