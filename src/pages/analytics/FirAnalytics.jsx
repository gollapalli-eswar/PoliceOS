import { Box, Paper, Typography, Chip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '../../components/common/Common';
import { firStatusData } from '../../data/mockData';
import { colors } from '../../theme/theme';

const COLOR_MAP = { Draft: colors.warning, 'Pending Approval': colors.gold, Approved: colors.success };

export default function FirAnalytics() {
  return (
    <Box>
      <PageHeader
        title="FIR Analytics"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'FIR Analytics' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>FIRs by status</Typography>
        <Box sx={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={firStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={(d) => `${d.name} (${d.value})`}>
                {firStatusData.map(d => <Cell key={d.name} fill={COLOR_MAP[d.name] || colors.blue} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
