import { Chip } from '@mui/material';

const MAP = {
  active: { color: '#1B4F91', bg: '#EAF1FB' },
  'on duty': { color: '#1E7A46', bg: '#E7F5EC' },
  'off duty': { color: '#54607A', bg: '#EEF1F5' },
  approved: { color: '#1E7A46', bg: '#E7F5EC' },
  verified: { color: '#1E7A46', bg: '#E7F5EC' },
  submitted: { color: '#1E7A46', bg: '#E7F5EC' },
  closed: { color: '#54607A', bg: '#EEF1F5' },
  draft: { color: '#B4740E', bg: '#FDF1E0' },
  'pending approval': { color: '#B4740E', bg: '#FDF1E0' },
  'pending review': { color: '#B4740E', bg: '#FDF1E0' },
  'needs review': { color: '#B4740E', bg: '#FDF1E0' },
  'under investigation': { color: '#B4740E', bg: '#FDF1E0' },
  high: { color: '#B02A26', bg: '#FBEAE9' },
  critical: { color: '#B02A26', bg: '#FBEAE9' },
  medium: { color: '#B4740E', bg: '#FDF1E0' },
  low: { color: '#1E7A46', bg: '#E7F5EC' },
  'case created': { color: '#1B4F91', bg: '#EAF1FB' },
};

export default function StatusBadge({ status, size = 'small' }) {
  const key = (status || '').toLowerCase();
  const style = MAP[key] || { color: '#54607A', bg: '#EEF1F5' };
  return (
    <Chip
      label={status}
      size={size}
      sx={{
        color: style.color,
        bgcolor: style.bg,
        fontWeight: 700,
        fontSize: '0.72rem',
        height: 24,
      }}
    />
  );
}
