import { createContext, use, useState } from 'react';

const AuthContext = createContext({
  token: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export function useAuthContext() {
  const authCtx = use(AuthContext);
  if (!authCtx) {
    throw new Error('useAuthContext must be used inside an AuthProvider');
  }
  return authCtx;
}

function saveToken(token) {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiration', new Date(Date.now() + 3600 * 1000).toISOString());
}

const storedToken = localStorage.getItem('token');
const storedTokenExpiration = localStorage.getItem('tokenExpiration');

let initialToken = null;
if (storedToken && new Date(storedTokenExpiration) > new Date()) {
  initialToken = storedToken;
} else {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
}

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(initialToken);

  const signup = async (email, password) => {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Signup failed');
    }
    setToken(resData.token);
    saveToken(resData.token);
  };
  const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Loggin failed');
    }

    setToken(resData.token);
    saveToken(resData.token);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  };

  const contextValue = {
    token,
    signup,
    login,
    logout,
  };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
