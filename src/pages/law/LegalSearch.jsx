import { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Paper, Typography, Chip, Stack, Divider, LinearProgress, Button } from '@mui/material';
import { Search, BookOpen, Scale } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { colors } from '../../theme/theme';
import { legalProvisions } from '../../data/mockData';

export default function LegalSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const match = legalProvisions.find(p => query.toLowerCase().includes('intimidation')) || legalProvisions[3];
      setResult(match);
    }, 1100);
  };

  return (
    <Box>
      <PageHeader title="Legal Search" breadcrumbs={[{ label: 'Law Intelligence Agent' }, { label: 'Legal Search' }]} />

      <Paper sx={{ p: 3, mb: 3, bgcolor: colors.navy }}>
        <TextField
          fullWidth value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask a legal question... e.g. Explain the provision related to criminal intimidation."
          sx={{
            bgcolor: '#fff', borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Scale size={18} color={colors.steel} /></InputAdornment>,
            endAdornment: <Button variant="contained" onClick={handleSearch} sx={{ ml: 1 }}>Ask</Button>,
          }}
        />
      </Paper>

      {loading && <LinearProgress sx={{ mb: 2, borderRadius: 2 }} />}

      {result && (
        <Box>
          <SectionCard title="Answer" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Based on the retrieved provision, <strong>{result.title}</strong> under {result.code} covers situations where a
              person threatens another with harm to person, reputation, or property in order to cause alarm or compel an action.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip icon={<BookOpen size={14} />} label={result.code} size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700 }} />
              <Chip label={result.source} size="small" variant="outlined" />
              <Chip label={result.page} size="small" variant="outlined" />
              <Chip label="94% relevance" size="small" sx={{ bgcolor: colors.successBg, color: colors.success, fontWeight: 700 }} />
            </Stack>
          </SectionCard>

          <SectionCard title="Retrieved Source Text">
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#F8FAFC', fontStyle: 'italic' }}>
              <Typography variant="body2">"{result.text}"</Typography>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Source: {result.source}, {result.page}
            </Typography>
          </SectionCard>
        </Box>
      )}

      {!result && !loading && (
        <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
          <Scale size={30} color={colors.steel} style={{ marginBottom: 10 }} />
          <Typography variant="body2" color="text.secondary">Ask a legal question to retrieve AI-backed answers with citations.</Typography>
        </Paper>
      )}
    </Box>
  );
}
