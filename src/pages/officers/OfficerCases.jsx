import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, TextField, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody, Breadcrumbs, Typography, Link as MLink } from '@mui/material';
import { PageHeader } from '../../components/common/Common';
import StatusBadge from '../../components/common/StatusBadge';
import { officers, getCasesByOfficer } from '../../data/mockData';

export default function OfficerCases() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState(params.get('officer') || officers[0].id);
  const officer = officers.find(o => o.id === officerId);
  const cases = getCasesByOfficer(officerId);

  return (
    <Box>
      <PageHeader
        title="Officer Cases"
        breadcrumbs={[{ label: 'Officer Management' }, { label: 'Officers', to: '/officers/list' }, { label: officer.name }]}
      />
      <TextField select size="small" label="Select Officer" value={officerId} onChange={(e) => setOfficerId(e.target.value)} sx={{ mb: 2.5, width: 280 }}>
        {officers.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
      </TextField>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell><TableCell>Crime Type</TableCell><TableCell>Priority</TableCell>
              <TableCell>Created</TableCell><TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map(c => (
              <TableRow key={c.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/case/${c.id}`)}>
                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{c.id}</TableCell>
                <TableCell>{c.crimeType}</TableCell>
                <TableCell><StatusBadge status={c.priority} /></TableCell>
                <TableCell>{c.createdDate}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
