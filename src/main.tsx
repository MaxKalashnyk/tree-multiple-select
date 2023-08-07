import { ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorMessage, LoadingMessage } from '~/components';
import App from './App';

import { theme } from './styles/theme';

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<LoadingMessage />}>
    <ErrorBoundary FallbackComponent={ErrorMessage} key={location.pathname}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </Suspense>
);
