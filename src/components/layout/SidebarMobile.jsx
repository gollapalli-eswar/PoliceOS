import { useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { colors } from '../../theme/theme';

// Reuses the desktop Sidebar's contents inside a temporary Drawer for small screens.
export default function SidebarMobile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{
        position: 'fixed', top: 12, left: 12, zIndex: 20,
      }}>
        <IconButton onClick={() => setOpen(true)} sx={{ bgcolor: colors.navy, color: '#fff', '&:hover': { bgcolor: colors.navyDark } }} size="small">
          <Menu size={18} />
        </IconButton>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)} variant="temporary" ModalProps={{ keepMounted: true }}>
        <Box onClick={() => setOpen(false)} sx={{ height: '100%' }}>
          <Sidebar />
        </Box>
      </Drawer>
    </>
  );
}
