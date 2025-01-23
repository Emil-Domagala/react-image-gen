import { useState } from 'react';
import './AuthForm.css';
import Form from './Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuthContext } from '../../store/auth-context';
import { useActionState } from 'react';

function AuthForm() {
  const authCtx = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();

  const handleSwitchAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const submitAction = async (_, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      if (isLogin === false) {
        await authCtx.signup(email, password);
      } else {
        await authCtx.login(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [, action, isPending] = useActionState(submitAction);
  return (
    <Form action={action} className="auth">
      <Input id="email" type="email" label="Email" />
      <Input id="password" type="password" label="Password" />
      {error && <p className="error">{error}</p>}
      <div className="btn-wrapper">
        <Button isDisabled={isPending} className="primary">
          {isLogin ? 'Login' : 'Signup'}
        </Button>
        <Button type="button" onClick={handleSwitchAuthMode}>
          {!isPending && isLogin ? 'Create new User' : 'Login instead'}
          {isPending && 'Submitting'}
        </Button>
      </div>
    </Form>
  );
}

export default AuthForm;
