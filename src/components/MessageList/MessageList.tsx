import { memo, useCallback, useLayoutEffect, useRef } from "react";
import type { Message } from "../../types/message";
import { USER_MESSAGES } from "../../utils/constants";
import { MessageCard } from "../MessageCard/MessageCard";
import { MessageListSkeleton } from "./MessageListSkeleton";
import "./MessageList.scss";

type MessageListProps = {
  messages: Message[];
  author: string;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
};

function MessageListComponent({
  messages,
  author,
  isLoading,
  error,
  onRetry,
}: MessageListProps) {
  const listRef = useRef<HTMLElement>(null);
  const lastMessageId = messages.at(-1)?.id;
  const showSkeleton = Boolean(isLoading && messages.length === 0);
  const showError = Boolean(error && messages.length === 0 && !isLoading);
  const showEmpty =
    !isLoading && !error && messages.length === 0;
  const showMessages = messages.length > 0;

  // function to always keep the scrollbar to yhe bottom showing the latest message
  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    const node = listRef.current;
    if (!node) {
      return;
    }
    node.scrollTo({ top: node.scrollHeight, behavior });
  }, []);

  useLayoutEffect(() => {
    if (!showMessages) {
      return;
    }
    scrollToBottom(isLoading ? "auto" : "smooth");
  }, [lastMessageId, messages.length, showMessages, isLoading, scrollToBottom]);

  return (
    <section
      ref={listRef}
      className="message-list"
      aria-label={USER_MESSAGES.CHAT_MESSAGES_ARIA_LABEL}
      role="log"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {showSkeleton && <MessageListSkeleton />}

      {showError && (
        <div className="message-list-feedback message-list-feedback-error" role="alert">
          <p className="message-list-feedback-text">
            {USER_MESSAGES.ERROR_LOAD_MESSAGES}
            {error?.message && (
              <span className="message-list-feedback-detail"> {error.message}</span>
            )}
          </p>
          {/* if the data fetch fails, the button will trigger a retry */}
          {onRetry && (
            <button
              type="button"
              className="message-list-retry-button"
              onClick={onRetry}
            >
              {USER_MESSAGES.RETRY_BUTTON}
            </button>
          )}
        </div>
      )}

      {showEmpty && (
        <div className="message-list-feedback message-list-feedback-empty">
          <p className="message-list-feedback-text">
            {USER_MESSAGES.EMPTY_MESSAGES}
          </p>
        </div>
      )}

      {showMessages && (
        <div className="message-list-items">
          {messages.map((msg) => (
            <MessageCard
              key={msg.id}
              message={msg}
              isOwner={msg.author === author}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function areMessageListPropsEqual(
  prev: MessageListProps,
  next: MessageListProps,
): boolean {
  return (
    prev.author === next.author &&
    prev.isLoading === next.isLoading &&
    prev.error === next.error &&
    prev.messages === next.messages &&
    prev.onRetry === next.onRetry
  );
}

export const MessageList = memo(MessageListComponent, areMessageListPropsEqual);
