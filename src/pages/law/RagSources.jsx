import { Box, Paper, Typography, Chip, Stack, LinearProgress } from '@mui/material';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { ragSources } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function RagSources() {
  return (
    <Box>
      <PageHeader title="RAG Sources" breadcrumbs={[{ label: 'Law Intelligence Agent' }, { label: 'RAG Sources' }]} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Retrieved document chunks most recently used by the AI to ground legal answers, ranked by relevance.
      </Typography>
      <Stack spacing={2}>
        {ragSources.map(s => (
          <SectionCard key={s.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Typography variant="subtitle1">{s.title}</Typography>
              <Chip size="small" label={`${Math.round(s.relevance * 100)}% relevance`} sx={{ bgcolor: colors.successBg, color: colors.success, fontWeight: 700 }} />
            </Stack>
            <Paper variant="outlined" sx={{ p: 1.75, bgcolor: '#F8FAFC', fontStyle: 'italic', mb: 1 }}>
              <Typography variant="body2">"{s.chunk}"</Typography>
            </Paper>
            <Typography variant="caption" color="text.secondary">Source: {s.doc}</Typography>
            <LinearProgress variant="determinate" value={s.relevance * 100} sx={{ mt: 1, height: 5, borderRadius: 3 }} />
          </SectionCard>
        ))}
      </Stack>
    </Box>
  );
}
