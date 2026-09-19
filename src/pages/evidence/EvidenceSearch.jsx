import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, IconButton, Tooltip } from '@mui/material';
import { Eye } from 'lucide-react';
import { PageHeader, SectionCard, EmptyState } from '../../components/common/Common';
import { evidenceItems, evidenceTypes, cases, officers } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function EvidenceSearch() {
  const [filters, setFilters] = useState({ caseId: '', type: '', date: '', location: '', officer: '' });
  const { showToast } = useApp();

  const results = evidenceItems.filter(e =>
    (!filters.caseId || e.caseId === filters.caseId) &&
    (!filters.type || e.type === filters.type) &&
    (!filters.date || e.date === filters.date) &&
    (!filters.location || e.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.officer || e.uploadedBy === filters.officer)
  );

  return (
    <Box>
      <PageHeader title="Evidence Search" breadcrumbs={[{ label: 'Evidence Agent' }, { label: 'Evidence Search' }]} />
      <SectionCard sx={{ mb: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2.4}>
            <TextField select fullWidth size="small" label="Case" value={filters.caseId} onChange={(e) => setFilters({ ...filters, caseId: e.target.value })}>
              <MenuItem value="">All</MenuItem>
              {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <TextField select fullWidth size="small" label="Evidence Type" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
              <MenuItem value="">All</MenuItem>
              {evidenceTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <TextField fullWidth size="small" label="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={2.4}>
            <TextField select fullWidth size="small" label="Officer" value={filters.officer} onChange={(e) => setFilters({ ...filters, officer: e.target.value })}>
              <MenuItem value="">All</MenuItem>
              {officers.map(o => <MenuItem key={o.id} value={o.name}>{o.name}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </SectionCard>

      {results.length === 0 ? (
        <EmptyState title="No evidence matches these filters" subtitle="Try adjusting the filters above." />
      ) : (
        <Paper sx={{ overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Evidence ID</TableCell><TableCell>Case</TableCell><TableCell>Type</TableCell>
                <TableCell>Date / Time</TableCell><TableCell>Location</TableCell><TableCell>Uploaded By</TableCell>
                <TableCell>Status</TableCell><TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map(e => (
                <TableRow key={e.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{e.id}</TableCell>
                  <TableCell>{e.caseId}</TableCell>
                  <TableCell><Chip size="small" label={e.type} variant="outlined" /></TableCell>
                  <TableCell>{e.date} {e.time}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell>{e.uploadedBy}</TableCell>
                  <TableCell><Chip size="small" label={e.status} sx={{ fontWeight: 700 }} /></TableCell>
                  <TableCell align="right">
                    <Tooltip title="View"><IconButton size="small" onClick={() => showToast(`Opening ${e.id}`, 'info')}><Eye size={16} /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
