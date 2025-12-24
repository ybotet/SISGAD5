import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'remixicon/fonts/remixicon.css';
import { AuthProvider } from './contexts/AuthContext';

const isProduction = import.meta.env.PROD;
const basename = isProduction ? '/sisgad5' : '/';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter  basename={basename}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
