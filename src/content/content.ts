// Content script: injects a container div and lazy-loads the sidebar UI bundle
const CONTAINER_ID = "board-explorer-root";
if (!document.getElementById(CONTAINER_ID)) {
  const container = document.createElement("div");
  container.id = CONTAINER_ID;
  document.body.appendChild(container);

  // Dynamic import mounts the React sidebar (the bundler will create the chunk)
  import("../ui/entry")
    .then(({ mountSidebar }) => {
      const host = document.getElementById(CONTAINER_ID) as HTMLElement;
      mountSidebar(host);
    })
    .catch((err) => console.error("Failed to mount Board Explorer UI:", err));
}

// Helper to dispatch data to the UI
function sendDataToUI(payload: any) {
  const ev = new CustomEvent("board-explorer-data", { detail: { payload } });
  document.dispatchEvent(ev);

  // Persist last resource for quick load
  try {
    chrome.storage.local.set({
      lastResource: payload,
      lastFetchedAt: Date.now(),
    });
  } catch (err) {
    // ignore in contexts where chrome.storage isn't available
    console.warn("Could not save last resource to chrome.storage:", err);
  }
}

function sendActionToUI(action: "open" | "close") {
  const ev = new CustomEvent("board-explorer-data", { detail: { action } });
  document.dispatchEvent(ev);
}

// Listen for messages from background (e.g., when the toolbar is clicked)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "OPEN_SIDEBAR") {
    sendActionToUI("open");
    runFetchForPage();
    sendResponse({ ok: true });
    return true;
  }
});

// Allow the UI to request a refresh via a custom event
document.addEventListener("board-explorer-refresh", () => {
  runFetchForPage();
});

async function runFetchForPage() {
  const href = location.href;
  try {
    const api = await import("../api/pinterest");

    const pinMatch = href.match(/pin\/(?:[A-Za-z0-9_-]+)/);
    if (pinMatch) {
      console.log("Detected pin URL");
      const id = pinMatch[0].split("/").pop()!;
      const json = await api.fetchAllPaginatedData(id, "pin");
      sendDataToUI({
        type: "pin",
        id,
        resource: "/resource/PinResource/get/",
        json,
      });
      return;
    }

    const sectionMatch = href.match(
      /\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/?(?:\?|$)/,
    );
    if (sectionMatch && !href.includes("/pin/")) {
      console.log("Detected board section URL");
      const username = sectionMatch[1];
      const boardSlug = sectionMatch[2];
      const sectionSlug = sectionMatch[3];
      const boardId = `${username}/${boardSlug}`;
      const sectionId = `${boardId}/${sectionSlug}`;
      const json = await api.fetchAllPaginatedData(sectionId, "sectionPins", boardId);
      sendDataToUI({ type: "section", id: sectionSlug, boardId: boardSlug, resource: "/resource/BoardSectionPinsResource/get/", json });
      return;
    }

    const boardMatch = href.match(
      /\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/?(?:\?|$)/,
    );
    if (boardMatch && !href.includes("/pin/")) {
      console.log("Detected board URL");
      const username = boardMatch[1];
      const boardSlug = boardMatch[2];
      const boardId = `${username}/${boardSlug}`;
      const json = await api.fetchAllPaginatedData(boardId, "board");
      const pinJson = await api.fetchAllPaginatedData(
        json.id,
        "boardPins",
        boardId,
      );
      const sectionJson = await api.fetchAllPaginatedData(
        json.id,
        "boardSections",
        boardId,
      );
      sendDataToUI({
        type: "board",
        id: boardId,
        userId: username,
        resource: "/resource/BoardResource/get/",
        json,
        pinJson,
        sectionJson,
      });
      return;
    }

    const userMatch = href.match(/\/([A-Za-z0-9_-]+)\/?(?:\?|$)/);
    if (userMatch) {
      const username = userMatch[1];
      const json = await api.fetchAllPaginatedData(username, "user");
      sendDataToUI({
        type: "user",
        id: username,
        resource: "/resource/UserResource/get/",
        json,
      });
      return;
    }

    sendDataToUI({
      type: "unknown",
      id: "",
      resource: "",
      json: { message: "No Pinterest resource detected on this page." },
    });
  } catch (err) {
    console.error("Error fetching Pinterest resource:", err);
    sendDataToUI({
      type: "error",
      id: location.href,
      json: { message: String(err) },
    });
  }
}
