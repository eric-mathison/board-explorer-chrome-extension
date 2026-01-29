import React from "react"

export default function JSONViewer({ data }: { data: any }) {
  return (
    <div
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: 8,
        borderRadius: 6,
        maxHeight: 400,
        overflow: "auto",
      }}
    >
      <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
