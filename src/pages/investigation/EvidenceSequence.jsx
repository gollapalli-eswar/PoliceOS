import { useState } from 'react';
import {
  Box, TextField, MenuItem, Stack, Chip, Button, Paper, Typography, ToggleButtonGroup, ToggleButton,
  LinearProgress, Divider,
} from '@mui/material';
import { Video, MapPin, Phone, Image as ImageIcon, ScanFace, FileText, Mic, Sparkles, Download, Eye, Info } from 'lucide-react';
import { PageHeader, ConfidenceTag } from '../../components/common/Common';
import { cases, evidenceSequences } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const typeIcon = { CCTV: Video, Location: MapPin, 'Call Record': Phone, Image: ImageIcon, 'Face Recognition': ScanFace, Document: FileText, Audio: Mic };
const filterOptions = ['All', 'CCTV', 'Location', 'Calls', 'Face Recognition', 'Images', 'Documents'];

export default function EvidenceSequence() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const [filter, setFilter] = useState('All');
  const [generating, setGenerating] = useState(false);
  const { showToast } = useApp();

  const selectedCase = cases.find(c => c.id === caseId);
  const sequence = evidenceSequences[caseId] || [];

  const filtered = sequence.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Calls') return s.type === 'Call Record';
    return s.type === filter;
  });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); showToast('Evidence sequence regenerated', 'success'); }, 1500);
  };

  return (
    <Box>
      <PageHeader
        title="Evidence Sequence"
        breadcrumbs={[{ label: 'Investigation Agent' }, { label: 'Evidence Sequence' }]}
        action={
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" startIcon={<Download size={16} />} onClick={() => showToast('Sequence exported as PDF', 'success')}>Export Sequence</Button>
            <Button variant="contained" startIcon={<Sparkles size={16} />} onClick={handleGenerate} disabled={generating}>
              {generating ? 'Generating…' : 'Generate Evidence Sequence'}
            </Button>
          </Stack>
        }
      />

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5, flexWrap: 'wrap' }}>
        <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => setCaseId(e.target.value)} sx={{ width: 260 }}>
          {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
        </TextField>
        <ToggleButtonGroup exclusive size="small" value={filter} onChange={(e, v) => v && setFilter(v)} sx={{ flexWrap: 'wrap' }}>
          {filterOptions.map(f => (
            <ToggleButton key={f} value={f} sx={{ textTransform: 'none', fontSize: '0.75rem', px: 1.5, py: 0.5 }}>{f}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Paper sx={{ p: 2, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.25, bgcolor: colors.blueSurface, border: `1px solid ${colors.blue}22` }}>
        <Info size={17} color={colors.blue} style={{ flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: colors.navy }}>
          This is an AI-assisted reconstruction based on available evidence and timestamps. Items marked <strong>AI-INFERRED / CORRELATED</strong> are not confirmed facts and require officer verification.
        </Typography>
      </Paper>

      {generating && <LinearProgress sx={{ mb: 2.5, borderRadius: 2 }} />}

      {filtered.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
          <Typography variant="body2" color="text.secondary">No evidence sequence events match this filter for {selectedCase.id}.</Typography>
        </Paper>
      ) : (
        <Box sx={{ position: 'relative', pl: 4 }}>
          <Box sx={{ position: 'absolute', left: 15, top: 8, bottom: 8, width: 2, bgcolor: colors.border }} />
          <Stack spacing={2.5}>
            {filtered.map((ev) => {
              const Icon = typeIcon[ev.type] || FileText;
              const isConfirmed = ev.confidence === 'confirmed';
              return (
                <Box key={ev.id} sx={{ position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute', left: -33, top: 4, width: 30, height: 30, borderRadius: '50%',
                    bgcolor: isConfirmed ? colors.blue : '#fff', border: `2px solid ${isConfirmed ? colors.blue : colors.warning}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                  }}>
                    <Icon size={14} color={isConfirmed ? '#fff' : colors.warning} />
                  </Box>
                  <Paper sx={{ p: 2.25, borderLeft: `3px solid ${isConfirmed ? colors.blue : colors.warning}` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.75, flexWrap: 'wrap', gap: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontVariantNumeric: 'tabular-nums' }}>{ev.time}</Typography>
                        <Chip size="small" label={ev.type} variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                      </Stack>
                      <ConfidenceTag level={ev.confidence} />
                    </Stack>
                    <Typography variant="body2" sx={{ mb: 1 }}>{ev.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>{ev.note}</Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">Source: {ev.evidenceId}</Typography>
                      <Button size="small" startIcon={<Eye size={14} />} onClick={() => showToast(`Opening evidence ${ev.evidenceId}`, 'info')}>View Evidence</Button>
                    </Stack>
                  </Paper>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
