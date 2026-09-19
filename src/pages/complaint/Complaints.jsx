import { useState } from 'react';
import {
  Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip,
  TextField, InputAdornment, Button, Menu, MenuItem, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Pencil, UserPlus, FolderOpen, FilePlus } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import StatusBadge from '../../components/common/StatusBadge';
import { complaints, getOfficerById } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function Complaints() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { showToast } = useApp();

  const filtered = complaints.filter(c =>
    c.id.toLowerCase().includes(q.toLowerCase()) ||
    c.complainantName.toLowerCase().includes(q.toLowerCase()) ||
    c.crimeType.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Complaints"
        breadcrumbs={[{ label: 'Complaint Agent' }, { label: 'Complaints' }]}
        action={<Button variant="contained" startIcon={<FilePlus size={16} />} onClick={() => navigate('/complaint/register')}>Register Complaint</Button>}
      />
      <TextField
        size="small" placeholder="Search complaints..." value={q} onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 2, width: 320 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search size={16} /></InputAdornment> }}
      />
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>Complaint ID</TableCell>
              <TableCell>Crime Type</TableCell>
              <TableCell>Complainant</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Assigned Officer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id} hover>
                <TableCell sx={{ fontWeight: 700, cursor: c.caseId ? 'pointer' : 'default', color: c.caseId ? 'primary.main' : 'inherit' }}
                  onClick={() => c.caseId && navigate(`/case/${c.caseId}`)}>
                  {c.caseId || '—'}
                </TableCell>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.crimeType}</TableCell>
                <TableCell>{c.complainantName}</TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell>{getOfficerById(c.officer)?.name || '—'}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
                <TableCell align="right">
                  <RowActions complaint={c} navigate={navigate} showToast={showToast} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

function RowActions({ complaint, navigate, showToast }) {
  const [anchor, setAnchor] = useState(null);
  return (
    <Stack direction="row" spacing={0.25} justifyContent="flex-end">
      <Tooltip title="View">
        <IconButton size="small" onClick={() => navigate('/complaint/analysis')}><Eye size={16} /></IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => showToast(`Editing ${complaint.id}`, 'info')}><Pencil size={16} /></IconButton>
      </Tooltip>
      <Tooltip title="Assign">
        <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}><UserPlus size={16} /></IconButton>
      </Tooltip>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        {['Officer Arjun Rao', 'Officer Priya Menon', 'Officer Karthik Iyer', 'Officer Sneha Patil'].map(o => (
          <MenuItem key={o} onClick={() => { setAnchor(null); showToast(`${complaint.id} assigned to ${o}`, 'success'); }}>{o}</MenuItem>
        ))}
      </Menu>
      {complaint.caseId ? (
        <Tooltip title="Open Case">
          <IconButton size="small" onClick={() => navigate(`/case/${complaint.caseId}`)}><FolderOpen size={16} /></IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create Case">
          <IconButton size="small" onClick={() => navigate('/complaint/case-creation')}><FolderOpen size={16} /></IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
