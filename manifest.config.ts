import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: 'icons/icon-16.svg',
    48: 'icons/icon-48.svg',
    128: 'icons/icon-128.svg',
  },
  action: {
    default_icon: {
      48: 'icons/icon-48.svg',
    },
    default_title: 'Board Explorer',
  },
  content_scripts: [{
    js: ['src/content/content.ts'],
    run_at: 'document_idle',
    matches: ["https://*.pinterest.com/*",
        "https://*.pinterest.co.uk/*",
        "https://*.pinterest.ca/*",
        "https://*.pinterest.de/*",
        "https://*.pinterest.fr/*",
        "https://*.pinterest.es/*",
        "https://*.pinterest.it/*",
        "https://*.pinterest.at/*",
        "https://*.pinterest.ch/*",
        "https://*.pinterest.cl/*",
        "https://*.pinterest.com.au/*",
        "https://*.pinterest.com.mx/*",
        "https://*.pinterest.dk/*",
        "https://*.pinterest.ie/*",
        "https://*.pinterest.jp/*",
        "https://*.pinterest.nz/*",
        "https://*.pinterest.ph/*",
        "https://*.pinterest.pt/*",
        "https://*.pinterest.se/*",
        "https://*.pinterest.ru/*"],
  }],
  permissions: [
    "scripting", "activeTab", "storage"
  ],
  background: {
    service_worker: 'src/background/service-worker.ts',
  },
})

