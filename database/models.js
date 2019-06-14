const db = require('./dbConfig.js');

const find = () => {
  return db('users');
}

const findBy = (filter) => {
  return db('users').where(filter);
}

const add = (user) => {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
  });
}

const findById = (id) => {
  return db('users')
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
