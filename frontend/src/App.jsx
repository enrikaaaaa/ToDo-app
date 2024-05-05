import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '../src/contexts/ThemeContexts/ThemeContexts';
import { UserProvider } from '../src/contexts/UserContext/UserContext';

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
};

export default App;
