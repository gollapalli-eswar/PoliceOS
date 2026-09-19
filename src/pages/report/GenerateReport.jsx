import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Stack, Paper, Typography, LinearProgress, Divider, List, ListItem } from '@mui/material';
import { FileBarChart, CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { cases } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const reportTypes = ['Investigation Report', 'Case Summary', 'Status Report', 'Daily Report'];
const stagesList = ['Collecting case data', 'Analyzing investigation activity', 'Drafting report sections', 'Finalizing report'];

export default function GenerateReport() {
  const [form, setForm] = useState({ caseId: 'CASE-1024', type: 'Investigation Report', from: '', to: '' });
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(-1);
  const [draft, setDraft] = useState(null);
  const { showToast } = useApp();
  const selectedCase = cases.find(c => c.id === form.caseId);

  const handleGenerate = () => {
    setGenerating(true);
    setDraft(null);
    stagesList.forEach((_, i) => setTimeout(() => setStage(i), (i + 1) * 600));
    setTimeout(() => {
      setGenerating(false);
      setDraft({
        title: `${form.type} — ${form.caseId}`,
        body: `This ${form.type.toLowerCase()} summarizes activity on ${form.caseId} (${selectedCase.crimeType}). Key findings include verified CCTV coverage, location correlation, and outstanding tasks pending officer follow-up. Evidence collected remains under active review, and no final determination has been made pending further investigation.`,
      });
      showToast('Report draft generated', 'success');
    }, stagesList.length * 600 + 400);
  };

  return (
    <Box>
      <PageHeader title="Generate Report" breadcrumbs={[{ label: 'Report Agent' }, { label: 'Generate Report' }]} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <SectionCard title="Report Parameters">
            <Stack spacing={2}>
              <TextField select size="small" label="Case" value={form.caseId} onChange={(e) => setForm({ ...form, caseId: e.target.value })}>
                {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
              </TextField>
              <TextField select size="small" label="Report Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {reportTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" type="date" label="From" InputLabelProps={{ shrink: true }} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
                <TextField fullWidth size="small" type="date" label="To" InputLabelProps={{ shrink: true }} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
              </Stack>
              <Button variant="contained" startIcon={<FileBarChart size={16} />} onClick={handleGenerate} disabled={generating}>
                {generating ? 'Generating…' : 'Generate Report'}
              </Button>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={7}>
          {generating && (
            <Paper sx={{ p: 3.5 }}>
              <Typography variant="subtitle1" sx={{ mb: 2.5 }}>Generating Report…</Typography>
              <List sx={{ py: 0 }}>
                {stagesList.map((s, i) => (
                  <ListItem key={s} sx={{ px: 0, py: 0.75, opacity: i <= stage ? 1 : 0.4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      {i < stage ? <CheckCircle2 size={16} color={colors.success} /> : <Box sx={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${colors.border}` }} />}
                      <Typography variant="body2">{s}</Typography>
                    </Stack>
                  </ListItem>
                ))}
              </List>
              <LinearProgress sx={{ mt: 2, borderRadius: 2 }} />
            </Paper>
          )}

          {!generating && !draft && (
            <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
              <FileBarChart size={30} color={colors.steel} style={{ marginBottom: 10 }} />
              <Typography variant="body2" color="text.secondary">Configure parameters and generate a report draft.</Typography>
            </Paper>
          )}

          {draft && (
            <Paper sx={{ p: 3.5 }}>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>{draft.title}</Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField fullWidth multiline rows={8} size="small" defaultValue={draft.body} />
              <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
                <Button variant="contained" onClick={() => showToast('Report updated', 'success')}>Update</Button>
                <Button variant="outlined" onClick={() => showToast('Report downloaded', 'success')}>Download</Button>
                <Button variant="outlined" color="success" onClick={() => showToast('Report submitted', 'success')}>Submit</Button>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
