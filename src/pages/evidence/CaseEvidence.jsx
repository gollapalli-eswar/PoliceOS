import { useState } from 'react';
import { Box, Grid, Paper, Typography, Chip, TextField, MenuItem, Stack, Button, IconButton, Tooltip } from '@mui/material';
import { Video, MapPin, Phone, Image as ImageIcon, ScanFace, FileText, Mic, Eye } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { cases, getEvidenceByCase } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const typeIcon = { CCTV: Video, Location: MapPin, 'Call Record': Phone, Image: ImageIcon, 'Face Recognition': ScanFace, Document: FileText, Audio: Mic };

export default function CaseEvidence() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const { showToast } = useApp();
  const items = getEvidenceByCase(caseId);
  const selectedCase = cases.find(c => c.id === caseId);

  return (
    <Box>
      <PageHeader title="Case Evidence" breadcrumbs={[{ label: 'Evidence Agent' }, { label: 'Case Evidence' }]} />
      <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => setCaseId(e.target.value)} sx={{ mb: 2.5, width: 280 }}>
        {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>{selectedCase.id} · {items.length} evidence item{items.length !== 1 ? 's' : ''}</Typography>

      {items.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
          <Typography variant="body2" color="text.secondary">No evidence recorded for this case yet.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {items.map(e => {
            const Icon = typeIcon[e.type] || FileText;
            return (
              <Grid item xs={12} sm={6} md={4} key={e.id}>
                <Paper sx={{ p: 2.25, height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: colors.blueSurface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={17} color={colors.blue} />
                    </Box>
                    <Chip size="small" label={e.status} sx={{ fontWeight: 700, fontSize: '0.65rem' }} />
                  </Stack>
                  <Typography variant="subtitle2">{e.type}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.78rem' }}>{e.description}</Typography>
                  <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">{e.date} · {e.time}</Typography>
                    <Typography variant="caption" color="text.secondary">{e.location}</Typography>
                    <Typography variant="caption" color="text.secondary">Uploaded by {e.uploadedBy}</Typography>
                  </Stack>
                  <Button size="small" fullWidth variant="outlined" startIcon={<Eye size={14} />} onClick={() => showToast(`Opening ${e.id}`, 'info')}>View</Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
