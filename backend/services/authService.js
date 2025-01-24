import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';

const secretKey = process.env.JWT_SECRET_KEY;

export function createUser(email, password) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (user) {
    throw new Error('Email is already in use');
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const result = db.prepare('INSERT INTO users (email, password) VALUES (?,?)').run(email, hashedPassword);
  return jwt.sign({ id: result.lastInsertRowid }, secretKey, { expiresIn: '1h' });
}

export async function login(email, password) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new Error('Invalid email or password');
    error.status = 400;
    throw error;
  }
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
}
