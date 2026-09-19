import { Box, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FilePlus, FileSignature, Scale, Upload, Search, FileBarChart } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { colors } from '../../theme/theme';

const actions = [
  { label: 'Register Complaint', icon: FilePlus, to: '/complaint/register' },
  { label: 'Generate FIR', icon: FileSignature, to: '/fir/generate' },
  { label: 'Search Law', icon: Scale, to: '/law/search' },
  { label: 'Upload Evidence', icon: Upload, to: '/evidence/upload' },
  { label: 'Open Investigation', icon: Search, to: '/investigation/dashboard' },
  { label: 'Generate Report', icon: FileBarChart, to: '/report/generate' },
];

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <Box>
      <PageHeader title="Quick Actions" breadcrumbs={[{ label: 'AI Assistant' }, { label: 'Quick Actions' }]} />
      <Grid container spacing={2}>
        {actions.map(a => (
          <Grid item xs={12} sm={6} md={4} key={a.label}>
            <Paper
              onClick={() => navigate(a.to)}
              sx={{ p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { borderColor: colors.blue, bgcolor: colors.blueSurface } }}
            >
              <a.icon size={26} color={colors.blue} />
              <Typography variant="subtitle2" sx={{ mt: 1.5 }}>{a.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
