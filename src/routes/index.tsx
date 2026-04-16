import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/ui/AppShell';
import { LibraryPage } from '../pages/library/LibraryPage';
import { SetlistsPage } from '../pages/setlists/SetlistsPage';
import { StandPage } from '../pages/stand/StandPage';
import { SyncPage } from '../pages/sync/SyncPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/library" replace /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'setlists', element: <SetlistsPage /> },
      { path: 'stand', element: <StandPage /> },
      { path: 'sync', element: <SyncPage /> }
    ]
  }
]);
