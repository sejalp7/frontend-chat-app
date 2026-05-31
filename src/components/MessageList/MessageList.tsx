import { useEffect, useRef } from "react";
import type { Message } from "../../types/message";
import { USER_MESSAGES } from "../../utils/constants";
import { MessageCard } from "../MessageCard/MessageBubble";

type MessageListProps = {
  messages: Message[];
  author: string;
  isLoading?: boolean;
  error?: Error | null;
};

export function MessageList({
  messages,
  author,
  isLoading,
  error,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);


  // function to render UI is data fetching is in progress
  const renderLoadingMessage = () => {
    return (
      <>
        {isLoading && messages.length === 0 && (
          <p className="message-list-status">{USER_MESSAGES.LOADING_MESSAGES}</p>
        )}
      </>
    )
  }


  // function to render UI if data fetching fails
  const renderErrorMessage = () => {
    return (
      <>
        {error && (
          <p className="message-list-status message-list-error" role="alert">
            {USER_MESSAGES.ERROR_LOAD_MESSAGES} {error.message}
          </p>
        )}
      </>
    )
  }

  return (
    <section
      className="message-list"
      aria-label={USER_MESSAGES.CHAT_MESSAGES_ARIA_LABEL}
      role="log"
      aria-live="polite"
      aria-busy={isLoading}
    >

      {renderLoadingMessage()}

      {renderErrorMessage()}

      {/* render the list of messages fetched */}
      <div className="message-list-items">
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            message={msg}
            isOwner={msg.author === author}
          />
        ))}
        <div ref={bottomRef} className="message-list-anchor" />
      </div>
    </section>
  );
}
