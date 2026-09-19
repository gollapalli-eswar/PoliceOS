import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Chip, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const designations = ['Constable', 'Head Constable', 'Sub-Inspector', 'Inspector'];
const permissionOptions = ['Complaint Management', 'FIR Drafting', 'Evidence Upload', 'Investigation Access', 'Report Generation'];

export default function CreateOfficer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', designation: 'Sub-Inspector', username: '', password: 'TempPass@123' });
  const [permissions, setPermissions] = useState(['Complaint Management', 'FIR Drafting']);
  const [success, setSuccess] = useState(false);
  const { showToast } = useApp();

  const togglePerm = (p) => setPermissions(list => list.includes(p) ? list.filter(x => x !== p) : [...list, p]);

  const handleSubmit = () => {
    if (!form.name || !form.email) { showToast('Please fill in required fields', 'error'); return; }
    setSuccess(true);
  };

  return (
    <Box>
      <PageHeader title="Create Officer" breadcrumbs={[{ label: 'Officer Management' }, { label: 'Create Officer' }]} />
      <SectionCard sx={{ maxWidth: 640 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth size="small" label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}>
              {designations.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Temporary Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Assigned Permissions</Typography>
        <FormGroup>
          <Grid container>
            {permissionOptions.map(p => (
              <Grid item xs={12} sm={6} key={p}>
                <FormControlLabel control={<Checkbox size="small" checked={permissions.includes(p)} onChange={() => togglePerm(p)} />} label={<Typography variant="body2">{p}</Typography>} />
              </Grid>
            ))}
          </Grid>
        </FormGroup>

        <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>Create Officer</Button>
      </SectionCard>

      <Dialog open={success} onClose={() => setSuccess(false)}>
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircle2 size={40} color={colors.success} />
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Officer Created</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{form.name} has been added to the station roster.</Typography>
          <Chip label={`Username: ${form.username || form.name.toLowerCase().replace(/\s+/g, '.')}`} size="small" />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={() => setSuccess(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
