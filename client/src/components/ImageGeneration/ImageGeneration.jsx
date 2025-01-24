import { useActionState } from 'react';
import Button from '../UI/Button';
import Form from '../Form/Form';
import Input from '../UI/Input';
import './ImageGeneration.css';

async function sendImage(prompt, options, authToken) {
  const response = await fetch('http://localhost:3000/generate-image', {
    method: 'POST',
    body: JSON.stringify({ prompt, options }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to generate image, prompt cannot be empty');
  }
  const imgBlob = await response.blob();
  return URL.createObjectURL(imgBlob);
}

const ImageGeneration = () => {
  const token = localStorage.getItem('token');
  const submitAction = async (_, formData) => {
    const prompt = formData.get('prompt');
    const options = {
      quality: formData.get('quality'),
      aspect_ratio: formData.get('aspectRatio'),
      format: formData.get('format'),
    };
    try {
      const imageUrl = await sendImage(prompt, options, token);
      return { result: 'success', imageUrl, prompt };
    } catch (error) {
      return { result: 'error', message: error.message };
    }
  };

  const [formState, action, isPending] = useActionState(submitAction, { result: null });

  return (
    <div className="wrapper">
      <Form action={action} className={'image-gen-form'}>
        <Input type="text" id="prompt" isTextarea label="Image Prompt" />
        <div className="select-wrapper">
          <Input
            type="number"
            id="prompt"
            className="prompt"
            label={'Quality'}
            min="1"
            max="100"
            step="1.0"
            defaultValue="80"></Input>
          <div className="input-wrapper">
            <label htmlFor="aspectRatio">Aspect Ratio</label>
            <select id="aspectRatio" name="aspectRatio" defaultValue="1:1">
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
              <option value="4:3">4:3</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="format">Format</label>
            <select id="format" name="format" defaultValue="png">
              <option value="webp">WebP</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
        </div>

        <div className="button-wrapper">
          <Button isDisabled={isPending} className="primary">
            {isPending ? 'Generating...' : 'Generate!'}
          </Button>
        </div>
      </Form>
      <div className="generated-image-wrapper">
        {!formState.result && (
          <div className="image-placeholder">
            <p>No image generated yet!</p>
          </div>
        )}
        {formState.result === 'success' && <img src={formState.imageUrl} alt={formState.prompt} />}
        {formState.result === 'error' && (
          <div className="image-placeholder">
            <p className="error-txt">{formState.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
