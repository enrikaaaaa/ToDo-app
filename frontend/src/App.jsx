import AppRoutes from './routes/AppRoutes';
import { UserProvider } from '../src/contexts/UserContext';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
};

export default App;
