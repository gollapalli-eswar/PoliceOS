import { Box, Stack, Paper, Typography, LinearProgress, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Search, ListTodo, FolderSearch, Activity } from 'lucide-react';
import { PageHeader, StatCard, SectionCard } from '../../components/common/Common';
import { investigationTasks, investigationUpdates, evidenceItems, cases } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function InvestigationDashboard() {
  const allTasks = Object.values(investigationTasks).flat();
  const pending = allTasks.filter(t => !t.done).length;
  const allUpdates = Object.entries(investigationUpdates).flatMap(([caseId, ups]) => ups.map(u => ({ ...u, caseId })));

  const stats = [
    { icon: Search, label: 'Active Investigations', value: Object.keys(investigationTasks).length, accent: colors.blue },
    { icon: ListTodo, label: 'Pending Tasks', value: pending, accent: colors.warning },
    { icon: FolderSearch, label: 'Evidence Items', value: evidenceItems.length, accent: colors.blue },
    { icon: Activity, label: 'Recent Updates', value: allUpdates.length, accent: colors.blue },
  ];

  return (
    <Box>
      <PageHeader title="Investigation Dashboard" breadcrumbs={[{ label: 'Investigation Agent' }, { label: 'Investigation Dashboard' }]} />
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </Stack>

      <Stack direction="row" spacing={2.5} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        <SectionCard title="Investigation Progress by Case" sx={{ flex: 1, minWidth: 280 }}>
          <Stack spacing={2}>
            {Object.entries(investigationTasks).map(([caseId, tasks]) => {
              const c = cases.find(cc => cc.id === caseId);
              const pct = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);
              return (
                <Box key={caseId}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{caseId} — {c?.crimeType}</Typography>
                    <Typography variant="caption" color="text.secondary">{pct}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={pct} sx={{ height: 7, borderRadius: 4 }} />
                </Box>
              );
            })}
          </Stack>
        </SectionCard>

        <SectionCard title="Recent Updates" sx={{ flex: 1, minWidth: 280 }}>
          <List sx={{ py: 0 }}>
            {allUpdates.map((u, i) => (
              <Box key={u.id}>
                <ListItemButton sx={{ px: 1 }}>
                  <ListItemText
                    primary={`${u.activity} — ${u.caseId}`}
                    secondary={`${u.description} · ${u.date} ${u.time}`}
                    primaryTypographyProps={{ fontSize: '0.83rem', fontWeight: 600 }}
                    secondaryTypographyProps={{ fontSize: '0.72rem' }}
                  />
                </ListItemButton>
                {i < allUpdates.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </SectionCard>
      </Stack>
    </Box>
  );
}
