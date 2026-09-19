import { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Stack, MenuItem, TextField, LinearProgress, Chip, Divider, List, ListItem } from '@mui/material';
import { FileSignature, CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { cases, complaints, getComplaintByCase } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const stagesList = ['Analyzing complaint', 'Retrieving legal provisions', 'Mapping provisions', 'Generating FIR draft'];

export default function GenerateFIR() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(-1);
  const [generated, setGenerated] = useState(false);
  const { showToast } = useApp();

  const selectedCase = cases.find(c => c.id === caseId);
  const complaint = getComplaintByCase(caseId);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setStage(0);
    stagesList.forEach((_, i) => {
      setTimeout(() => setStage(i), (i + 1) * 700);
    });
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      showToast('FIR draft generated successfully', 'success');
    }, stagesList.length * 700 + 400);
  };

  return (
    <Box>
      <PageHeader title="Generate FIR" breadcrumbs={[{ label: 'FIR Agent' }, { label: 'Generate FIR' }]} />

      <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => { setCaseId(e.target.value); setGenerated(false); }} sx={{ mb: 2.5, width: 300 }}>
        {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <SectionCard title="Complaint Summary" sx={{ mb: 2.5 }}>
            <Chip label={selectedCase.id} size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, mb: 1.5 }} />
            <Typography variant="subtitle1">{selectedCase.crimeType}</Typography>
            {complaint ? (
              <Stack spacing={1} sx={{ mt: 1.5 }}>
                <Detail label="Victim" value={complaint.complainantName} />
                <Detail label="Incident Date/Time" value={`${complaint.date} · ${complaint.time}`} />
                <Detail label="Location" value={complaint.location} />
                <Detail label="Description" value={complaint.description} />
              </Stack>
            ) : <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>No linked complaint found.</Typography>}
          </SectionCard>

          <SectionCard title="AI Legal Mapping">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Relevant provisions identified for this crime type:</Typography>
            <Stack spacing={1}>
              <Chip label="BNS Section 303 — Theft" size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, alignSelf: 'flex-start' }} />
              <Chip label="BNS Section 305 — Theft of motor vehicle" size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, alignSelf: 'flex-start' }} />
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={7}>
          {!generating && !generated && (
            <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
              <FileSignature size={32} color={colors.steel} style={{ marginBottom: 12 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Ready to generate a legally-mapped FIR draft for {selectedCase.id}.</Typography>
              <Button variant="contained" onClick={handleGenerate}>Generate FIR</Button>
            </Paper>
          )}

          {generating && (
            <Paper sx={{ p: 3.5 }}>
              <Typography variant="subtitle1" sx={{ mb: 2.5 }}>Generating FIR…</Typography>
              <List sx={{ py: 0 }}>
                {stagesList.map((s, i) => (
                  <ListItem key={s} sx={{ px: 0, py: 0.75, opacity: i <= stage ? 1 : 0.4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
                      {i < stage ? <CheckCircle2 size={16} color={colors.success} /> : i === stage ? <Box sx={{ width: 16 }}><LinearProgress sx={{ borderRadius: 2 }} /></Box> : <Box sx={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${colors.border}` }} />}
                      <Typography variant="body2">{s}</Typography>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {generated && (
            <Paper sx={{ p: 3.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Generated FIR Draft</Typography>
                <Chip label="Draft" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Detail label="FIR No." value={`FIR-30${Math.floor(Math.random()*90+10)}`} />
                <Detail label="Case" value={selectedCase.id} />
                <Detail label="Sections Applied" value="BNS Section 303, BNS Section 305" />
                <Detail label="Complainant" value={complaint?.complainantName || '—'} />
                <Detail label="Summary" value={`FIR registered for ${selectedCase.crimeType.toLowerCase()} reported at ${complaint?.location || selectedCase.location}.`} />
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button variant="contained" onClick={() => showToast('FIR saved to drafts', 'success')}>Save to Drafts</Button>
                <Button variant="outlined" onClick={() => showToast('Editing FIR draft', 'info')}>Edit Draft</Button>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function Detail({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}
