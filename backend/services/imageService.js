import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt, options) {
  const input = {
    prompt,
    aspect_ratio: options.aspect_ratio || '16:9',
    output_format: options.format || 'webp',
    output_quality: +options.quality || 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };

  //mocking response

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockImageBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAS0lEQVR4nO3OsQEAEADAMPz/Mw9YMjE0F2Tu8aP1OnBXS9QStUQtUUvUErVELVFL1BK1RC1RS9QStUQtUUvUErVELVFL1BK1RC1xAEGqAWOFuDKrAAAAAElFTkSuQmCC';
  const mockMimeType = 'image/jpeg';

  const imageBuffered = Buffer.from(mockImageBase64, 'base64');
  return {
    image: imageBuffered,
    format: mockMimeType,
  };

  //this part works

  const output = await replicate.run('black-forest-labs/flux-schnell', { input });
  const outputStream = output[0];

  const imageBlob = await outputStream.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  const image = Buffer.from(imageBuffer);
  return { image, format: imageBlob.type };
}
