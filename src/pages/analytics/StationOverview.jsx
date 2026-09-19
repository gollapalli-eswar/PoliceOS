import { Box, Stack, Chip } from '@mui/material';
import { FileText, Briefcase, FileCheck2, Search, FolderSearch, BarChart3 } from 'lucide-react';
import { PageHeader, StatCard } from '../../components/common/Common';
import { complaints, cases, firs, evidenceItems, reports } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function StationOverview() {
  const stats = [
    { icon: FileText, label: 'Complaints', value: complaints.length, accent: colors.blue },
    { icon: Briefcase, label: 'Cases', value: cases.length, accent: colors.blue },
    { icon: FileCheck2, label: 'FIRs', value: firs.length, accent: colors.blue },
    { icon: Search, label: 'Investigations', value: 3, accent: colors.blue },
    { icon: FolderSearch, label: 'Evidence', value: evidenceItems.length, accent: colors.blue },
    { icon: BarChart3, label: 'Reports', value: reports.length, accent: colors.success },
  ];

  return (
    <Box>
      <PageHeader
        title="Station Overview"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'Station Overview' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </Stack>
    </Box>
  );
}
