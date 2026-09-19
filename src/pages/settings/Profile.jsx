import { Box, Paper, Typography, Avatar, Stack, TextField, Button, Divider, Chip } from '@mui/material';
import { useState } from 'react';
import { PageHeader } from '../../components/common/Common';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

export default function Profile() {
  const { user, role, showToast } = useApp();
  const [phone, setPhone] = useState('+91 98450 11221');
  const [email, setEmail] = useState(`${user.name.toLowerCase().replace(/\s+/g, '.')}@police.gov.in`);

  return (
    <Box>
      <PageHeader title="Profile" breadcrumbs={[{ label: 'Settings' }, { label: 'Profile' }]} />
      <Paper sx={{ p: 3, maxWidth: 640 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: colors.navy, fontWeight: 700 }}>
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Chip size="small" label={user.role} sx={{ bgcolor: colors.blueSurface, color: colors.blue, fontWeight: 700 }} />
              <Chip size="small" label={`Badge ${user.badge}`} sx={{ bgcolor: colors.infoBg, color: colors.steel, fontWeight: 700 }} />
            </Stack>
          </Box>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={2}>
          <TextField label="Full Name" value={user.name} disabled fullWidth size="small" />
          <TextField label="Station" value={user.station} disabled fullWidth size="small" />
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth size="small" />
          <TextField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} fullWidth size="small" />
        </Stack>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => showToast('Profile updated', 'success')}
        >
          Save changes
        </Button>
      </Paper>
    </Box>
  );
}
