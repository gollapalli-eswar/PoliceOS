import { createTheme } from '@mui/material/styles';

// Police-inspired palette: deep navy/charcoal command tones, badge-blue accent,
// warning amber for alerts, restrained gold used sparingly for approvals/rank.
export const colors = {
  navy: '#0B1F3A',
  navyDark: '#07132A',
  navySurface: '#132A4C',
  blue: '#1B4F91',
  blueLight: '#3E7BC4',
  blueSurface: '#EAF1FB',
  steel: '#5A6B82',
  border: '#DCE3EC',
  bg: '#F4F6F9',
  paper: '#FFFFFF',
  textPrimary: '#101A2B',
  textSecondary: '#54607A',
  gold: '#B8892B',
  success: '#1E7A46',
  successBg: '#E7F5EC',
  warning: '#B4740E',
  warningBg: '#FDF1E0',
  danger: '#B02A26',
  dangerBg: '#FBEAE9',
  info: '#1B4F91',
  infoBg: '#EAF1FB',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.blue, dark: colors.navy, light: colors.blueLight, contrastText: '#fff' },
    secondary: { main: colors.gold, contrastText: '#fff' },
    success: { main: colors.success, light: colors.successBg },
    warning: { main: colors.warning, light: colors.warningBg },
    error: { main: colors.danger, light: colors.dangerBg },
    info: { main: colors.info, light: colors.infoBg },
    background: { default: colors.bg, paper: colors.paper },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
    divider: colors.border,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter","Segoe UI",Roboto,Arial,sans-serif',
    h1: { fontWeight: 700 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 },
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontWeight: 700, fontSize: '1.15rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600, fontSize: '0.85rem' },
    button: { textTransform: 'none', fontWeight: 600 },
    body2: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          boxShadow: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600, borderRadius: 6 } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: colors.border, fontSize: '0.85rem' },
        head: { fontWeight: 700, color: colors.textSecondary, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.4, background: '#F8FAFC' },
      },
    },
    MuiTooltip: { styleOverrides: { tooltip: { fontSize: '0.72rem' } } },
    MuiDrawer: { styleOverrides: { paper: { border: 'none' } } },
  },
});

export default theme;
