const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/models');
const validateBody = require('../middleware/validateBody');
const errorRef = require('../helpers/errorRef');
const generateToken = require('../helpers/generateToken');

const bodyReqs = {
  username: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
  }
}

module.exports = server => {
  server.post('/api/register', validateBody(bodyReqs), register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    const saved = await db.add({
      ...user,
      password: hash,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: `Registered ${saved.username}`,
      token,
    });
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
}

async function login(req, res) {
  // implement user login
  try {
    let { username, password } = req.body;
    const user = await db.findBy({ username }).first();

    if (!(user && bcrypt.compareSync(password, user.password))) return res.status(401).json({
      message: 'Invalid Credentials',
    });

    const token = generateToken(user);

    res.json({
      message: `Welcome ${user.username}`,
      token,
    });
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
