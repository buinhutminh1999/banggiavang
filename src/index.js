import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => { });

        // Listen for new version message from SW
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'NEW_VERSION') {
                console.log(`New version detected: ${event.data.version}. Reloading...`);
                window.location.reload();
            }
        });
    });
}
