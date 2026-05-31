import { memo } from "react";

const SKELETON_ITEMS = [
  { align: "other" as const, width: "55%" },
  { align: "own" as const, width: "40%" },
  { align: "other" as const, width: "48%" },
  { align: "own" as const, width: "62%" },
  { align: "other" as const, width: "36%" },
];

// optimistic UI Component to show empty loading states for messages card when the api fetch is in progress
function MessageListSkeletonComponent() {
  return (
    <div
      className="message-list-skeleton"
      aria-busy="true"
      aria-label="Loading messages"
    >
      {SKELETON_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`message-list-skeleton-card message-list-skeleton-card-${item.align}`}
          style={{ width: item.width }}
        >
          {item.align === "other" && (
            <div className="message-list-skeleton-line message-list-skeleton-line-author" />
          )}
          <div className="message-list-skeleton-line message-list-skeleton-line-body" />
          <div className="message-list-skeleton-line message-list-skeleton-line-time" />
        </div>
      ))}
    </div>
  );
}

export const MessageListSkeleton = memo(MessageListSkeletonComponent);
