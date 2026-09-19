import { useState } from 'react';
import {
  Box, TextField, MenuItem, List, ListItem, Checkbox, ListItemText, IconButton, Stack, Button,
  Chip, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Menu,
} from '@mui/material';
import { Plus, StickyNote, UserPlus, Sparkles } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { cases, investigationTasks as initialTasks, officers } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

export default function InvestigationTasks() {
  const [caseId, setCaseId] = useState('CASE-1024');
  const [tasksByCase, setTasksByCase] = useState(initialTasks);
  const [noteTask, setNoteTask] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [newTask, setNewTask] = useState('');
  const [assignAnchor, setAssignAnchor] = useState(null);
  const [assignTask, setAssignTask] = useState(null);
  const { showToast } = useApp();

  const tasks = tasksByCase[caseId] || [];
  const selectedCase = cases.find(c => c.id === caseId);

  const toggle = (id) => setTasksByCase(prev => ({
    ...prev, [caseId]: prev[caseId].map(t => t.id === id ? { ...t, done: !t.done } : t),
  }));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasksByCase(prev => ({
      ...prev, [caseId]: [...(prev[caseId] || []), { id: `T${Date.now()}`, text: newTask, done: false, assignee: null }],
    }));
    setNewTask('');
    showToast('Custom task added', 'success');
  };

  return (
    <Box>
      <PageHeader title="Investigation Tasks" breadcrumbs={[{ label: 'Investigation Agent' }, { label: 'Investigation Tasks' }]} />
      <TextField select size="small" label="Select Case" value={caseId} onChange={(e) => setCaseId(e.target.value)} sx={{ mb: 2.5, width: 280 }}>
        {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
      </TextField>

      <SectionCard title={`${selectedCase.crimeType} — AI-Assisted Checklist`} action={<Chip icon={<Sparkles size={12} />} label="AI suggestions are assistance only" size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 600, fontSize: '0.65rem' }} />}>
        <List sx={{ py: 0 }}>
          {tasks.map(t => (
            <ListItem
              key={t.id} sx={{ px: 0.5 }}
              secondaryAction={
                <Stack direction="row" spacing={0.25}>
                  <IconButton size="small" onClick={() => { setNoteTask(t); setNoteText(''); }}><StickyNote size={15} /></IconButton>
                  <IconButton size="small" onClick={(e) => { setAssignAnchor(e.currentTarget); setAssignTask(t); }}><UserPlus size={15} /></IconButton>
                </Stack>
              }
            >
              <Checkbox checked={t.done} onChange={() => toggle(t.id)} />
              <ListItemText
                primary={t.text}
                secondary={t.assignee ? `Assigned to ${officers.find(o => o.id === t.assignee)?.name || t.assignee}` : 'Unassigned'}
                primaryTypographyProps={{ fontSize: '0.87rem', sx: { textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'text.secondary' : 'text.primary' } }}
                secondaryTypographyProps={{ fontSize: '0.7rem' }}
              />
            </ListItem>
          ))}
        </List>

        <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
          <TextField size="small" fullWidth placeholder="Add a custom task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={addTask}>Add Task</Button>
        </Stack>
      </SectionCard>

      <Menu anchorEl={assignAnchor} open={!!assignAnchor} onClose={() => setAssignAnchor(null)}>
        {officers.map(o => (
          <MenuItem key={o.id} onClick={() => {
            setTasksByCase(prev => ({ ...prev, [caseId]: prev[caseId].map(t => t.id === assignTask.id ? { ...t, assignee: o.id } : t) }));
            setAssignAnchor(null);
            showToast(`Task assigned to ${o.name}`, 'success');
          }}>{o.name}</MenuItem>
        ))}
      </Menu>

      <Dialog open={!!noteTask} onClose={() => setNoteTask(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{noteTask?.text}</Typography>
          <TextField fullWidth multiline rows={3} size="small" placeholder="Write a note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteTask(null)}>Cancel</Button>
          <Button variant="contained" onClick={() => { showToast('Note added', 'success'); setNoteTask(null); }}>Save Note</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
