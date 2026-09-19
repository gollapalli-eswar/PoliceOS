import { Box, Stack, Paper, Typography, List, ListItemButton, ListItemText, Chip, Divider } from '@mui/material';
import { Video, Image as ImageIcon, Mic, FileText as FileIcon, MapPin, Layers } from 'lucide-react';
import { PageHeader, StatCard, SectionCard } from '../../components/common/Common';
import { evidenceItems } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function EvidenceDashboard() {
  const count = (type) => evidenceItems.filter(e => e.type === type).length;
  const stats = [
    { icon: Layers, label: 'Total Evidence', value: evidenceItems.length, accent: colors.blue },
    { icon: Video, label: 'CCTV', value: count('CCTV'), accent: colors.blue },
    { icon: ImageIcon, label: 'Images', value: count('Image'), accent: colors.blue },
    { icon: Mic, label: 'Audio', value: count('Audio') || 0, accent: colors.blue },
    { icon: FileIcon, label: 'Documents', value: count('Document'), accent: colors.blue },
    { icon: MapPin, label: 'Location Records', value: count('Location'), accent: colors.blue },
  ];

  const recent = [...evidenceItems].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1)).slice(0, 6);

  return (
    <Box>
      <PageHeader title="Evidence Dashboard" breadcrumbs={[{ label: 'Evidence Agent' }, { label: 'Evidence Dashboard' }]} />
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </Stack>

      <SectionCard title="Recent Evidence">
        <List sx={{ py: 0 }}>
          {recent.map((e, i) => (
            <Box key={e.id}>
              <ListItemButton sx={{ px: 1 }}>
                <ListItemText
                  primary={`${e.type} — ${e.description}`}
                  secondary={`${e.caseId} · ${e.date} ${e.time} · Uploaded by ${e.uploadedBy}`}
                  primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }}
                  secondaryTypographyProps={{ fontSize: '0.72rem' }}
                />
                <Chip size="small" label={e.status} sx={{ fontWeight: 700, fontSize: '0.65rem' }} />
              </ListItemButton>
              {i < recent.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </SectionCard>
    </Box>
  );
}
