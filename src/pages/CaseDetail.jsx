import { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Paper, Typography, Tabs, Tab, Stack, Chip, Grid, Button, Divider, IconButton,
} from '@mui/material';
import {
  ArrowLeft, User, Phone, MapPin, Calendar, FileText, Scale, Video, Image as ImageIcon,
  ScanFace, Mic, CheckCircle2, Circle, Eye, Sparkles, Download,
} from 'lucide-react';
import { PageHeader, EmptyState, ConfidenceTag } from '../components/common/Common';
import StatusBadge from '../components/common/StatusBadge';
import {
  getCaseById, getOfficerById, getComplaintByCase, getFIRByCase, getEvidenceByCase,
  getReportsByCase, caseTimelineSteps, evidenceSequences,
} from '../data/mockData';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/theme';

const typeIcon = { CCTV: Video, Location: MapPin, 'Call Record': Phone, Image: ImageIcon, 'Face Recognition': ScanFace, Document: FileText, Audio: Mic };

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <Box sx={{ pt: 2.5 }}>{children}</Box>;
}

export default function CaseDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [tab, setTab] = useState(0);

  const kase = getCaseById(caseId);
  if (!kase) {
    return (
      <Box>
        <Button startIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
        <EmptyState title="Case not found" subtitle={`No case exists with ID "${caseId}".`} />
      </Box>
    );
  }

  const officer = getOfficerById(kase.assignedOfficer);
  const complaint = getComplaintByCase(caseId);
  const fir = getFIRByCase(caseId);
  const evidence = getEvidenceByCase(caseId);
  const reports = getReportsByCase(caseId);
  const sequence = evidenceSequences[caseId] || [];
  const steps = caseTimelineSteps(caseId);

  return (
    <Box>
      <Button startIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)} sx={{ mb: 1.5, color: 'text.secondary' }}>Back</Button>
      <PageHeader
        title={kase.id}
        breadcrumbs={[{ label: 'Cases' }, { label: kase.id }]}
        action={
          <Stack direction="row" spacing={1}>
            <StatusBadge status={kase.priority} />
            <StatusBadge status={kase.status} />
          </Stack>
        }
      />

      <Paper sx={{ p: 2.5, mb: 2.5 }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="caption" color="text.secondary">Crime Type</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{kase.crimeType}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="caption" color="text.secondary">Assigned Officer</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{officer?.name || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="caption" color="text.secondary">Location</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{kase.location}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 0 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ px: 1, borderBottom: `1px solid ${colors.border}` }}>
          <Tab label="Complaint" />
          <Tab label="FIR" />
          <Tab label="Evidence" />
          <Tab label="Investigation" />
          <Tab label="Evidence Sequence" />
          <Tab label="Reports" />
        </Tabs>

        <Box sx={{ p: 2.5 }}>
          {/* COMPLAINT */}
          <TabPanel value={tab} index={0}>
            {!complaint ? (
              <EmptyState title="No complaint linked" subtitle="This case has no linked complaint record." />
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle1" sx={{ mb: 1.5 }}>{complaint.id}</Typography>
                  <Stack spacing={1.25}>
                    <Row icon={User} label="Complainant" value={complaint.complainantName} />
                    <Row icon={Phone} label="Contact" value={complaint.contact} />
                    <Row icon={Calendar} label="Incident" value={`${complaint.date} · ${complaint.time}`} />
                    <Row icon={MapPin} label="Location" value={complaint.location} />
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="caption" color="text.secondary">Description</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>{complaint.description}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>Property / Item</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>{complaint.property}</Typography>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          {/* FIR */}
          <TabPanel value={tab} index={1}>
            {!fir ? (
              <EmptyState
                title="No FIR generated yet"
                subtitle="Generate an FIR from the verified complaint for this case."
                action={<Button variant="contained" onClick={() => navigate('/fir/generate')}>Generate FIR</Button>}
              />
            ) : (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1">{fir.id}</Typography>
                  <StatusBadge status={fir.status} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{fir.summary}</Typography>
                <Typography variant="caption" color="text.secondary">Applicable Provisions</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.75, mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {fir.provisions.map(p => (
                    <Chip key={p} icon={<Scale size={13} />} label={p} size="small" sx={{ bgcolor: colors.blueSurface, color: colors.blue, fontWeight: 600 }} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1.5}>
                  <Button size="small" variant="outlined" onClick={() => navigate('/fir/drafts')}>View in FIR Drafts</Button>
                  {fir.status !== 'Approved' && (
                    <Button size="small" variant="contained" onClick={() => showToast(`FIR-${fir.id} approved — final approval by authorized police personnel.`, 'success')}>
                      Approve
                    </Button>
                  )}
                </Stack>
              </Box>
            )}
          </TabPanel>

          {/* EVIDENCE */}
          <TabPanel value={tab} index={2}>
            {evidence.length === 0 ? (
              <EmptyState
                title="No evidence uploaded"
                subtitle="Upload CCTV, images, documents or other evidence for this case."
                action={<Button variant="contained" onClick={() => navigate('/evidence/upload')}>Upload Evidence</Button>}
              />
            ) : (
              <Grid container spacing={2}>
                {evidence.map(e => {
                  const Icon = typeIcon[e.type] || FileText;
                  return (
                    <Grid item xs={12} sm={6} md={4} key={e.id}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                          <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: colors.blueSurface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={16} color={colors.blue} />
                          </Box>
                          <StatusBadge status={e.status} />
                        </Stack>
                        <Typography variant="subtitle2">{e.type}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{e.date} · {e.time}</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>{e.description}</Typography>
                        <Button size="small" startIcon={<Eye size={14} />} onClick={() => showToast(`Opening ${e.id}`, 'info')}>View</Button>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </TabPanel>

          {/* INVESTIGATION */}
          <TabPanel value={tab} index={3}>
            <Box sx={{ position: 'relative', pl: 4 }}>
              <Box sx={{ position: 'absolute', left: 11, top: 6, bottom: 6, width: 2, bgcolor: colors.border }} />
              <Stack spacing={2}>
                {steps.map(s => (
                  <Box key={s.label} sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: -29, top: 2 }}>
                      {s.done ? <CheckCircle2 size={20} color={colors.success} /> : <Circle size={20} color={colors.border} />}
                    </Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ opacity: s.done ? 1 : 0.55 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.label}</Typography>
                      {s.date && <Typography variant="caption" color="text.secondary">{s.date}</Typography>}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button size="small" variant="outlined" onClick={() => navigate('/investigation/tasks')}>Open Investigation Tasks</Button>
              <Button size="small" variant="outlined" onClick={() => navigate('/investigation/updates')}>Open Investigation Updates</Button>
            </Stack>
          </TabPanel>

          {/* EVIDENCE SEQUENCE */}
          <TabPanel value={tab} index={4}>
            {sequence.length === 0 ? (
              <EmptyState
                title="No evidence sequence generated"
                subtitle="Generate an AI-assisted, evidence-based chronological reconstruction for this case."
                action={<Button variant="contained" startIcon={<Sparkles size={15} />} onClick={() => navigate('/investigation/evidence-sequence')}>Generate Evidence Sequence</Button>}
              />
            ) : (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    AI-assisted reconstruction based on available, timestamped evidence. Inferred links are clearly marked and are not confirmed facts.
                  </Typography>
                  <Button size="small" startIcon={<Download size={14} />} onClick={() => showToast('Sequence exported as PDF', 'success')}>Export</Button>
                </Stack>
                <Box sx={{ position: 'relative', pl: 4 }}>
                  <Box sx={{ position: 'absolute', left: 11, top: 6, bottom: 6, width: 2, bgcolor: colors.border }} />
                  <Stack spacing={2}>
                    {sequence.map(s => {
                      const Icon = typeIcon[s.type] || FileText;
                      return (
                        <Box key={s.id} sx={{ position: 'relative' }}>
                          <Box sx={{ position: 'absolute', left: -29, top: 2, width: 22, height: 22, borderRadius: '50%', bgcolor: s.confidence === 'confirmed' ? colors.successBg : colors.warningBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={12} color={s.confidence === 'confirmed' ? colors.success : colors.warning} />
                          </Box>
                          <Paper variant="outlined" sx={{ p: 1.75 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{s.time} · {s.type}</Typography>
                              <ConfidenceTag level={s.confidence} />
                            </Stack>
                            <Typography variant="body2">{s.title}</Typography>
                            <Typography variant="caption" color="text.secondary">{s.note}</Typography>
                          </Paper>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
                <Button size="small" sx={{ mt: 2 }} onClick={() => navigate('/investigation/evidence-sequence')}>Open full Evidence Sequence view</Button>
              </Box>
            )}
          </TabPanel>

          {/* REPORTS */}
          <TabPanel value={tab} index={5}>
            {reports.length === 0 ? (
              <EmptyState
                title="No reports generated"
                subtitle="Generate an investigation report, case summary, or status report for this case."
                action={<Button variant="contained" onClick={() => navigate('/report/generate')}>Generate Report</Button>}
              />
            ) : (
              <Stack spacing={1.25}>
                {reports.map(r => (
                  <Paper key={r.id} variant="outlined" sx={{ p: 1.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.id} — {r.type}</Typography>
                      <Typography variant="caption" color="text.secondary">Created {r.createdDate} · {getOfficerById(r.officer)?.name}</Typography>
                    </Box>
                    <StatusBadge status={r.status} />
                  </Paper>
                ))}
              </Stack>
            )}
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Icon size={15} color={colors.steel} />
      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 90 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
    </Stack>
  );
}
