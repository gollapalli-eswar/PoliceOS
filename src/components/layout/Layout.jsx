import { Box, useMediaQuery, Drawer } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import Topbar from './Topbar';
import { useApp } from '../../context/AppContext';
import { navConfig } from './navConfig';

function pageTitle(pathname) {
  for (const item of navConfig) {
    if (item.type === 'single' && item.path === pathname) return item.label;
    if (item.type === 'group') {
      const sub = item.items.find(s => s.path === pathname);
      if (sub) return sub.label;
    }
  }
  if (pathname.startsWith('/case/')) return 'Case Detail';
  return 'PoliceOS AI';
}

export default function Layout({ children }) {
  const isMobile = useMediaQuery('(max-width:960px)');
  const location = useLocation();
  const title = pageTitle(location.pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isMobile ? <SidebarMobile /> : <Sidebar />}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar title={title} />
        <Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
