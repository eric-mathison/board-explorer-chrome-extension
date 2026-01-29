console.log("Board Explorer background service worker started")

// When the extension icon is clicked, tell the active tab to open the sidebar and attempt to fetch resource data.
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "OPEN_SIDEBAR" })
  } catch (err) {
    // Could fail if content script isn't injected; consider injecting the content script explicitly
    console.error("Failed to send message to tab:", err)
  }
})

chrome.runtime.onInstalled.addListener(() => {
  console.log("Board Explorer installed")
})
