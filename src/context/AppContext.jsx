import { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { currentUser, notifications as initialNotifications } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState('officer'); // 'officer' | 'stationHead'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [notifList, setNotifList] = useState(initialNotifications);

  const user = role === 'officer' ? currentUser.officer : currentUser.stationHead;

  const showToast = useCallback((message, severity = 'success') => {
    setToast({ open: true, message, severity });
  }, []);

  const closeToast = () => setToast(t => ({ ...t, open: false }));

  const markNotifRead = (id) => setNotifList(list => list.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifList(list => list.map(n => ({ ...n, read: true })));

  const value = {
    role, setRole, user,
    sidebarCollapsed, setSidebarCollapsed,
    showToast,
    notifList, markNotifRead, markAllRead,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ borderRadius: 2 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
