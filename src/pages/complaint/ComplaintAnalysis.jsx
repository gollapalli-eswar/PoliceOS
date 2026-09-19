import { useState } from 'react';
import { Box, Grid, Typography, TextField, Stack, LinearProgress, Chip, MenuItem } from '@mui/material';
import { PageHeader, SectionCard, AIExtractedBadge } from '../../components/common/Common';
import { complaints, aiExtraction } from '../../data/mockData';

export default function ComplaintAnalysis() {
  const [selected, setSelected] = useState(complaints[0].id);
  const complaint = complaints.find(c => c.id === selected);
  const extracted = aiExtraction[selected] || aiExtraction['COMP-5001'];

  return (
    <Box>
      <PageHeader title="Complaint Analysis" breadcrumbs={[{ label: 'Complaint Agent' }, { label: 'Complaint Analysis' }]} />

      <TextField select size="small" label="Select Complaint" value={selected} onChange={(e) => setSelected(e.target.value)} sx={{ mb: 2, width: 280 }}>
        {complaints.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <SectionCard title="Original Complaint">
            <Stack spacing={1.5}>
              <Field label="Complainant" value={complaint.complainantName} />
              <Field label="Contact" value={complaint.contact} />
              <Field label="Type" value={complaint.crimeType} />
              <Field label="Date / Time" value={`${complaint.date} · ${complaint.time}`} />
              <Field label="Location" value={complaint.location} />
              <Field label="Property" value={complaint.property} />
              <Field label="Description" value={complaint.description} />
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="AI Extracted Information" action={<AIExtractedBadge />}>
            <Stack spacing={1.5}>
              <TextField fullWidth size="small" label="Crime Type" defaultValue={extracted.crimeType} />
              <TextField fullWidth size="small" label="Date" defaultValue={extracted.date} />
              <TextField fullWidth size="small" label="Time" defaultValue={extracted.time} />
              <TextField fullWidth size="small" label="Location" defaultValue={extracted.location} />
              <TextField fullWidth size="small" label="Victim" defaultValue={extracted.victim} />
              <TextField fullWidth size="small" label="Property" defaultValue={extracted.property} />
              <TextField fullWidth size="small" multiline rows={3} label="Incident Description" defaultValue={extracted.incidentDescription} />
            </Stack>

            <Box sx={{ mt: 2.5 }}>
              <Typography variant="caption" color="text.secondary">AI Confidence Indicator</Typography>
              <LinearProgress variant="determinate" value={extracted.confidence * 100} sx={{ mt: 0.5, height: 6, borderRadius: 3 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">{Math.round(extracted.confidence * 100)}% match confidence</Typography>
                <Chip size="small" label="High Confidence" sx={{ bgcolor: '#E7F5EC', color: '#1E7A46', fontWeight: 700, height: 20, fontSize: '0.65rem' }} />
              </Stack>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}
