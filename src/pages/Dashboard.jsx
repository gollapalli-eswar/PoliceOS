import { Box, Grid, Paper, Typography, Stack, Button, List, ListItemButton, ListItemText, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Briefcase, FileCheck2, Search, FolderSearch, BarChart3,
  FilePlus, FileSignature, Upload, PlayCircle, FileBarChart, Bot, Users, TrendingUp, Circle,
} from 'lucide-react';
import { StatCard, SectionCard } from '../components/common/Common';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';
import { cases, firs, evidenceItems, reports, recentActivity, notifications, stationInfo } from '../data/mockData';

export default function Dashboard() {
  const { user, role, showToast, notifList } = useApp();
  const navigate = useNavigate();
  const isHead = role === 'stationHead';

  const stats = [
    { icon: FileText, label: 'Total Complaints', value: 5, accent: colors.blue },
    { icon: Briefcase, label: 'Active Cases', value: cases.filter(c => c.status === 'Active').length, accent: colors.blue },
    { icon: FileCheck2, label: 'Pending FIRs', value: firs.filter(f => f.status !== 'Approved').length, accent: colors.warning },
    { icon: Search, label: 'Active Investigations', value: 3, accent: colors.blue },
    { icon: FolderSearch, label: 'Evidence Items', value: evidenceItems.length, accent: colors.blue },
    { icon: BarChart3, label: 'Reports Generated', value: reports.length, accent: colors.success },
  ];

  const quickActions = [
    { label: 'Register Complaint', icon: FilePlus, to: '/complaint/register' },
    { label: 'Generate FIR', icon: FileSignature, to: '/fir/generate' },
    { label: 'Upload Evidence', icon: Upload, to: '/evidence/upload' },
    { label: 'Start Investigation', icon: PlayCircle, to: '/investigation/dashboard' },
    { label: 'Generate Report', icon: FileBarChart, to: '/report/generate' },
    { label: 'Open AI Assistant', icon: Bot, to: '/ai/chat' },
  ];
  if (isHead) {
    quickActions.push({ label: 'View Officers', icon: Users, to: '/officers/list' });
    quickActions.push({ label: 'Station Analytics', icon: TrendingUp, to: '/analytics/overview' });
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Good morning, {isHead ? 'Station Head' : 'Officer'}</Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{user.name} · {stationInfo.name}</Typography>
          <Chip label={user.role} size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, height: 20, fontSize: '0.68rem' }} />
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <SectionCard title="Recent Activity" sx={{ mb: 2 }}>
            <List sx={{ py: 0 }}>
              {recentActivity.map((a, i) => (
                <Box key={a.id}>
                  <ListItemButton sx={{ px: 1, borderRadius: 1.5 }} disableRipple>
                    <Circle size={7} fill={colors.blue} color={colors.blue} style={{ marginRight: 12, flexShrink: 0 }} />
                    <ListItemText primary={a.text} secondary={a.time} primaryTypographyProps={{ fontSize: '0.85rem' }} secondaryTypographyProps={{ fontSize: '0.72rem' }} />
                  </ListItemButton>
                  {i < recentActivity.length - 1 && <Divider sx={{ ml: 3 }} />}
                </Box>
              ))}
            </List>
          </SectionCard>

          <SectionCard title="Quick Actions">
            <Grid container spacing={1.5}>
              {quickActions.map(qa => (
                <Grid item xs={6} sm={4} key={qa.label}>
                  <Paper
                    variant="outlined"
                    onClick={() => navigate(qa.to)}
                    sx={{
                      p: 1.75, textAlign: 'center', cursor: 'pointer', borderRadius: 2,
                      transition: 'all .15s', '&:hover': { borderColor: colors.blue, bgcolor: colors.blueSurface },
                    }}
                  >
                    <qa.icon size={20} color={colors.blue} />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, fontSize: '0.78rem' }}>{qa.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={5}>
          <SectionCard title="Notifications" action={<Chip size="small" label={`${notifList.filter(n => !n.read).length} new`} sx={{ bgcolor: colors.dangerBg, color: colors.danger, fontWeight: 700 }} />}>
            <List sx={{ py: 0 }}>
              {notifList.slice(0, 5).map((n, i) => (
                <Box key={n.id}>
                  <ListItemButton sx={{ px: 1, borderRadius: 1.5 }}>
                    <ListItemText
                      primary={n.text}
                      secondary={n.time}
                      primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: n.read ? 400 : 700 }}
                      secondaryTypographyProps={{ fontSize: '0.7rem' }}
                    />
                  </ListItemButton>
                  {i < 4 && <Divider />}
                </Box>
              ))}
            </List>
            <Button fullWidth size="small" sx={{ mt: 1 }} onClick={() => showToast('Showing all notifications', 'info')}>View all</Button>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
