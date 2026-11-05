import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Intercepta e silencia erros benignos de AbortError disparados pelo WebChannel do Firestore
// quando conexões de streaming HTTP são recicladas ou abortadas intencionalmente pelo navegador
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (
    reason?.name === 'AbortError' ||
    (typeof reason?.message === 'string' && reason.message.includes('signal is aborted without reason'))
  ) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
