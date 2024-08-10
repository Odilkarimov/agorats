import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import Basics from './components/basics/Basics';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  root.render(
    <StrictMode>
      <AgoraRTCProvider client={client}>
        <Basics />
      </AgoraRTCProvider>
    </StrictMode>
  );
} else {
  console.error('rootElement topilmadi!');
}