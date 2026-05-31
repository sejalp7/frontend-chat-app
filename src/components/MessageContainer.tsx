import { memo } from "react";
import type { Message } from "../types/message";
import "./MessageContainer.scss";
import { MessageInput } from "./MessageInput/MessageInput";
import { MessageList } from "./MessageList/MessageList";

type MessageContainerProps = {
  messages: Message[];
  author: string;
  onSend: (text: string) => void;
  onRetry?: () => void;
  isLoading?: boolean;
  isSending?: boolean;
  error?: Error | null;
};

function MessageContainerComponent({
  messages,
  author,
  onSend,
  onRetry,
  isLoading,
  isSending,
  error,
}: MessageContainerProps) {
  return (
    <div className="message-container">
      <MessageList
        messages={messages}
        author={author}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
      />
      <MessageInput onSend={onSend} disabled={isSending} />
    </div>
  );
}

function areMessageContainerPropsEqual(
  prev: MessageContainerProps,
  next: MessageContainerProps,
): boolean {
  return (
    prev.author === next.author &&
    prev.isLoading === next.isLoading &&
    prev.isSending === next.isSending &&
    prev.error === next.error &&
    prev.messages === next.messages &&
    prev.onSend === next.onSend &&
    prev.onRetry === next.onRetry
  );
}

export const MessageContainer = memo(
  MessageContainerComponent,
  areMessageContainerPropsEqual,
);
