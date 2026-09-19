import { useState, useRef } from 'react';
import { Box, Grid, Paper, Typography, TextField, MenuItem, Button, Stack, LinearProgress, Chip } from '@mui/material';
import { UploadCloud, CheckCircle2, X } from 'lucide-react';
import { PageHeader, SectionCard } from '../../components/common/Common';
import { cases, evidenceTypes } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/theme';

export default function UploadEvidence() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState({});
  const [meta, setMeta] = useState({ caseId: 'CASE-1024', type: 'CCTV', date: '', time: '', location: '', description: '', source: '' });
  const inputRef = useRef();
  const { showToast } = useApp();

  const addFiles = (list) => {
    const newFiles = Array.from(list).map(f => ({ name: f.name, size: f.size, id: Math.random().toString(36).slice(2) }));
    setFiles(f => [...f, ...newFiles]);
    newFiles.forEach(f => simulateUpload(f.id));
  };

  const simulateUpload = (id) => {
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(prev => ({ ...prev, [id]: p }));
      if (p >= 100) clearInterval(interval);
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    if (files.length === 0) { showToast('Please add at least one file', 'error'); return; }
    showToast(`Evidence uploaded to ${meta.caseId} successfully`, 'success');
    setFiles([]);
    setProgress({});
  };

  return (
    <Box>
      <PageHeader title="Upload Evidence" breadcrumbs={[{ label: 'Evidence Agent' }, { label: 'Upload Evidence' }]} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <SectionCard title="Files">
            <Box
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
              sx={{
                border: `2px dashed ${dragging ? colors.blue : colors.border}`, borderRadius: 2, p: 4, textAlign: 'center',
                cursor: 'pointer', bgcolor: dragging ? colors.blueSurface : '#F8FAFC', transition: 'all .15s',
              }}
            >
              <UploadCloud size={30} color={colors.blue} style={{ marginBottom: 10 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Drag & drop files here, or click to browse</Typography>
              <Typography variant="caption" color="text.secondary">Supports images, videos, audio, PDF, documents</Typography>
              <input ref={inputRef} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
            </Box>

            {files.length > 0 && (
              <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                {files.map(f => (
                  <Paper key={f.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" noWrap sx={{ maxWidth: 260 }}>{f.name}</Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {progress[f.id] >= 100 ? <CheckCircle2 size={16} color={colors.success} /> : <Typography variant="caption">{progress[f.id] || 0}%</Typography>}
                        <X size={14} style={{ cursor: 'pointer' }} onClick={() => setFiles(fs => fs.filter(x => x.id !== f.id))} />
                      </Stack>
                    </Stack>
                    <LinearProgress variant="determinate" value={progress[f.id] || 0} sx={{ mt: 1, height: 5, borderRadius: 3 }} />
                  </Paper>
                ))}
              </Stack>
            )}
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="Evidence Metadata">
            <Stack spacing={2}>
              <TextField select size="small" label="Case ID" value={meta.caseId} onChange={(e) => setMeta({ ...meta, caseId: e.target.value })}>
                {cases.map(c => <MenuItem key={c.id} value={c.id}>{c.id} — {c.crimeType}</MenuItem>)}
              </TextField>
              <TextField select size="small" label="Evidence Type" value={meta.type} onChange={(e) => setMeta({ ...meta, type: e.target.value })}>
                {evidenceTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} />
                <TextField fullWidth size="small" type="time" label="Time" InputLabelProps={{ shrink: true }} value={meta.time} onChange={(e) => setMeta({ ...meta, time: e.target.value })} />
              </Stack>
              <TextField size="small" label="Location" value={meta.location} onChange={(e) => setMeta({ ...meta, location: e.target.value })} />
              <TextField size="small" label="Source" value={meta.source} onChange={(e) => setMeta({ ...meta, source: e.target.value })} placeholder="e.g. Station CCTV Cam 4" />
              <TextField size="small" multiline rows={3} label="Description" value={meta.description} onChange={(e) => setMeta({ ...meta, description: e.target.value })} />
            </Stack>
            <Button fullWidth variant="contained" sx={{ mt: 2.5 }} onClick={handleSubmit}>Submit Evidence</Button>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
