import './App.css';
import AuthForm from './components/Form/AuthForm';
import Header from './components/Header';
import ImageGeneration from './components/ImageGeneration/ImageGeneration';
import { useAuthContext } from './store/auth-context';

function App() {
  const { token } = useAuthContext();
  return (
    <>
      <Header />
      <main>{!token ? <AuthForm /> : <ImageGeneration />}</main>
    </>
  );
}

export default App;
