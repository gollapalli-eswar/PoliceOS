import { useState } from 'react';
import { Box, TextField, MenuItem, List, ListItemButton, ListItemText, Divider, Paper } from '@mui/material';
import { PageHeader } from '../../components/common/Common';
import { officers, recentActivity } from '../../data/mockData';

export default function OfficerActivity() {
  const [officerId, setOfficerId] = useState(officers[0].id);
  const officer = officers.find(o => o.id === officerId);

  return (
    <Box>
      <PageHeader title="Officer Activity" breadcrumbs={[{ label: 'Officer Management' }, { label: 'Officer Activity' }]} />
      <TextField select size="small" label="Select Officer" value={officerId} onChange={(e) => setOfficerId(e.target.value)} sx={{ mb: 2.5, width: 280 }}>
        {officers.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)}
      </TextField>

      <Paper sx={{ p: 0 }}>
        <List sx={{ py: 0 }}>
          {recentActivity.map((a, i) => (
            <Box key={a.id}>
              <ListItemButton sx={{ px: 2, py: 1.5 }}>
                <ListItemText
                  primary={a.text.replace(/Officer \w+ \w+/, officer.name)}
                  secondary={a.time}
                  primaryTypographyProps={{ fontSize: '0.85rem' }}
                  secondaryTypographyProps={{ fontSize: '0.72rem' }}
                />
              </ListItemButton>
              {i < recentActivity.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
