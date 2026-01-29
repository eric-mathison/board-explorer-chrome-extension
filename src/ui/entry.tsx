import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "@/styles/index.css"

export function mountSidebar(container: HTMLElement) {
  const root = createRoot(container)
  root.render(<App />)

  // Load last resource from storage if present
  try {
    chrome.storage.local.get("lastResource", (res) => {
      if (res && res.lastResource) {
        const ev = new CustomEvent("board-explorer-data", {
          detail: { payload: res.lastResource },
        })
        document.dispatchEvent(ev)
      }
    })
  } catch (err) {
    // ignore when chrome.storage is not available (e.g., dev preview)
  }
}
