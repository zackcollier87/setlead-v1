import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './styles/globals.css';
import { SongProvider } from './context/SongContext';
import { SetlistProvider } from './context/SetlistContext';
import { SyncProvider } from './context/SyncContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SongProvider>
      <SetlistProvider>
        <SyncProvider>
          <RouterProvider router={router} />
        </SyncProvider>
      </SetlistProvider>
    </SongProvider>
  </React.StrictMode>
);
