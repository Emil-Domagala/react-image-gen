import { useAuthContext } from '../store/auth-context';
import './Header.css';

function Header() {
  const { token, logout } = useAuthContext();
  return (
    <header className="header">
      <h1 className="header--h1">AI Image Generator</h1>
      {token && <button onClick={logout}>Logout</button>}
    </header>
  );
}

export default Header;
