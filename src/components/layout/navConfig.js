import {
  LayoutDashboard, FileText, Scale, FileCheck2, FolderSearch, Search,
  BarChart3, Bot, Users, Settings as SettingsIcon,
} from 'lucide-react';

export const navConfig = [
  { type: 'single', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  {
    type: 'group', label: 'Complaint Agent', icon: FileText, key: 'complaint',
    items: [
      { label: 'Register Complaint', path: '/complaint/register' },
      { label: 'Complaints', path: '/complaint/list' },
      { label: 'Complaint Analysis', path: '/complaint/analysis' },
      { label: 'Case Creation', path: '/complaint/case-creation' },
    ],
  },
  {
    type: 'group', label: 'Law Intelligence Agent', icon: Scale, key: 'law',
    items: [
      { label: 'Legal Search', path: '/law/search' },
      { label: 'BNS / BNSS', path: '/law/bns-bnss' },
      { label: 'Police SOPs', path: '/law/sops' },
      { label: 'Government Circulars', path: '/law/circulars' },
      { label: 'RAG Sources', path: '/law/rag-sources' },
    ],
  },
  {
    type: 'group', label: 'FIR Agent', icon: FileCheck2, key: 'fir',
    items: [
      { label: 'Generate FIR', path: '/fir/generate' },
      { label: 'FIR Drafts', path: '/fir/drafts' },
    ],
  },
  {
    type: 'group', label: 'Evidence Agent', icon: FolderSearch, key: 'evidence',
    items: [
      { label: 'Evidence Dashboard', path: '/evidence/dashboard' },
      { label: 'Upload Evidence', path: '/evidence/upload' },
      { label: 'Evidence Search', path: '/evidence/search' },
      { label: 'Case Evidence', path: '/evidence/case' },
    ],
  },
  {
    type: 'group', label: 'Investigation Agent', icon: Search, key: 'investigation',
    items: [
      { label: 'Investigation Dashboard', path: '/investigation/dashboard' },
      { label: 'Investigation Tasks', path: '/investigation/tasks' },
      { label: 'Evidence Sequence', path: '/investigation/evidence-sequence' },
      { label: 'Investigation Updates', path: '/investigation/updates' },
      { label: 'Case Timeline', path: '/investigation/case-timeline' },
    ],
  },
  {
    type: 'group', label: 'Report Agent', icon: BarChart3, key: 'report',
    items: [
      { label: 'Generate Report', path: '/report/generate' },
      { label: 'Investigation Reports', path: '/report/investigation-reports' },
      { label: 'Case Summaries', path: '/report/case-summaries' },
      { label: 'Status Reports', path: '/report/status-reports' },
      { label: 'Daily Reports', path: '/report/daily-reports' },
    ],
  },
  {
    type: 'group', label: 'AI Assistant', icon: Bot, key: 'ai',
    items: [
      { label: 'Chat Assistant', path: '/ai/chat' },
      { label: 'Voice Assistant', path: '/ai/voice' },
      { label: 'Quick Actions', path: '/ai/quick-actions' },
    ],
  },
  {
    type: 'group', label: 'Officer Management', icon: Users, key: 'officers', stationHeadOnly: true,
    items: [
      { label: 'Officers', path: '/officers/list' },
      { label: 'Create Officer', path: '/officers/create' },
      { label: 'Officer Activity', path: '/officers/activity' },
      { label: 'Officer Cases', path: '/officers/cases' },
    ],
  },
  {
    type: 'group', label: 'Station Analytics', icon: BarChart3, key: 'analytics', stationHeadOnly: true,
    items: [
      { label: 'Station Overview', path: '/analytics/overview' },
      { label: 'Crime Statistics', path: '/analytics/crime-statistics' },
      { label: 'Crime Trends', path: '/analytics/crime-trends' },
      { label: 'Case Analytics', path: '/analytics/case-analytics' },
      { label: 'FIR Analytics', path: '/analytics/fir-analytics' },
      { label: 'Officer Activity', path: '/analytics/officer-activity' },
    ],
  },
  {
    type: 'group', label: 'Settings', icon: SettingsIcon, key: 'settings',
    items: [
      { label: 'Profile', path: '/settings/profile' },
      { label: 'Settings', path: '/settings/preferences' },
    ],
  },
];
