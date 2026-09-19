import { Box, Paper, Typography, Button, Stack, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, UserCog } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';
import { stationInfo } from '../data/mockData';

export default function Login() {
  const { setRole, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);
    showToast(`Signed in as ${role === 'officer' ? 'Police Officer' : 'Station Head'} (demo)`, 'success');
    navigate('/dashboard');
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: colors.navy, px: 2,
      backgroundImage: `radial-gradient(circle at 20% 20%, ${colors.navySurface} 0%, ${colors.navy} 55%)`,
    }}>
      <Paper sx={{ width: 420, p: 4, borderRadius: 3 }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={28} color="#fff" />
          </Box>
          <Typography variant="h5">PoliceOS AI</Typography>
          <Typography variant="body2" color="text.secondary">{stationInfo.name}</Typography>
        </Stack>

        <TextField fullWidth label="Username" defaultValue="arjun.rao" size="small" sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" type="password" defaultValue="••••••••" size="small" sx={{ mb: 3 }} />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          Demo mode — select a role to continue
        </Typography>

        <Stack spacing={1.5}>
          <Button
            fullWidth variant="contained" size="large" startIcon={<User size={18} />}
            onClick={() => handleLogin('officer')}
            sx={{ py: 1.1 }}
          >
            Continue as Police Officer
          </Button>
          <Button
            fullWidth variant="outlined" size="large" startIcon={<UserCog size={18} />}
            onClick={() => handleLogin('stationHead')}
            sx={{ py: 1.1 }}
          >
            Continue as Station Head
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Authorized personnel only · {stationInfo.code}
        </Typography>
      </Paper>
    </Box>
  );
}
