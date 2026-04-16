# SetLead V1

SetLead is a browser-based worship-planning and worship-leading application built with React, Vite, TypeScript, Tailwind CSS, Dexie, pdf.js, WebRTC data channels, and Netlify Functions.

## Included V1 Features

- Local song library
- PDF upload + viewer (pdf.js)
- Setlists
- Music Stand mode
- Local sync (host -> followers)
- Netlify signaling function
- Optional SongSelect metadata import (metadata only)

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## Notes

- Data is stored locally in IndexedDB through Dexie.
- PDFs are stored in IndexedDB and rendered with pdf.js.
- Sync uses WebRTC data channels.
- The Netlify function provides transient signaling only.
