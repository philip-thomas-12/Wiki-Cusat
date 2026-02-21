import { Routes, Route } from 'react-router-dom';
import { CampusMap } from './components/Map/CampusMap';
import { AIAssistantWidget } from './components/Chat/AIAssistantWidget';
import { Navbar } from './components/Layout/Navbar';
import { InstitutionDetail } from './InstitutionDetail';
import './index.css';

function FullScreenMap() {
  return (
    <div className="full-screen-map-container">
      <Navbar />

      <div className="map-view-area">
        <CampusMap />
      </div>

      <AIAssistantWidget />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FullScreenMap />} />
      <Route path="/institution/:id" element={<InstitutionDetail />} />
    </Routes>
  );
}

export default App;
