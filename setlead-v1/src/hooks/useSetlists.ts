import { useContext } from 'react';
import { SetlistContext } from '../context/SetlistContext';

export function useSetlists() {
  const context = useContext(SetlistContext);
  if (!context) throw new Error('useSetlists must be used within SetlistProvider');
  return context;
}
