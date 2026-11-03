import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { Site } from './Site.tsx';
import { normalizePath } from './seo.ts';

const root = document.getElementById('root');
if (root) {
  const app = (
    <StrictMode>
      <Site path={normalizePath(window.location.pathname)} />
    </StrictMode>
  );
  if (root.childElementCount > 0) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
