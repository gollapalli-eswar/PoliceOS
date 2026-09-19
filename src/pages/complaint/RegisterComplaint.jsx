import { useState } from 'react';
import {
  Box, Grid, TextField, MenuItem, Button, Stack, Typography, Paper, Divider,
  LinearProgress, Chip, IconButton,
} from '@mui/material';
import { Sparkles, Mic, Paperclip, CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionCard, AIExtractedBadge } from '../../components/common/Common';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';
import { aiExtraction } from '../../data/mockData';

const crimeTypes = ['Vehicle Theft', 'Cybercrime — Financial Fraud', 'Missing Person', 'Burglary', 'Assault', 'Noise Complaint / Public Nuisance', 'Other'];

export default function RegisterComplaint() {
  const { showToast } = useApp();
  const [form, setForm] = useState({
    name: '', contact: '', type: '', date: '', time: '', location: '', description: '', property: '',
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [registered, setRegistered] = useState(false);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setExtracted({ ...aiExtraction['COMP-5001'], crimeType: form.type || aiExtraction['COMP-5001'].crimeType });
      showToast('AI analysis complete — review extracted details below', 'success');
    }, 1400);
  };

  const handleRegister = () => {
    setRegistered(true);
    showToast('Complaint registered — CASE-1024 created', 'success');
  };

  if (registered) {
    return (
      <Box>
        <PageHeader title="Register Complaint" breadcrumbs={[{ label: 'Complaint Agent' }, { label: 'Register Complaint' }]} />
        <Paper sx={{ p: 5, textAlign: 'center', maxWidth: 480, mx: 'auto' }}>
          <CheckCircle2 size={44} color={colors.success} style={{ marginBottom: 12 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>Complaint Registered</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            A new case has been created from this complaint.
          </Typography>
          <Chip label="CASE-1024" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, mb: 3 }} />
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <Button variant="outlined" onClick={() => { setRegistered(false); setExtracted(null); setForm({ name: '', contact: '', type: '', date: '', time: '', location: '', description: '', property: '' }); }}>
              Register Another
            </Button>
            <Button variant="contained">View Case</Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Register Complaint" breadcrumbs={[{ label: 'Complaint Agent' }, { label: 'Register Complaint' }]} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <SectionCard title="Complaint Details">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Complainant Name" size="small" value={form.name} onChange={update('name')} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Contact Number" size="small" value={form.contact} onChange={update('contact')} /></Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Complaint Type" size="small" value={form.type} onChange={update('type')}>
                  {crimeTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}><TextField fullWidth type="date" label="Incident Date" size="small" InputLabelProps={{ shrink: true }} value={form.date} onChange={update('date')} /></Grid>
              <Grid item xs={6} sm={3}><TextField fullWidth type="time" label="Incident Time" size="small" InputLabelProps={{ shrink: true }} value={form.time} onChange={update('time')} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Location" size="small" value={form.location} onChange={update('location')} /></Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Description" size="small" value={form.description} onChange={update('description')}
                  placeholder="Describe what happened in detail..." />
              </Grid>
              <Grid item xs={12}><TextField fullWidth label="Property / Item Involved" size="small" value={form.property} onChange={update('property')} /></Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="outlined" size="small" startIcon={<Paperclip size={15} />}>Supporting Documents</Button>
                  <Button variant="outlined" size="small" startIcon={<Mic size={15} />}>Voice Input</Button>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2.5 }} />
            <Button
              variant="contained" startIcon={<Sparkles size={16} />}
              onClick={handleAnalyze} disabled={analyzing}
            >
              {analyzing ? 'Analyzing Complaint…' : 'Analyze Complaint'}
            </Button>
            {analyzing && <LinearProgress sx={{ mt: 2, borderRadius: 2 }} />}
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={5}>
          {!extracted && (
            <Paper sx={{ p: 4, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
              <Sparkles size={28} color={colors.steel} style={{ marginBottom: 10 }} />
              <Typography variant="body2" color="text.secondary">
                Run AI analysis to auto-extract structured complaint fields for review.
              </Typography>
            </Paper>
          )}
          {extracted && (
            <SectionCard title="Extracted Information" action={<AIExtractedBadge />}>
              <Stack spacing={1.75}>
                <ExtractedField label="Crime Type" value={extracted.crimeType} />
                <ExtractedField label="Date" value={extracted.date} />
                <ExtractedField label="Time" value={extracted.time} />
                <ExtractedField label="Location" value={extracted.location} />
                <ExtractedField label="Victim" value={extracted.victim} />
                <ExtractedField label="Property" value={extracted.property} />
                <ExtractedField label="Incident Description" value={extracted.incidentDescription} multiline />
                <Box>
                  <Typography variant="caption" color="text.secondary">AI Confidence</Typography>
                  <LinearProgress variant="determinate" value={extracted.confidence * 100} sx={{ mt: 0.5, height: 6, borderRadius: 3 }} />
                  <Typography variant="caption" color="text.secondary">{Math.round(extracted.confidence * 100)}% confidence</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2.5 }} />
              <Button fullWidth variant="contained" color="success" onClick={handleRegister}>
                Verify & Register Complaint
              </Button>
            </SectionCard>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function ExtractedField({ label, value, multiline }) {
  const [val, setVal] = useState(value);
  return (
    <TextField
      fullWidth size="small" label={label} value={val}
      onChange={(e) => setVal(e.target.value)}
      multiline={multiline} rows={multiline ? 3 : 1}
    />
  );
}
