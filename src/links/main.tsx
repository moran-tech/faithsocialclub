import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import LinksPage from './LinksPage.tsx';
import './links.css';

const root = document.getElementById('root');
if (root) {
  const app = (
    <StrictMode>
      <LinksPage />
    </StrictMode>
  );
  if (root.childElementCount > 0) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
