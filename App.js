import React, { useState } from 'react';
import Folder from './components/Folder/Folder';
import AudioCard from './components/AudioCard/AudioCard';
import StreamCard from './components/StreamCard/StreamCard';
import Upload from './components/Upload/Upload';
import { vibesStations } from './data/stations';
import './App.css';

const FOLDER_COLORS = {
  daily: '#ECEFF3',
  tldv: '#1A4DFF',
  vibes: '#FF6A00',
};

function App() {
  const [openFolder, setOpenFolder] = useState('daily');
  const [playing, setPlaying] = useState({ type: null, id: null });
  const [dailyBriefing, setDailyBriefing] = useState([]);
  const [tldv, setTldv] = useState([]);

  // Only one audio/stream can play at a time
  const handlePlay = (type, id) => setPlaying({ type, id });
  const handlePause = () => setPlaying({ type: null, id: null });

  // Upload handlers
  const handleUpload = (type) => (fileObj) => {
    // Get duration after loading
    const audio = document.createElement('audio');
    audio.src = fileObj.url;
    audio.onloadedmetadata = () => {
      const item = { ...fileObj, duration: audio.duration };
      if (type === 'daily') setDailyBriefing((prev) => [...prev, item]);
      if (type === 'tldv') setTldv((prev) => [...prev, item]);
    };
  };

  return (
    <div className="App" style={{ background: '#111', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="folders" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        <Folder
          title="The Daily Briefing"
          color={FOLDER_COLORS.daily}
          open={openFolder === 'daily'}
          onClick={() => setOpenFolder(openFolder === 'daily' ? null : 'daily')}
          tabLabel="The Daily Briefing"
        >
          <h2 style={{ color: '#181818', marginBottom: '1rem' }}>The Daily Briefing</h2>
          <p style={{ color: '#444', marginBottom: '2rem' }}>Catch up with everything you need to know to start your day the right way.</p>
          <Upload onUpload={handleUpload('daily')} label="Upload Audio" />
          <div style={{ marginTop: '2rem' }}>
            {dailyBriefing.length === 0 && <div style={{ color: '#888' }}>No audio uploaded yet.</div>}
            {dailyBriefing.map((item, i) => (
              <AudioCard
                key={i}
                title={item.title}
                timestamp={item.timestamp}
                duration={item.duration}
                url={item.url}
                isPlaying={playing.type === 'daily' && playing.id === i}
                onPlay={() => handlePlay('daily', i)}
                onPause={handlePause}
              />
            ))}
          </div>
        </Folder>
        <Folder
          title="TL;DV"
          color={FOLDER_COLORS.tldv}
          open={openFolder === 'tldv'}
          onClick={() => setOpenFolder(openFolder === 'tldv' ? null : 'tldv')}
          tabLabel="TL;DV"
        >
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>TL;DV</h2>
          <p style={{ color: '#e0e0e0', marginBottom: '2rem' }}>Missed a meeting? Listen to the highlights</p>
          <Upload onUpload={handleUpload('tldv')} label="Upload Highlight" />
          <div style={{ marginTop: '2rem' }}>
            {tldv.length === 0 && <div style={{ color: '#bbb' }}>No highlights uploaded yet.</div>}
            {tldv.map((item, i) => (
              <AudioCard
                key={i}
                title={item.title}
                timestamp={item.timestamp}
                duration={item.duration}
                url={item.url}
                isPlaying={playing.type === 'tldv' && playing.id === i}
                onPlay={() => handlePlay('tldv', i)}
                onPause={handlePause}
              />
            ))}
          </div>
        </Folder>
        <Folder
          title="Vibes!"
          color={FOLDER_COLORS.vibes}
          open={openFolder === 'vibes'}
          onClick={() => setOpenFolder(openFolder === 'vibes' ? null : 'vibes')}
          tabLabel="Vibes!"
        >
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Vibes!</h2>
          <p style={{ color: '#fff', marginBottom: '2rem' }}>Sit back and enjoy some tunes while you work :)</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {vibesStations.map((station) => (
              <StreamCard
                key={station.id}
                label={station.label}
                icon={station.icon}
                streamUrl={station.streamUrl}
                isPlaying={playing.type === 'vibes' && playing.id === station.id}
                onPlay={() => handlePlay('vibes', station.id)}
                onPause={handlePause}
              />
            ))}
          </div>
        </Folder>
      </div>
    </div>
  );
}

export default App;
