import { Box, Paper, Typography, Stack, Switch, FormControlLabel, Divider, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { PageHeader } from '../../components/common/Common';
import { useApp } from '../../context/AppContext';

export default function Preferences() {
  const { showToast } = useApp();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [density, setDensity] = useState('comfortable');

  const toggle = (setter, label) => (e) => {
    setter(e.target.checked);
    showToast(`${label} ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
  };

  return (
    <Box>
      <PageHeader title="Settings" breadcrumbs={[{ label: 'Settings' }, { label: 'Preferences' }]} />
      <Paper sx={{ p: 3, maxWidth: 640 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Notifications</Typography>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch checked={emailNotif} onChange={toggle(setEmailNotif, 'Email notifications')} />} label="Email notifications" />
          <FormControlLabel control={<Switch checked={pushNotif} onChange={toggle(setPushNotif, 'Push notifications')} />} label="Push notifications" />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Display</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary">Table density</Typography>
          <Select size="small" value={density} onChange={e => setDensity(e.target.value)}>
            <MenuItem value="comfortable">Comfortable</MenuItem>
            <MenuItem value="compact">Compact</MenuItem>
          </Select>
        </Stack>
      </Paper>
    </Box>
  );
}
