import { useState } from 'react';
import { Box, TextField, InputAdornment, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, Tooltip } from '@mui/material';
import { Search, Eye } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { sops } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function PoliceSops() {
  const [q, setQ] = useState('');
  const { showToast } = useApp();
  const filtered = sops.filter(s => s.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <Box>
      <PageHeader title="Police SOPs" breadcrumbs={[{ label: 'Law Intelligence Agent' }, { label: 'Police SOPs' }]} />
      <TextField
        size="small" placeholder="Search SOP documents..." value={q} onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 2, width: 320 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search size={16} /></InputAdornment> }}
      />
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(s => (
              <TableRow key={s.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{s.title}</TableCell>
                <TableCell><Chip size="small" label={s.category} variant="outlined" /></TableCell>
                <TableCell>{s.updated}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Document">
                    <IconButton size="small" onClick={() => showToast(`Opening ${s.title}`, 'info')}><Eye size={16} /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
