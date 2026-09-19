import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, InputBase, IconButton, Badge, Avatar, Typography, Menu, MenuItem, Divider,
  Popover, List, ListItemButton, ListItemText, Stack, Chip, Button,
} from '@mui/material';
import { Search, Bell, Bot, ChevronDown, Circle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';
import { cases, complaints, firs, evidenceItems, officers, reports } from '../../data/mockData';

export default function Topbar({ title }) {
  const { user, role, setRole, notifList, markNotifRead, markAllRead, showToast } = useApp();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [searchAnchor, setSearchAnchor] = useState(null);
  const [query, setQuery] = useState('');

  const unread = notifList.filter(n => !n.read).length;

  const results = query.length > 1 ? {
    cases: cases.filter(c => c.id.toLowerCase().includes(query.toLowerCase()) || c.crimeType.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    complaints: complaints.filter(c => c.id.toLowerCase().includes(query.toLowerCase())).slice(0, 2),
    firs: firs.filter(f => f.id.toLowerCase().includes(query.toLowerCase()) || f.caseId.toLowerCase().includes(query.toLowerCase())).slice(0, 2),
    officers: officers.filter(o => o.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2),
  } : null;

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setAnchorEl(null);
    showToast(`Switched to ${newRole === 'officer' ? 'Police Officer' : 'Station Head'} view`, 'info');
    navigate('/dashboard');
  };

  return (
    <Box sx={{
      height: 64, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      bgcolor: 'background.paper', borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 10,
    }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h6" noWrap>{title}</Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={1.5}>
        {/* Global search */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', bgcolor: colors.bg, borderRadius: 2, px: 1.5, py: 0.75, width: 280, border: `1px solid ${colors.border}` }}
        >
          <Search size={16} color={colors.steel} />
          <InputBase
            placeholder="Search case, FIR, officer..."
            sx={{ ml: 1, fontSize: '0.82rem', flex: 1 }}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchAnchor(e.currentTarget); }}
            onFocus={(e) => setSearchAnchor(e.currentTarget)}
          />
        </Box>
        <Popover
          open={!!searchAnchor && !!results}
          anchorEl={searchAnchor}
          onClose={() => setSearchAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          disableAutoFocus disableEnforceFocus
        >
          <Box sx={{ width: 340, p: 1.5 }}>
            {results && Object.values(results).every(a => a.length === 0) && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>No results for "{query}"</Typography>
            )}
            {results?.cases.length > 0 && <ResultGroup label="Cases" items={results.cases.map(c => ({ id: c.id, label: `${c.id} · ${c.crimeType}`, to: `/case/${c.id}` }))} onGo={(to) => { navigate(to); setSearchAnchor(null); }} />}
            {results?.firs.length > 0 && <ResultGroup label="FIRs" items={results.firs.map(f => ({ id: f.id, label: `${f.id} · ${f.caseId}`, to: `/fir/drafts` }))} onGo={(to) => { navigate(to); setSearchAnchor(null); }} />}
            {results?.officers.length > 0 && <ResultGroup label="Officers" items={results.officers.map(o => ({ id: o.id, label: o.name, to: `/officers/list` }))} onGo={(to) => { navigate(to); setSearchAnchor(null); }} />}
          </Box>
        </Popover>

        <IconButton onClick={() => { navigate('/ai/chat'); }} sx={{ color: colors.blue, bgcolor: colors.blueSurface, '&:hover': { bgcolor: colors.blueSurface } }} size="small">
          <Bot size={18} />
        </IconButton>

        <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
          <Badge badgeContent={unread} color="error">
            <Bell size={19} color={colors.textSecondary} />
          </Badge>
        </IconButton>
        <Popover
          open={!!notifAnchor}
          anchorEl={notifAnchor}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ width: 340 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2">Notifications</Typography>
              <Button size="small" onClick={markAllRead} sx={{ fontSize: '0.72rem' }}>Mark all read</Button>
            </Stack>
            <Divider />
            <List sx={{ maxHeight: 340, overflowY: 'auto', py: 0 }}>
              {notifList.map(n => (
                <ListItemButton key={n.id} onClick={() => markNotifRead(n.id)} sx={{ py: 1.25, alignItems: 'flex-start' }}>
                  {!n.read && <Circle size={7} fill={colors.blue} color={colors.blue} style={{ marginTop: 6, marginRight: 8, flexShrink: 0 }} />}
                  {n.read && <Box sx={{ width: 15, flexShrink: 0 }} />}
                  <ListItemText
                    primary={n.text}
                    secondary={n.time}
                    primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: n.read ? 400 : 600 }}
                    secondaryTypographyProps={{ fontSize: '0.7rem' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Popover>

        <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: colors.navy, fontSize: '0.85rem', fontWeight: 700 }}>
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{user.name}</Typography>
            <Chip label={user.role} size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700 }} />
          </Box>
          <ChevronDown size={15} color={colors.steel} />
        </Stack>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">{user.station}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings/profile'); }}>Profile</MenuItem>
          <Divider />
          <Box sx={{ px: 2, py: 0.5 }}><Typography variant="caption" color="text.secondary">Switch role (demo)</Typography></Box>
          <MenuItem selected={role === 'officer'} onClick={() => handleRoleSwitch('officer')}>Police Officer</MenuItem>
          <MenuItem selected={role === 'stationHead'} onClick={() => handleRoleSwitch('stationHead')}>Station Head</MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}

function ResultGroup({ label, items, onGo }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, px: 1 }}>{label.toUpperCase()}</Typography>
      <List dense>
        {items.map(it => (
          <ListItemButton key={it.id} onClick={() => onGo(it.to)} sx={{ borderRadius: 1 }}>
            <ListItemText primary={it.label} primaryTypographyProps={{ fontSize: '0.8rem' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
