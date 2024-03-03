import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { AuthProvider } from './hooks/useAuth';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <AuthProvider>
        <App />
      </AuthProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);