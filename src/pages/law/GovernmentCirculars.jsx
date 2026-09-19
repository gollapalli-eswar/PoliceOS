import { useState } from 'react';
import { Box, TextField, InputAdornment, Paper, List, ListItemButton, ListItemText, Divider, IconButton, Tooltip } from '@mui/material';
import { Search, Download } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { circulars } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function GovernmentCirculars() {
  const [q, setQ] = useState('');
  const { showToast } = useApp();
  const filtered = circulars.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <Box>
      <PageHeader title="Government Circulars" breadcrumbs={[{ label: 'Law Intelligence Agent' }, { label: 'Government Circulars' }]} />
      <TextField
        size="small" placeholder="Search circulars..." value={q} onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 2, width: 320 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search size={16} /></InputAdornment> }}
      />
      <Paper>
        <List sx={{ py: 0 }}>
          {filtered.map((c, i) => (
            <Box key={c.id}>
              <ListItemButton sx={{ py: 1.5 }}>
                <ListItemText primary={c.title} secondary={`Issued ${c.date}`} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.88rem' }} />
                <Tooltip title="Download">
                  <IconButton size="small" onClick={() => showToast(`Downloading ${c.title}`, 'info')}><Download size={16} /></IconButton>
                </Tooltip>
              </ListItemButton>
              {i < filtered.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
