import { Routes, Route } from 'react-router-dom';
import ScrollEffects from './components/ScrollEffects.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SymptomLog from './pages/SymptomLog.jsx';
import History from './pages/History.jsx';
import Report from './pages/Report.jsx';
import Chat from './pages/Chat.jsx';

export default function App() {
  return (
    <>
      <ScrollEffects />
      <Routes>
        <Route path="/"        element={<Dashboard />} />
        <Route path="/log"     element={<SymptomLog />} />
        <Route path="/history" element={<History />} />
        <Route path="/report"  element={<Report />} />
        <Route path="/chat"    element={<Chat />} />
        <Route path="*"        element={<Dashboard />} />
      </Routes>
    </>
  );
}
