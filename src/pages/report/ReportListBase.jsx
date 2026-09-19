import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Stack } from '@mui/material';
import { Eye, Pencil, Download } from 'lucide-react';
import { PageHeader, EmptyState } from '../../components/common/Common';
import StatusBadge from '../../components/common/StatusBadge';
import { reports } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function ReportListBase({ title, breadcrumb, reportType }) {
  const { showToast } = useApp();
  const filtered = reports.filter(r => r.type === reportType);

  return (
    <Box>
      <PageHeader title={title} breadcrumbs={[{ label: 'Report Agent' }, { label: breadcrumb }]} />
      {filtered.length === 0 ? (
        <EmptyState title={`No ${title.toLowerCase()} yet`} subtitle="Generated reports of this type will appear here." />
      ) : (
        <Paper sx={{ overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report ID</TableCell><TableCell>Case ID</TableCell><TableCell>Created Date</TableCell>
                <TableCell>Officer</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{r.id}</TableCell>
                  <TableCell>{r.caseId}</TableCell>
                  <TableCell>{r.createdDate}</TableCell>
                  <TableCell>{r.officer}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.25} justifyContent="flex-end">
                      <Tooltip title="View"><IconButton size="small" onClick={() => showToast(`Opening ${r.id}`, 'info')}><Eye size={16} /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton size="small" onClick={() => showToast(`Editing ${r.id}`, 'info')}><Pencil size={16} /></IconButton></Tooltip>
                      <Tooltip title="Download"><IconButton size="small" onClick={() => showToast(`Downloading ${r.id}`, 'success')}><Download size={16} /></IconButton></Tooltip>
                    </Stack>
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
