import { useState } from 'react';
import { Box, TextField, MenuItem, Stack, Paper, Typography, Chip } from '@mui/material';
import { CheckCircle2, Circle } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { cases, caseTimelineSteps } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function CaseTimeline() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const selectedCase = cases.find(c => c.id === caseId);
  const steps = caseTimelineSteps(caseId);

  return (
    <Box>
      <PageHeader title="Case Timeline" breadcrumbs={[{ label: 'Investigation Agent' }, { label: 'Case Timeline' }]} />
      <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => setCaseId(e.target.value)} sx={{ mb: 3, width: 280 }}>
        {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <Typography variant="subtitle1" sx={{ mb: 2.5 }}>{selectedCase.id} — {selectedCase.crimeType}</Typography>

      <Box sx={{ position: 'relative', pl: 4 }}>
        <Box sx={{ position: 'absolute', left: 11, top: 6, bottom: 6, width: 2, bgcolor: colors.border }} />
        <Stack spacing={2.5}>
          {steps.map((s, i) => (
            <Box key={s.label} sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: -29, top: 2 }}>
                {s.done ? <CheckCircle2 size={22} color={colors.success} /> : <Circle size={22} color={colors.border} />}
              </Box>
              <Paper sx={{ p: 2, opacity: s.done ? 1 : 0.6 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.label}</Typography>
                  {s.done
                    ? <Chip size="small" label={s.date || 'Completed'} sx={{ bgcolor: colors.successBg, color: colors.success, fontWeight: 700 }} />
                    : <Chip size="small" label="Pending" sx={{ bgcolor: colors.bg, color: colors.steel, fontWeight: 700 }} />}
                </Stack>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
