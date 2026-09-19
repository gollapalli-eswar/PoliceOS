import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse,
  Tooltip, IconButton, Typography, Divider,
} from '@mui/material';
import { ChevronDown, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { navConfig } from './navConfig';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const EXPANDED_WIDTH = 268;
const COLLAPSED_WIDTH = 72;

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, role } = useApp();
  const location = useNavigate ? useLocation() : null;
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    navConfig.forEach(item => {
      if (item.type === 'group' && item.items.some(sub => location?.pathname.startsWith(sub.path))) {
        initial[item.key] = true;
      }
    });
    return initial;
  });

  useEffect(() => {
    navConfig.forEach(item => {
      if (item.type === 'group' && item.items.some(sub => location.pathname.startsWith(sub.path))) {
        setOpenGroups(g => ({ ...g, [item.key]: true }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleGroup = (key) => setOpenGroups(g => ({ ...g, [key]: !g[key] }));

  const visibleNav = navConfig.filter(item => !item.stationHeadOnly || role === 'stationHead');
  const width = sidebarCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width, flexShrink: 0,
        '& .MuiDrawer-paper': {
          width, boxSizing: 'border-box', bgcolor: colors.navy, color: '#fff',
          transition: 'width 0.2s ease', overflowX: 'hidden',
          borderRight: `1px solid ${colors.navyDark}`,
        },
      }}
    >
      {/* Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: sidebarCollapsed ? 0 : 2, py: 2.25, justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
        <Box sx={{ width: 34, height: 34, borderRadius: '8px', bgcolor: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={19} color="#fff" strokeWidth={2.25} />
        </Box>
        {!sidebarCollapsed && (
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.15, color: '#fff' }}>PoliceOS AI</Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5 }}>OPERATIONS PLATFORM</Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <List sx={{ flex: 1, overflowY: 'auto', px: 1, py: 1.25, '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 4 } }}>
        {visibleNav.map((item) => {
          if (item.type === 'single') {
            const active = location.pathname === item.path || location.pathname === '/';
            const Btn = (
              <ListItemButton
                key={item.path}
                selected={active}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2, mb: 0.5, minHeight: 42,
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  px: sidebarCollapsed ? 1 : 1.5,
                  color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                  bgcolor: active ? colors.blue : 'transparent',
                  '&:hover': { bgcolor: active ? colors.blue : 'rgba(255,255,255,0.06)' },
                  '&.Mui-selected': { bgcolor: colors.blue },
                  '&.Mui-selected:hover': { bgcolor: colors.blue },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: sidebarCollapsed ? 0 : 1.5, color: 'inherit' }}>
                  <item.icon size={19} strokeWidth={2} />
                </ListItemIcon>
                {!sidebarCollapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: active ? 700 : 500 }} />}
              </ListItemButton>
            );
            return sidebarCollapsed ? <Tooltip key={item.path} title={item.label} placement="right">{Btn}</Tooltip> : Btn;
          }

          // group
          const groupActive = item.items.some(sub => location.pathname.startsWith(sub.path));
          const open = !!openGroups[item.key] && !sidebarCollapsed;

          const GroupHeader = (
            <ListItemButton
              key={item.key}
              onClick={() => sidebarCollapsed ? navigate(item.items[0].path) : toggleGroup(item.key)}
              sx={{
                borderRadius: 2, mb: 0.25, minHeight: 42,
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                px: sidebarCollapsed ? 1 : 1.5,
                color: groupActive ? '#fff' : 'rgba(255,255,255,0.75)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: sidebarCollapsed ? 0 : 1.5, color: groupActive ? colors.blueLight : 'inherit' }}>
                <item.icon size={19} strokeWidth={2} />
              </ListItemIcon>
              {!sidebarCollapsed && (
                <>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.83rem', fontWeight: groupActive ? 700 : 600 }} />
                  <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', opacity: 0.7 }} />
                </>
              )}
            </ListItemButton>
          );

          return (
            <Box key={item.key}>
              {sidebarCollapsed ? <Tooltip title={item.label} placement="right">{GroupHeader}</Tooltip> : GroupHeader}
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ pl: sidebarCollapsed ? 0 : 2.25, py: 0 }}>
                  {item.items.map(sub => {
                    const active = location.pathname === sub.path;
                    return (
                      <ListItemButton
                        key={sub.path}
                        selected={active}
                        onClick={() => navigate(sub.path)}
                        sx={{
                          borderRadius: 2, minHeight: 34, mb: 0.25, pl: 1.5,
                          borderLeft: `2px solid ${active ? colors.blueLight : 'rgba(255,255,255,0.1)'}`,
                          color: active ? '#fff' : 'rgba(255,255,255,0.62)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                          '&.Mui-selected': { bgcolor: 'rgba(62,123,196,0.18)' },
                          '&.Mui-selected:hover': { bgcolor: 'rgba(62,123,196,0.22)' },
                        }}
                      >
                        <ListItemText primary={sub.label} primaryTypographyProps={{ fontSize: '0.78rem', fontWeight: active ? 700 : 500 }} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box sx={{ display: 'flex', justifyContent: sidebarCollapsed ? 'center' : 'flex-end', p: 1 }}>
        <IconButton size="small" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
          {sidebarCollapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </IconButton>
      </Box>
    </Drawer>
  );
}
