import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Stack, Paper, Typography, Divider } from '@mui/material';
import { Plus } from 'lucide-react';
import { PageHeader, SectionCard, EmptyState } from '../../components/common/Common';
import { cases, investigationUpdates as initialUpdates, officers, evidenceItems } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

export default function InvestigationUpdates() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const [updates, setUpdates] = useState(initialUpdates);
  const [form, setForm] = useState({ date: '', time: '', activity: '', description: '', officer: 'OFF-101', relatedEvidence: '', notes: '' });
  const { showToast } = useApp();

  const caseUpdates = (updates[caseId] || []).slice().sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));

  const handleAdd = () => {
    if (!form.activity || !form.description) { showToast('Activity and description are required', 'error'); return; }
    const entry = { id: `U${Date.now()}`, ...form };
    setUpdates(prev => ({ ...prev, [caseId]: [...(prev[caseId] || []), entry] }));
    setForm({ date: '', time: '', activity: '', description: '', officer: 'OFF-101', relatedEvidence: '', notes: '' });
    showToast('Investigation update added', 'success');
  };

  return (
    <Box>
      <PageHeader title="Investigation Updates" breadcrumbs={[{ label: 'Investigation Agent' }, { label: 'Investigation Updates' }]} />
      <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => setCaseId(e.target.value)} sx={{ mb: 2.5, width: 280 }}>
        {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <SectionCard title="Add Update">
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <TextField fullWidth size="small" type="time" label="Time" InputLabelProps={{ shrink: true }} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </Stack>
              <TextField size="small" label="Activity" value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} placeholder="e.g. Witness Interview" />
              <TextField size="small" multiline rows={3} label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <TextField select size="small" label="Officer" value={form.officer} onChange={(e) => setForm({ ...form, officer: e.target.value })}>
                {officers.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
              </TextField>
              <TextField size="small" label="Related Evidence" value={form.relatedEvidence} onChange={(e) => setForm({ ...form, relatedEvidence: e.target.value })} placeholder="e.g. EVD-9001, EVD-9003" />
              <TextField size="small" multiline rows={2} label="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              <Button variant="contained" startIcon={<Plus size={16} />} onClick={handleAdd}>Add Update</Button>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <SectionCard title="Chronological Updates">
            {caseUpdates.length === 0 ? (
              <EmptyState title="No updates yet" subtitle="Add the first investigation update for this case." />
            ) : (
              <Stack spacing={2}>
                {caseUpdates.map((u, i) => (
                  <Box key={u.id}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle2">{u.activity}</Typography>
                      <Typography variant="caption" color="text.secondary">{u.date} · {u.time}</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>{u.description}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      Officer: {officers.find(o => o.id === u.officer)?.name || u.officer}
                      {u.relatedEvidence ? ` · Evidence: ${u.relatedEvidence}` : ''}
                    </Typography>
                    {i < caseUpdates.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
