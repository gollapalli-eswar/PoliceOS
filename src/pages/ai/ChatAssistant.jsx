import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Stack, TextField, IconButton, Typography, Avatar, Chip } from '@mui/material';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { PageHeader } from '../../components/common/Common';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

const mockReplies = [
  { match: /vehicle theft/i, reply: 'Here are the active vehicle theft cases: CASE-1024 (MG Road Parking Complex, assigned to Officer Arjun Rao, status: Active). Would you like the full case details or evidence summary?' },
  { match: /fir/i, reply: 'You have 1 FIR pending approval: FIR-3002 for CASE-1025. FIR-3003 is still in draft for CASE-1026.' },
  { match: /evidence/i, reply: 'CASE-1024 currently has 7 evidence items including CCTV footage, a location record, and one face recognition result flagged for review.' },
  { match: /report/i, reply: 'I can generate a Status Report or Investigation Report for any active case. Which case would you like the report for?' },
];

export default function ChatAssistant() {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hello ${user.name.split(' ')[0]}, I'm your PoliceOS AI assistant. Ask me about cases, FIRs, evidence, or reports.` },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTimeout(() => {
      const matched = mockReplies.find(r => r.match.test(userMsg.text));
      setMessages(m => [...m, { role: 'ai', text: matched ? matched.reply : "I've noted that. In the full system, I would query live case data to answer this precisely." }]);
    }, 700);
  };

  return (
    <Box>
      <PageHeader title="Chat Assistant" breadcrumbs={[{ label: 'AI Assistant' }, { label: 'Chat Assistant' }]} />
      <Paper sx={{ height: 520, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
          <Stack spacing={2}>
            {messages.map((m, i) => (
              <Stack key={i} direction="row" spacing={1.25} justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'}>
                {m.role === 'ai' && <Avatar sx={{ width: 30, height: 30, bgcolor: colors.blue }}><Bot size={16} /></Avatar>}
                <Paper
                  variant={m.role === 'user' ? 'elevation' : 'outlined'}
                  sx={{
                    p: 1.5, maxWidth: '70%', borderRadius: 2,
                    bgcolor: m.role === 'user' ? colors.blue : '#fff', color: m.role === 'user' ? '#fff' : 'text.primary',
                  }}
                >
                  <Typography variant="body2">{m.text}</Typography>
                </Paper>
                {m.role === 'user' && <Avatar sx={{ width: 30, height: 30, bgcolor: colors.navy }}><UserIcon size={15} /></Avatar>}
              </Stack>
            ))}
            <div ref={endRef} />
          </Stack>
        </Box>
        <Box sx={{ p: 2, borderTop: `1px solid ${colors.border}` }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {['Show active vehicle theft cases', 'Pending FIRs', 'Latest evidence'].map(s => (
              <Chip key={s} label={s} size="small" onClick={() => setInput(s)} sx={{ cursor: 'pointer' }} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField fullWidth size="small" placeholder="Ask about a case, FIR, or evidence..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
            <IconButton color="primary" onClick={send} sx={{ bgcolor: colors.blueSurface }}><Send size={17} /></IconButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
