import { Box, Paper, Typography, Chip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '../../components/common/Common';
import { crimeCategoryData } from '../../data/mockData';
import { colors } from '../../theme/theme';

const PALETTE = [colors.navy, colors.blue, colors.blueLight, colors.gold, colors.steel, '#8FA8C7'];

export default function CrimeStatistics() {
  return (
    <Box>
      <PageHeader
        title="Crime Statistics"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'Crime Statistics' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Crime category distribution — last 30 days</Typography>
        <Box sx={{ width: '100%', height: 340 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={crimeCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={(d) => `${d.name} (${d.value})`}>
                {crimeCategoryData.map((entry, i) => <Cell key={entry.name} fill={PALETTE[i % PALETTE.length]} />)}
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
