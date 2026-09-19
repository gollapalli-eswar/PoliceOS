import { useState } from 'react';
import {
  Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Chip, Divider,
} from '@mui/material';
import { Eye, Pencil, Save, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import StatusBadge from '../../components/common/StatusBadge';
import { firs as initialFirs } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

export default function FIRDrafts() {
  const [firs, setFirs] = useState(initialFirs);
  const [viewFir, setViewFir] = useState(null);
  const [editFir, setEditFir] = useState(null);
  const [deleteFir, setDeleteFir] = useState(null);
  const [approveFir, setApproveFir] = useState(null);
  const { showToast } = useApp();

  const handleDelete = () => {
    setFirs(list => list.filter(f => f.id !== deleteFir.id));
    showToast(`${deleteFir.id} deleted`, 'success');
    setDeleteFir(null);
  };

  const handleApprove = () => {
    setFirs(list => list.map(f => f.id === approveFir.id ? { ...f, status: 'Approved', lastUpdated: new Date().toISOString().slice(0, 10) } : f));
    showToast(`${approveFir.id} approved`, 'success');
    setApproveFir(null);
  };

  const handleUpdate = () => {
    setFirs(list => list.map(f => f.id === editFir.id ? editFir : f));
    showToast(`${editFir.id} updated`, 'success');
    setEditFir(null);
  };

  return (
    <Box>
      <PageHeader title="FIR Drafts" breadcrumbs={[{ label: 'FIR Agent' }, { label: 'FIR Drafts' }]} />
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FIR ID</TableCell>
              <TableCell>Case ID</TableCell>
              <TableCell>Crime Type</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Officer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firs.map(f => (
              <TableRow key={f.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{f.id}</TableCell>
                <TableCell>{f.caseId}</TableCell>
                <TableCell>{f.crimeType}</TableCell>
                <TableCell>{f.createdDate}</TableCell>
                <TableCell>{f.officer}</TableCell>
                <TableCell><StatusBadge status={f.status} /></TableCell>
                <TableCell>{f.lastUpdated}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.25} justifyContent="flex-end">
                    <Tooltip title="View"><IconButton size="small" onClick={() => setViewFir(f)}><Eye size={16} /></IconButton></Tooltip>
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => setEditFir({ ...f })}><Pencil size={16} /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" onClick={() => setDeleteFir(f)}><Trash2 size={16} /></IconButton></Tooltip>
                    <Tooltip title="Approve">
                      <span>
                        <IconButton size="small" disabled={f.status === 'Approved'} onClick={() => setApproveFir(f)}><CheckCircle2 size={16} /></IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* View Dialog */}
      <Dialog open={!!viewFir} onClose={() => setViewFir(null)} maxWidth="sm" fullWidth>
        {viewFir && (
          <>
            <DialogTitle>{viewFir.id}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={1.5}>
                <Row label="Case" value={viewFir.caseId} />
                <Row label="Crime Type" value={viewFir.crimeType} />
                <Row label="Status" value={<StatusBadge status={viewFir.status} />} />
                <Row label="Provisions" value={viewFir.provisions.join(', ')} />
                <Row label="Summary" value={viewFir.summary} />
              </Stack>
            </DialogContent>
            <DialogActions><Button onClick={() => setViewFir(null)}>Close</Button></DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editFir} onClose={() => setEditFir(null)} maxWidth="sm" fullWidth>
        {editFir && (
          <>
            <DialogTitle>Edit {editFir.id}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 0.5 }}>
                <TextField label="Crime Type" size="small" value={editFir.crimeType} onChange={(e) => setEditFir({ ...editFir, crimeType: e.target.value })} />
                <TextField label="Summary" size="small" multiline rows={3} value={editFir.summary} onChange={(e) => setEditFir({ ...editFir, summary: e.target.value })} />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditFir(null)}>Cancel</Button>
              <Button variant="contained" startIcon={<Save size={15} />} onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteFir} onClose={() => setDeleteFir(null)}>
        <DialogTitle>Delete {deleteFir?.id}?</DialogTitle>
        <DialogContent><Typography variant="body2">This will permanently remove this FIR draft. This action cannot be undone.</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteFir(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Approve Confirmation */}
      <Dialog open={!!approveFir} onClose={() => setApproveFir(null)}>
        <DialogTitle>Approve {approveFir?.id}?</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <ShieldCheck size={22} color={colors.blue} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Final approval by authorized police personnel.</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">Approving will mark this FIR as officially registered and lock it from further edits.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveFir(null)}>Cancel</Button>
          <Button color="success" variant="contained" onClick={handleApprove}>Approve</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Row({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" component="div">{value}</Typography>
    </Box>
  );
}
