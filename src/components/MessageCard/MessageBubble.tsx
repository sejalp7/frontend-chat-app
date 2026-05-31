import type { Message } from "../../types/message";
import {
  messageFromAuthorAriaLabel,
  USER_MESSAGES,
} from "../../utils/constants";
import { formatMessageDate } from "../../utils/formatDate";

type MessageCardProps = {
  message: Message;
  isOwner: boolean;
};

export function MessageCard({ message, isOwner }: MessageCardProps) {
  return (
    <article
      className={`message-bubble ${isOwner ? "message-bubble-own" : "message-bubble-other"}`}
      aria-label={
        isOwner
          ? USER_MESSAGES.OWN_MESSAGE_ARIA_LABEL
          : messageFromAuthorAriaLabel(message.author)
      }
    >
      {!isOwner && (
        <header className="message-bubble__author">{message.author}</header>
      )}
      <p className="message-bubble__text">{message.message}</p>
      <time
        className="message-bubble__time"
        dateTime={message.createdAt}
      >
        {formatMessageDate(message.createdAt)}
      </time>
    </article>
  );
}
