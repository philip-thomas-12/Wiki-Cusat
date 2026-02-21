import { Routes, Route } from 'react-router-dom';
import { CampusMap } from './components/Map/CampusMap';
import { ChatInterface } from '../chatbot/frontend/ChatInterface';
import { Navbar } from './components/Layout/Navbar';
import { InstitutionDetail } from './InstitutionDetail';
import './index.css';

function FullScreenMap() {
  return (
    <div className="full-screen-map-container" style={{ position: 'relative' }}>
      <Navbar />

      <div className="map-view-area">
        <CampusMap />
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <ChatInterface />
      </div>
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
