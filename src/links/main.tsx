import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LinksPage from './LinksPage.tsx';
import './links.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LinksPage />
  </StrictMode>,
);
