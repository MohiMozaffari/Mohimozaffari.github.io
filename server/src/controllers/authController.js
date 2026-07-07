const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    validUsername &&
    (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));

  if (!validUsername || !validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: username }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token });
}

async function me(req, res) {
  res.json({ username: req.admin.sub });
}

module.exports = { login, me };
