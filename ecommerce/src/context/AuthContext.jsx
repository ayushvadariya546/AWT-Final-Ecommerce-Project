import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('nexus_auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.token) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('nexus_auth_user');
        }
      } catch (e) {
        console.error('Failed to parse user session');
      }
    }
    setLoading(false);
  }, []);

  const parseApiResponse = async (response) => {
    const raw = await response.text();
    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw);
    } catch {
      throw new Error('Invalid response from server. Please try again.');
    }
  };

  const login = async (email, password, expectedRole) => {
    const loginRequest = async () => {
      let response;
      try {
        response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      } catch {
        throw new Error('Backend server is not running on port 5000.');
      }

      const data = await parseApiResponse(response);
      if (!response.ok) {
        const error = new Error(data.message || `Unable to sign in (HTTP ${response.status})`);
        error.status = response.status;
        throw error;
      }

      return data;
    };

    let loggedInUser;

    if (expectedRole === 'client') {
      try {
        loggedInUser = await loginRequest();
      } catch (error) {
        if (error.status !== 404) {
          throw error;
        }

        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: email.split('@')[0] || 'client',
            email,
            password,
          }),
        });

        const registerData = await parseApiResponse(registerResponse);
        if (!registerResponse.ok) {
          throw new Error(registerData.message || 'Unable to register user');
        }

        loggedInUser = registerData;
      }

      if (loggedInUser.role === 'admin') {
        throw new Error('This account is admin. Please login from admin portal.');
      }
    } else {
      loggedInUser = await loginRequest();
    }

    if (expectedRole && loggedInUser.role !== expectedRole) {
      throw new Error(`Please sign in as ${expectedRole}`);
    }

    setUser(loggedInUser);
    localStorage.setItem('nexus_auth_user', JSON.stringify(loggedInUser));
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
