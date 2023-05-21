import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// context
import { UserProvider } from './contexts/UserContext';

// react-router
import { RoutesApp } from './routes/routes';

export const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #092551',
                padding: '4px',
                color: '#092551',
                fontSize: '12px',
              },
            }}
          />
          <RoutesApp />
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
