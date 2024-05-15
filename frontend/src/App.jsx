import AppRoutes from './routes/AppRoutes';
import { UserProvider } from '../src/contexts/UserContext';

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
};

export default App;
