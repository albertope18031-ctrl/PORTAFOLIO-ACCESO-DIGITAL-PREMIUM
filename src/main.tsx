import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import './lib/analytics';

const rootEl = document.getElementById('analytics-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const div = document.createElement('div');
  div.id = 'analytics-root';
  document.body.appendChild(div);
  ReactDOM.createRoot(div).render(
    <React.StrictMode>
      <Analytics />
    </React.StrictMode>
  );
}
