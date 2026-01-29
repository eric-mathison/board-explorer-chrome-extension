# Board Explorer (Chrome Extension)

A Chrome extension to explore Pinterest profiles, boards, sections, and pins in a collapsible right sidebar overlay.

## Features

- Injects a right-side collapsible sidebar overlay into web pages
- Fetches Pinterest user/board/pin data using Pinterest API endpoints (mock mode available for local development)
- Shows simple metadata and a scrollable raw JSON view for each entity

## Local development

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev` — open `index.html` to preview the UI in a normal page
3. Load the extension unpacked in Chrome: `chrome://extensions` → "Load unpacked" → select the project root or the `dist` output after `npm run build`.

## Usage

- Click the extension toolbar icon to open the Board Explorer sidebar. The content script will attempt to detect a Pinterest resource on the current page (pin/board/user) and display metadata and raw JSON.
- For development, you can preview the UI with `npm run dev` and test the content-script behaviour by loading the unpacked `dist` after running `npm run build`.

## Notes

- Pinterest API often requires authentication; the initial helpers include `MOCK` mode for development. Provide OAuth credentials or adjust fetch helpers for production.
- This scaffold uses Vite + React + TypeScript + Tailwind. The manifest and build pipeline will need further refinement for production packaging.

## Next steps

- Implement shadcn-based components and style the sidebar
- Add real Pinterest OAuth flow and authenticated fetches
- Add tests and CI for packaging
