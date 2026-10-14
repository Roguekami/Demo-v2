// ===========================================================
// Alimo EduCloud Portal — Link back to the marketing site
// ===========================================================
// In production the whole Demo folder is served as one static site:
// the landing page sits at the root and this app at /portal/dist/,
// so the site is two levels up. The Vite dev server only serves the
// portal itself, so there the link just returns to the portal root.
export const siteUrl = import.meta.env.DEV ? '/' : '../../index.html';

export const backArrowIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
`;
