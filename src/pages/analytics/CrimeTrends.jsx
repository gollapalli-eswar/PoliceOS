import { Box, Paper, Typography, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/common/Common';
import { crimeTrendData } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function CrimeTrends() {
  return (
    <Box>
      <PageHeader
        title="Crime Trends"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'Crime Trends' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Reported cases by month</Typography>
        <Box sx={{ width: '100%', height: 340 }}>
          <ResponsiveContainer>
            <LineChart data={crimeTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="cases" stroke={colors.blue} strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
