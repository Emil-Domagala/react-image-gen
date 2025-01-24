import { createUser, login } from '../services/authService.js';

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }
    const token = createUser(email, password);
    return res.status(201).send({ message: 'User created', token });
  } catch (err) {
    res.status(400).send({ error: 'Creating user failed' });
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    return res.status(200).send({ message: 'User logged in', token });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).send({ error: error.message || 'Login failed' });
  }
}
