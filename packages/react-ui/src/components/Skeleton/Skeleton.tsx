import { useInsertionEffect } from "react";

const skeletonStyle: React.CSSProperties = {
  background: "var(--openui-elevated-strong)",
  borderRadius: "var(--openui-radius-xs, 4px)",
  animation: "openui-skeleton-pulse 1.2s ease-in-out infinite",
};

let styleInjected = false;
function ensureKeyframes() {
  if (styleInjected || typeof document === "undefined") return;
  styleInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes openui-skeleton-pulse {
      0% { opacity: 0.3; }
      50% { opacity: 0.85; }
      100% { opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);
}

function useSkeletonStyle() {
  useInsertionEffect(() => { ensureKeyframes(); }, []);
}

interface SkeletonBarProps {
  height: string;
  width: string;
  borderRadius?: string;
}

function SkeletonBar({ height, width, borderRadius }: SkeletonBarProps) {
  useSkeletonStyle();
  return (
    <div
      style={{
        ...skeletonStyle,
        height,
        width,
        borderRadius: borderRadius ?? "4px",
      }}
    />
  );
}

export function Skeleton({
  count = 1,
  height = "16px",
  width = "100%",
  borderRadius,
}: {
  count?: number;
  height?: string;
  width?: string;
  borderRadius?: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ marginBottom: count > 1 && i < count - 1 ? "8px" : undefined }}>
          <SkeletonBar height={height} width={width} borderRadius={borderRadius} />
        </div>
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "12px",
          padding: "8px 12px",
          borderBottom: "1px solid var(--openui-border-default)",
        }}
      >
        {Array.from({ length: columns }, (_, i) => (
          <div key={`h-${i}`} style={{ height: "14px", width: "60%" }}>
            <SkeletonBar height="14px" width="100%" />
          </div>
        ))}
      </div>
      {Array.from({ length: rows }, (_, ri) => (
        <div
          key={`r-${ri}`}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "12px",
            padding: "10px 12px",
            borderBottom: ri < rows - 1 ? "1px solid var(--openui-border-default)" : undefined,
          }}
        >
          {Array.from({ length: columns }, (_, ci) => (
            <div key={`c-${ri}-${ci}`} style={{ height: "14px" }}>
              <SkeletonBar height="14px" width={`${50 + ((ri * 7 + ci * 13) % 40)}%`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
