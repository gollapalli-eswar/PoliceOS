import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Stack, Chip, Divider } from '@mui/material';
import { Mic, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { colors } from '../../theme/theme';

const samples = [
  { transcript: 'Open FIR for CASE-1024.', response: 'Opening FIR-3001 for CASE-1024.', action: 'Navigated to FIR-3001' },
  { transcript: 'Search robbery sections.', response: 'Here are the relevant BNS sections for robbery-related offences.', action: 'Opened Legal Search' },
  { transcript: 'Generate report for CASE-1024.', response: 'Generating a status report for CASE-1024.', action: 'Report generation started' },
];

export default function VoiceAssistant() {
  const [state, setState] = useState('idle'); // idle | listening | processing | done
  const [sample, setSample] = useState(null);

  const startListening = () => {
    setState('listening');
    const s = samples[Math.floor(Math.random() * samples.length)];
    setSample(s);
    setTimeout(() => setState('processing'), 1600);
    setTimeout(() => setState('done'), 2600);
  };

  return (
    <Box>
      <PageHeader title="Voice Assistant" breadcrumbs={[{ label: 'AI Assistant' }, { label: 'Voice Assistant' }]} />
      <Paper sx={{ p: 5, textAlign: 'center', maxWidth: 520, mx: 'auto' }}>
        <IconButton
          onClick={startListening}
          disabled={state === 'listening' || state === 'processing'}
          sx={{
            width: 84, height: 84, bgcolor: state === 'listening' ? colors.danger : colors.blue, color: '#fff',
            '&:hover': { bgcolor: state === 'listening' ? colors.danger : colors.blue },
            boxShadow: state === 'listening' ? `0 0 0 10px ${colors.danger}22` : 'none',
            transition: 'box-shadow .3s',
          }}
        >
          <Mic size={32} />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {state === 'idle' && 'Tap to speak a command'}
          {state === 'listening' && 'Listening…'}
          {state === 'processing' && 'Processing…'}
          {state === 'done' && 'Done'}
        </Typography>

        {sample && state !== 'idle' && (
          <Box sx={{ mt: 3.5, textAlign: 'left' }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary">TRANSCRIPT</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>"{sample.transcript}"</Typography>
            {(state === 'processing' || state === 'done') && (
              <>
                <Typography variant="caption" color="text.secondary">AI RESPONSE</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{sample.response}</Typography>
              </>
            )}
            {state === 'done' && (
              <Chip icon={<CheckCircle2 size={14} />} label={sample.action} sx={{ bgcolor: colors.successBg, color: colors.success, fontWeight: 700 }} />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
