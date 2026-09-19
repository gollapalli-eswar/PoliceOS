import { useState } from 'react';
import { Box, Grid, Stepper, Step, StepLabel, Typography, Button, TextField, MenuItem, Stack, Chip } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import StatusBadge from '../../components/common/StatusBadge';
import { officers } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const steps = ['Select Complaint', 'Assign Officer', 'Confirm Case'];

export default function CaseCreation() {
  const [active, setActive] = useState(0);
  const [officer, setOfficer] = useState('OFF-101');
  const { showToast } = useApp();
  const done = active === steps.length;

  return (
    <Box>
      <PageHeader title="Case Creation" breadcrumbs={[{ label: 'Complaint Agent' }, { label: 'Case Creation' }]} />
      <SectionCard>
        <Stepper activeStep={active} sx={{ mb: 4 }}>
          {steps.map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
        </Stepper>

        {!done && active === 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Unassigned complaint pending case creation</Typography>
            <SectionCard sx={{ bgcolor: '#F8FAFC' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1">COMP-5004 — Noise Complaint / Public Nuisance</Typography>
                  <Typography variant="body2" color="text.secondary">Vikram Shah · Sunrise Apartments, Block C · 2026-09-17</Typography>
                </Box>
                <StatusBadge status="Pending Review" />
              </Stack>
            </SectionCard>
          </Box>
        )}

        {!done && active === 1 && (
          <Box>
            <TextField select fullWidth label="Assign Officer" size="small" value={officer} onChange={(e) => setOfficer(e.target.value)} sx={{ maxWidth: 340 }}>
              {officers.map(o => <MenuItem key={o.id} value={o.id}>{o.name} — {o.designation}</MenuItem>)}
            </TextField>
          </Box>
        )}

        {!done && active === 2 && (
          <SectionCard sx={{ bgcolor: '#F8FAFC' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>CASE-1029</Typography>
            <Typography variant="body2" color="text.secondary">Crime: Noise Complaint / Public Nuisance</Typography>
            <Typography variant="body2" color="text.secondary">Assigned Officer: {officers.find(o => o.id === officer)?.name}</Typography>
            <Chip label="Status: Active" size="small" sx={{ mt: 1.5, bgcolor: '#EAF1FB', color: '#1B4F91', fontWeight: 700 }} />
          </SectionCard>
        )}

        {done && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircle2 size={40} color="#1E7A46" style={{ marginBottom: 10 }} />
            <Typography variant="h5">Case Created Successfully</Typography>
            <Chip label="CASE-1029" sx={{ mt: 1.5, bgcolor: '#EAF1FB', color: '#1B4F91', fontWeight: 700 }} />
          </Box>
        )}

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
          <Button disabled={active === 0 || done} onClick={() => setActive(a => a - 1)}>Back</Button>
          {!done ? (
            <Button variant="contained" onClick={() => {
              if (active === steps.length - 1) showToast('Case CASE-1029 created', 'success');
              setActive(a => a + 1);
            }}>
              {active === steps.length - 1 ? 'Create Case' : 'Next'}
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setActive(0)}>Create Another</Button>
          )}
        </Stack>
      </SectionCard>
    </Box>
  );
}
