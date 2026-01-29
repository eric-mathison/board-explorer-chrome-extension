import React, { useEffect, useState } from "react";
import Collapse from "./components/Collapse";
import JSONViewer from "./components/JSONViewer";

export default function App() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handler(e: Event) {
      const ev = e as CustomEvent;
      if (ev.detail?.action === "open") setOpen(true);
      if (ev.detail?.action === "close") setOpen(false);
      if (ev.detail?.payload) setData(ev.detail.payload);
    }

    document.addEventListener("board-explorer-data", handler as EventListener);
    return () =>
      document.removeEventListener(
        "board-explorer-data",
        handler as EventListener,
      );
  }, []);

  const copyJSON = (jsonData: any) => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: 420,
        boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
        transform: `translateX(${open ? 0 : 100}%)`,
        transition: "transform 200ms ease-in-out",
        background: "#fff",
        zIndex: 999999,
      }}
      aria-hidden={!open}
    >
      <div
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Board Explorer</h3>
        <div>
          <button onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      <div
        style={{ padding: 12, overflowY: "auto", height: "calc(100% - 56px)" }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <button
            onClick={() =>
              document.dispatchEvent(new CustomEvent("board-explorer-refresh"))
            }
            className="px-2 py-1 rounded border"
          >
            Refresh
          </button>
          <button
            onClick={() =>
              document.dispatchEvent(
                new CustomEvent("board-explorer-data", {
                  detail: { action: "close" },
                }),
              )
            }
            className="px-2 py-1 rounded border"
          >
            Close
          </button>
        </div>

        {!data && (
          <p className="text-sm text-gray-600">
            Open the extension on a Pinterest page (board/pin/user) to view
            details.
          </p>
        )}
        
        {data && (
          <div>
            <div className="mb-2">
              <strong>Type:</strong> {data.type}
            </div>
            <div className="mb-2">
              <strong>Resource:</strong> <code>{data.resource}</code>
            </div>
            <div className="mb-2">
              <strong>ID:</strong> <code>{data.id}</code>
            </div>

            <Collapse summary={<span>Details</span>}>
              {data.type === "user" && (
                <div className="mb-2">
                  <div>
                    <strong>ID:</strong> {data.json?.id}
                  </div>
                  <div>
                    <strong>Profile Name:</strong> {data.json?.full_name}
                  </div>
                  <div>
                    <strong>Visibility:</strong>{" "}
                    {data.json?.is_private_profile ? "Private" : "Public"}
                  </div>
                  <div>
                    <strong>About:</strong> {data.json?.about}
                  </div>
                  <div>
                    <strong>URL:</strong>{" "}
                    {data.json?.url || data.json?.website_url}
                  </div>
                  <div>
                    <strong>Board Count:</strong> {data.json?.board_count}
                  </div>
                  <div>
                    <strong>Group Boards:</strong>{" "}
                    {data.json?.group_board_count}
                  </div>
                  <div>
                    <strong>Pin Count:</strong> {data.json?.pin_count}
                  </div>
                  <div>
                    <strong>Story Pin Count:</strong>{" "}
                    {data.json?.story_pin_count}
                  </div>
                  <div>
                    <strong>Video Pin Count:</strong>{" "}
                    {data.json?.video_pin_count}
                  </div>
                  <div>
                    <strong>Follower Count:</strong> {data.json?.follower_count}
                  </div>
                  <div>
                    <strong>Following Count:</strong>{" "}
                    {data.json?.following_count}
                  </div>
                  <div>
                    <strong>Profile Views:</strong> {data.json?.profile_views}
                  </div>
                  <div>
                    <strong>Last Pin Activity:</strong>{" "}
                    {data.json?.last_pin_save_time}
                  </div>
                </div>
              )}
              {data.type === "board" && (
                <div className="mb-2">
                  <div>
                    <strong>ID:</strong> {data.json?.id}
                  </div>
                  <div>
                    <strong>Title:</strong> {data.json?.name}
                  </div>
                  <div>
                    <strong>Visibility:</strong> {data.json?.privacy}
                  </div>
                  <div>
                    <strong>Owner:</strong> {data.json?.owner?.full_name}
                  </div>
                  <div>
                    <strong>Sections Count:</strong> {data.sectionJson?.length}
                  </div>
                  <div>
                    <strong>Pin Count:</strong> {data.json?.pin_count}
                  </div>
                  <div>
                    <strong>Followers:</strong> {data.json?.follower_count}
                  </div>
                </div>
              )}
              {data.type === "pin" && (
                <div className="mb-2">
                  <div>
                    <strong>Title:</strong> {data.json?.title || data.json?.rich_summary?.display_name}
                  </div>
                  <div>
                    <strong>Visibility:</strong> {data.json?.privacy}
                  </div>
                  <div>
                    <strong>Owner:</strong> {data.json?.board.owner.username}
                  </div>
                  <div>
                    <strong>Description:</strong> {data.json?.description}
                  </div>
                  <div>
                    <strong>Image Url:</strong> {data.json?.images.orig.url}
                  </div>
                  <div>
                    <strong>Link:</strong> {data.json?.link}
                  </div>
                  <div>
                    <strong>Board:</strong> {data.json?.board?.name}
                  </div>
                  <div>
                    <strong>Dominant Color:</strong> {data.json?.dominant_color}
                  </div>
                  <div>
                    <strong>Repin Count:</strong> {data.json?.repin_count}
                  </div>
                  <div>
                    <strong>Share Count:</strong> {data.json?.share_count}
                  </div>
                  <div>
                    <strong>Favorite Count:</strong> {data.json?.favorite_user_count}
                  </div>
                  {data.json?.reaction_counts && (
                    <div>
                      <strong>Total Reactions:</strong> {Object.values(data.json.reaction_counts).reduce((sum: number, count: any) => sum + count, 0)}
                    </div>
                  )}
                </div>
              )}
              {data.type === "section" && (
                <div className="mb-2">
                  <div>
                    <strong>Title:</strong> {data.id}
                  </div>
                  <div>
                    <strong>Board Title:</strong> {data.boardId}
                  </div>
                  <div>
                    <strong>Pin Count:</strong> {data.json?.length}
                  </div>
                </div>
              )}

            </Collapse>

            <Collapse summary={<span>Raw JSON</span>}>
            <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => copyJSON(data.json)}
                  className="px-2 py-1 rounded border text-sm"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
              <JSONViewer data={data.json} />
            </Collapse>

            {data.sectionJson && (
              <Collapse summary={<span>Raw Section JSON</span>}>
                <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => copyJSON(data.sectionJson)}
                  className="px-2 py-1 rounded border text-sm"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
                <JSONViewer data={data.sectionJson} />
              </Collapse>
            )}

            {data.pinJson && (
              <Collapse summary={<span>Raw Pin JSON</span>}>
                <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => copyJSON(data.pinJson)}
                  className="px-2 py-1 rounded border text-sm"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
                <JSONViewer data={data.pinJson} />
              </Collapse>
            )}

            {data.json.show_recipe_cta && (
              <Collapse summary={<span>Recipe JSON</span>}>
                <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => copyJSON(data.json.rich_metadata.recipe)}
                  className="px-2 py-1 rounded border text-sm"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
                <JSONViewer data={data.json.rich_metadata.recipe} />
              </Collapse>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
