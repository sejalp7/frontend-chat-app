
import { MessageInput } from "./MessageInput/MessageInput";
import { MessageList } from "./MessageList/MessageList";
import type { Message } from "../types/message";

type MessageContainerProps  = {
  messages: Message[];
  author: string;
  onSend: (text: string) => void;
  isLoading?: boolean;
  isSending?: boolean;
  error?: Error | null;
};

export function MessageContainer({
  messages,
  author,
  onSend,
  isLoading,
  isSending,
  error,
}: MessageContainerProps) {
  return (
    <div className="chat-window">
      <MessageList
        messages={messages}
        author={author}
        isLoading={isLoading}
        error={error}
      />
      <MessageInput onSend={onSend} disabled={isSending} />
    </div>
  );
}
