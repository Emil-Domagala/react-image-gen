import { generateImage } from '../services/imageService.js';

export async function generateImageController(req, res, next) {
  try {
    const { prompt, options } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).send({ error: 'Invalid prompt' });
    }

    const { image, format } = await generateImage(prompt, options);

    res.type(format);
    res.status(201).send(image);
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).send({ error: 'Image generation failed' });
  }
}
