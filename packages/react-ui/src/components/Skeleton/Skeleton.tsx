import clsx from "clsx";

interface SkeletonBarProps {
  height: string;
  width: string;
  borderRadius?: string;
}

function SkeletonBar({ height, width, borderRadius }: SkeletonBarProps) {
  return (
    <div
      className="openui-skeleton-bar"
      style={{
        height,
        width,
        ...(borderRadius ? { borderRadius } : {}),
      }}
    />
  );
}

export function Skeleton({
  count = 1,
  height = "16px",
  width = "100%",
  borderRadius,
  className,
}: {
  count?: number;
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}) {
  return (
    <div className={clsx("openui-skeleton-stack", className)}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonBar key={i} height={height} width={width} borderRadius={borderRadius} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="openui-skeleton-table">
      <div
        className="openui-skeleton-table-row"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }, (_, i) => (
          <div
            key={`h-${i}`}
            className={clsx("openui-skeleton-table-cell", "openui-skeleton-table-cell-short")}
          >
            <SkeletonBar height="14px" width="100%" />
          </div>
        ))}
      </div>
      {Array.from({ length: rows }, (_, ri) => (
        <div
          key={`r-${ri}`}
          className="openui-skeleton-table-row"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }, (_, ci) => (
            <div key={`c-${ri}-${ci}`} className="openui-skeleton-table-cell">
              <SkeletonBar height="14px" width={`${50 + ((ri * 7 + ci * 13) % 40)}%`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
