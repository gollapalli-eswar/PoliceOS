import { useState } from 'react';
import { Box, TextField, InputAdornment, Paper, Typography, Stack, Chip, List, ListItemButton, Divider } from '@mui/material';
import { Search } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { legalProvisions } from '../../data/mockData';
import { colors } from '../../theme/theme';

export default function BnsBnss() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(legalProvisions[0]);
  const filtered = legalProvisions.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase()));

  return (
    <Box>
      <PageHeader title="BNS / BNSS" breadcrumbs={[{ label: 'Law Intelligence Agent' }, { label: 'BNS / BNSS' }]} />
      <TextField
        size="small" placeholder="Search sections..." value={q} onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 2, width: 320 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search size={16} /></InputAdornment> }}
      />
      <Stack direction="row" spacing={2.5} alignItems="flex-start" sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        <Paper sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
          <List sx={{ py: 0 }}>
            {filtered.map((p, i) => (
              <Box key={p.id}>
                <ListItemButton selected={selected.id === p.id} onClick={() => setSelected(p)} sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{p.code}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.title}</Typography>
                  </Box>
                </ListItemButton>
                {i < filtered.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 3, flex: 1 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Chip label={selected.code} size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700 }} />
            <Chip label={selected.source} size="small" variant="outlined" />
          </Stack>
          <Typography variant="h5" sx={{ mb: 1.5 }}>{selected.title}</Typography>
          <Typography variant="body2" color="text.secondary">{selected.text}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>Reference: {selected.source}, {selected.page}</Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
