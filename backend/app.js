import express from 'express';
import { createUser, enforceAuth } from './auth.js';
import { generateImage } from './image.js';

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = login(email, password);
    return res.status(200).send({ message: 'User loggedin', token });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: 'Login failed please check' });
  }
});

app.post('/generate-image', enforceAuth, async (req, res) => {
  const { prompt, options } = req.body;
  const { image, format } = await generateImage(prompt, options);
  res.type(format);
  res.status(201).send(image);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server run on: ${port}`);
});
