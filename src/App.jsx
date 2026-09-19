import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseDetail from './pages/CaseDetail';

import RegisterComplaint from './pages/complaint/RegisterComplaint';
import Complaints from './pages/complaint/Complaints';
import ComplaintAnalysis from './pages/complaint/ComplaintAnalysis';
import CaseCreation from './pages/complaint/CaseCreation';

import LegalSearch from './pages/law/LegalSearch';
import BnsBnss from './pages/law/BnsBnss';
import PoliceSops from './pages/law/PoliceSops';
import GovernmentCirculars from './pages/law/GovernmentCirculars';
import RagSources from './pages/law/RagSources';

import GenerateFIR from './pages/fir/GenerateFIR';
import FIRDrafts from './pages/fir/FIRDrafts';

import EvidenceDashboard from './pages/evidence/EvidenceDashboard';
import UploadEvidence from './pages/evidence/UploadEvidence';
import EvidenceSearch from './pages/evidence/EvidenceSearch';
import CaseEvidence from './pages/evidence/CaseEvidence';

import InvestigationDashboard from './pages/investigation/InvestigationDashboard';
import InvestigationTasks from './pages/investigation/InvestigationTasks';
import EvidenceSequence from './pages/investigation/EvidenceSequence';
import InvestigationUpdates from './pages/investigation/InvestigationUpdates';
import CaseTimeline from './pages/investigation/CaseTimeline';

import GenerateReport from './pages/report/GenerateReport';
import InvestigationReports from './pages/report/InvestigationReports';
import CaseSummaries from './pages/report/CaseSummaries';
import StatusReports from './pages/report/StatusReports';
import DailyReports from './pages/report/DailyReports';

import ChatAssistant from './pages/ai/ChatAssistant';
import VoiceAssistant from './pages/ai/VoiceAssistant';
import QuickActions from './pages/ai/QuickActions';

import Officers from './pages/officers/Officers';
import CreateOfficer from './pages/officers/CreateOfficer';
import OfficerActivity from './pages/officers/OfficerActivity';
import OfficerCases from './pages/officers/OfficerCases';

import StationOverview from './pages/analytics/StationOverview';
import CrimeStatistics from './pages/analytics/CrimeStatistics';
import CrimeTrends from './pages/analytics/CrimeTrends';
import CaseAnalytics from './pages/analytics/CaseAnalytics';
import FirAnalytics from './pages/analytics/FirAnalytics';
import OfficerActivityAnalytics from './pages/analytics/OfficerActivityAnalytics';

import Profile from './pages/settings/Profile';
import Preferences from './pages/settings/Preferences';

function Protected({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/case/:caseId" element={<Protected><CaseDetail /></Protected>} />

            <Route path="/complaint/register" element={<Protected><RegisterComplaint /></Protected>} />
            <Route path="/complaint/list" element={<Protected><Complaints /></Protected>} />
            <Route path="/complaint/analysis" element={<Protected><ComplaintAnalysis /></Protected>} />
            <Route path="/complaint/case-creation" element={<Protected><CaseCreation /></Protected>} />

            <Route path="/law/search" element={<Protected><LegalSearch /></Protected>} />
            <Route path="/law/bns-bnss" element={<Protected><BnsBnss /></Protected>} />
            <Route path="/law/sops" element={<Protected><PoliceSops /></Protected>} />
            <Route path="/law/circulars" element={<Protected><GovernmentCirculars /></Protected>} />
            <Route path="/law/rag-sources" element={<Protected><RagSources /></Protected>} />

            <Route path="/fir/generate" element={<Protected><GenerateFIR /></Protected>} />
            <Route path="/fir/drafts" element={<Protected><FIRDrafts /></Protected>} />

            <Route path="/evidence/dashboard" element={<Protected><EvidenceDashboard /></Protected>} />
            <Route path="/evidence/upload" element={<Protected><UploadEvidence /></Protected>} />
            <Route path="/evidence/search" element={<Protected><EvidenceSearch /></Protected>} />
            <Route path="/evidence/case" element={<Protected><CaseEvidence /></Protected>} />

            <Route path="/investigation/dashboard" element={<Protected><InvestigationDashboard /></Protected>} />
            <Route path="/investigation/tasks" element={<Protected><InvestigationTasks /></Protected>} />
            <Route path="/investigation/evidence-sequence" element={<Protected><EvidenceSequence /></Protected>} />
            <Route path="/investigation/updates" element={<Protected><InvestigationUpdates /></Protected>} />
            <Route path="/investigation/case-timeline" element={<Protected><CaseTimeline /></Protected>} />

            <Route path="/report/generate" element={<Protected><GenerateReport /></Protected>} />
            <Route path="/report/investigation-reports" element={<Protected><InvestigationReports /></Protected>} />
            <Route path="/report/case-summaries" element={<Protected><CaseSummaries /></Protected>} />
            <Route path="/report/status-reports" element={<Protected><StatusReports /></Protected>} />
            <Route path="/report/daily-reports" element={<Protected><DailyReports /></Protected>} />

            <Route path="/ai/chat" element={<Protected><ChatAssistant /></Protected>} />
            <Route path="/ai/voice" element={<Protected><VoiceAssistant /></Protected>} />
            <Route path="/ai/quick-actions" element={<Protected><QuickActions /></Protected>} />

            <Route path="/officers/list" element={<Protected><Officers /></Protected>} />
            <Route path="/officers/create" element={<Protected><CreateOfficer /></Protected>} />
            <Route path="/officers/activity" element={<Protected><OfficerActivity /></Protected>} />
            <Route path="/officers/cases" element={<Protected><OfficerCases /></Protected>} />

            <Route path="/analytics/overview" element={<Protected><StationOverview /></Protected>} />
            <Route path="/analytics/crime-statistics" element={<Protected><CrimeStatistics /></Protected>} />
            <Route path="/analytics/crime-trends" element={<Protected><CrimeTrends /></Protected>} />
            <Route path="/analytics/case-analytics" element={<Protected><CaseAnalytics /></Protected>} />
            <Route path="/analytics/fir-analytics" element={<Protected><FirAnalytics /></Protected>} />
            <Route path="/analytics/officer-activity" element={<Protected><OfficerActivityAnalytics /></Protected>} />

            <Route path="/settings/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/settings/preferences" element={<Protected><Preferences /></Protected>} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
