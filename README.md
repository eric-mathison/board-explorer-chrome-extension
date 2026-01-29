# Board Explorer

A Chrome extension that lets you explore Pinterest resources (users, boards, sections, and pins) directly from any Pinterest page. View detailed metadata, statistics, and raw JSON data in a beautiful sidebar overlay.

## What is Board Explorer?

Board Explorer automatically detects what Pinterest page you're on and fetches comprehensive data about that resource. Whether you're viewing a user profile, a board, a board section, or an individual pin, Board Explorer gives you instant access to:

- **User profiles**: Follower counts, board counts, pin statistics, profile information
- **Boards**: Pin counts, sections, owner details, privacy settings
- **Board sections**: Section-specific pin collections
- **Pins**: Image data, engagement metrics, descriptions, board associations

All data is presented in a clean, easy-to-read sidebar, featuring both formatted details and raw JSON exports.

## Features

- 🎯 **Auto-detection**: Automatically identifies the Pinterest resource on the current page
- 📊 **Rich metadata**: View formatted details specific to each resource type
- 📋 **JSON export**: Copy raw API responses with one click
- 🎨 **Beautiful UI**: Clean, readable interface
- ⚡ **Fast**: Instant data fetching and sidebar display
- 🔄 **Refresh**: Update data without reloading the page

## Installation (Development Mode)

### Prerequisites

- Node.js (v16 or higher)
- Chrome or Chromium-based browser

### Steps

1. **Clone and install dependencies**

   ```bash
   git clone https://github.com/eric-mathison/board-explorer-chrome-extension.git
   cd board-explorer-chrome-extension
   npm install
   ```

2. **Build the extension**

   ```bash
   npm run build
   ```

   This creates a `dist` folder with the compiled extension.

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `dist` folder from your project directory

4. **Verify installation**
   - You should see "Board Explorer" in your extensions list
   - The extension icon will appear in your Chrome toolbar

## Usage

1. **Navigate to any Pinterest page**
   - User profile: `pinterest.com/username`
   - Board: `pinterest.com/username/board-name`
   - Board section: `pinterest.com/username/board-name/section-name`
   - Pin: `pinterest.com/pin/12345678`

2. **Open Board Explorer**
   - Click the Board Explorer icon in your Chrome toolbar
   - The sidebar will slide in from the right

3. **View data**
   - See formatted details in the "Details" section
   - Expand "Raw JSON" to see complete API responses
   - Click "Copy JSON" to copy data to your clipboard

4. **Refresh data**
   - Click "Refresh" to re-fetch data for the current page
   - Navigate to a different Pinterest page and click "Refresh"

## Development

### Running in Development Mode

```bash
npm run dev
```

Open `index.html` in your browser to preview the UI standalone (without the extension context).

### Building for Production

```bash
npm run build
```

### Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Chrome Extensions Manifest V3** - Extension framework

## Supported Pinterest Domains

Board Explorer works across all Pinterest international domains, including:

- pinterest.com
- pinterest.co.uk
- pinterest.ca
- pinterest.de
- pinterest.fr
- And many more (see [manifest.json](manifest.json) for complete list)

## Troubleshooting

**Extension not appearing?**

- Make sure you built the project (`npm run build`)
- Reload the extension at `chrome://extensions/`

**No data showing?**

- Ensure you're on a valid Pinterest page
- Check the browser console for errors
- Try clicking "Refresh" in the sidebar

**Sidebar not opening?**

- Click the extension icon in the Chrome toolbar
- Check that the content script loaded (inspect the page and look for Board Explorer in console)

## License

MIT
