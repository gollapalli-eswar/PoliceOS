import { Box, Paper, Typography, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/common/Common';
import { officerActivityData } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function OfficerActivityAnalytics() {
  return (
    <Box>
      <PageHeader
        title="Officer Activity"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'Officer Activity' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Active vs completed cases by officer</Typography>
        <Box sx={{ width: '100%', height: 340 }}>
          <ResponsiveContainer>
            <BarChart data={officerActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" name="Active" fill={colors.blue} radius={[6, 6, 0, 0]} />
              <Bar dataKey="completed" name="Completed" fill={colors.gold} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
