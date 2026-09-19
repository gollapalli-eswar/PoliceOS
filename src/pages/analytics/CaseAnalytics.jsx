import { Box, Paper, Typography, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PageHeader } from '../../components/common/Common';
import { caseStatusData } from '../../data/mockData';
import { colors } from '../../theme/theme';

const COLOR_MAP = { Active: colors.blue, 'Under Investigation': colors.warning, Closed: colors.steel };

export default function CaseAnalytics() {
  return (
    <Box>
      <PageHeader
        title="Case Analytics"
        breadcrumbs={[{ label: 'Station Analytics' }, { label: 'Case Analytics' }]}
        action={<Chip label="Demo data" size="small" sx={{ bgcolor: colors.warningBg, color: colors.warning, fontWeight: 700 }} />}
      />
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Cases by status</Typography>
        <Box sx={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={caseStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {caseStatusData.map(d => <Cell key={d.name} fill={COLOR_MAP[d.name] || colors.blue} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
