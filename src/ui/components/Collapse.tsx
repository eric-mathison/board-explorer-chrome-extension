import React from "react"

export default function Collapse({
  summary,
  children,
}: {
  summary: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <details className="my-2 border rounded-md" style={{ padding: 8 }}>
      <summary className="cursor-pointer font-semibold">{summary}</summary>
      <div className="mt-2">{children}</div>
    </details>
  )
}
