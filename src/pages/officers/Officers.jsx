import { useNavigate } from 'react-router-dom';
import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Avatar, Stack, Typography, Button } from '@mui/material';
import { UserPlus } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { officers } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function Officers() {
  const navigate = useNavigate();
  return (
    <Box>
      <PageHeader
        title="Officers"
        breadcrumbs={[{ label: 'Officer Management' }, { label: 'Officers' }]}
        action={<Button variant="contained" startIcon={<UserPlus size={16} />} onClick={() => navigate('/officers/create')}>Create Officer</Button>}
      />
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Officer</TableCell><TableCell>Badge / ID</TableCell><TableCell>Designation</TableCell>
              <TableCell>Active Cases</TableCell><TableCell>Completed Cases</TableCell><TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officers.map(o => (
              <TableRow key={o.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/officers/cases?officer=${o.id}`)}>
                <TableCell>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: colors.navy, fontSize: '0.75rem' }}>{o.name.split(' ').slice(-2).map(n => n[0]).join('')}</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{o.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{o.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{o.badge}</TableCell>
                <TableCell>{o.designation}</TableCell>
                <TableCell>{o.activeCases}</TableCell>
                <TableCell>{o.completedCases}</TableCell>
                <TableCell>
                  <Chip size="small" label={o.status} sx={{
                    fontWeight: 700, bgcolor: o.status === 'On Duty' ? colors.successBg : colors.bg,
                    color: o.status === 'On Duty' ? colors.success : colors.steel,
                  }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
