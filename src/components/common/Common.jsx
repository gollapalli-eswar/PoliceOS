import { Box, Paper, Typography, Stack, Breadcrumbs, Link as MLink, Chip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import { colors } from '../../theme/theme';

export function StatCard({ icon: Icon, label, value, accent = colors.blue, sub }) {
  return (
    <Paper sx={{ p: 2.25, flex: 1, minWidth: 180 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: `${accent}15`, color: accent, flexShrink: 0,
        }}>
          <Icon size={20} strokeWidth={2} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>{label}</Typography>
          <Typography variant="h5" sx={{ lineHeight: 1.2 }}>{value}</Typography>
        </Box>
      </Stack>
      {sub && <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>{sub}</Typography>}
    </Paper>
  );
}

export function PageHeader({ title, breadcrumbs = [], action }) {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 1.5 }}>
      <Box>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs sx={{ fontSize: '0.78rem', mb: 0.5 }} separator="/">
            {breadcrumbs.map((b, i) => (
              b.to ? (
                <MLink key={i} component={RouterLink} to={b.to} underline="hover" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                  {b.label}
                </MLink>
              ) : (
                <Typography key={i} color="text.secondary" sx={{ fontSize: '0.78rem' }}>{b.label}</Typography>
              )
            ))}
          </Breadcrumbs>
        )}
        <Typography variant="h4">{title}</Typography>
      </Box>
      {action}
    </Box>
  );
}

export function EmptyState({ title = 'Nothing here yet', subtitle, action }) {
  return (
    <Paper sx={{ p: 5, textAlign: 'center', border: `1px dashed ${colors.border}` }}>
      <Box sx={{ color: 'text.secondary', mb: 1.5 }}><Inbox size={36} strokeWidth={1.5} /></Box>
      <Typography variant="subtitle1">{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: action ? 2 : 0 }}>{subtitle}</Typography>}
      {action}
    </Paper>
  );
}

export function AIExtractedBadge() {
  return <Chip label="AI Extracted" size="small" sx={{ bgcolor: colors.infoBg, color: colors.blue, fontWeight: 700, fontSize: '0.68rem' }} />;
}

export function ConfidenceTag({ level }) {
  // level: 'confirmed' | 'inferred'
  const isConfirmed = level === 'confirmed';
  return (
    <Chip
      size="small"
      label={isConfirmed ? 'CONFIRMED FROM SOURCE' : 'AI-INFERRED / CORRELATED'}
      sx={{
        fontSize: '0.62rem', fontWeight: 700, height: 20,
        bgcolor: isConfirmed ? colors.successBg : colors.warningBg,
        color: isConfirmed ? colors.success : colors.warning,
        border: `1px solid ${isConfirmed ? colors.success : colors.warning}33`,
      }}
    />
  );
}

export function SectionCard({ title, action, children, sx }) {
  return (
    <Paper sx={{ p: 2.5, ...sx }}>
      {(title || action) && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          {title && <Typography variant="subtitle1">{title}</Typography>}
          {action}
        </Stack>
      )}
      {children}
    </Paper>
  );
}
