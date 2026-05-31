import { memo } from "react";
import type { Message } from "../../types/message";
import {
  messageFromAuthorAriaLabel,
  USER_MESSAGES,
} from "../../utils/constants";
import { formatMessageDate } from "../../utils/formatDate";
import "./MessageCard.scss";

export type MessageCardProps = {
  message: Message;
  isOwner: boolean;
};

function areMessageCardPropsEqual(
  prev: MessageCardProps,
  next: MessageCardProps,
): boolean {
  return (
    prev.isOwner === next.isOwner &&
    prev.message.id === next.message.id &&
    prev.message.author === next.message.author &&
    prev.message.message === next.message.message &&
    prev.message.createdAt === next.message.createdAt
  );
}

function MessageCardComponent({ message, isOwner }: MessageCardProps) {
  return (
    <article
      className={`message-card ${isOwner ? "message-card-own" : "message-card-other"}`}
      aria-label={
        isOwner
          ? USER_MESSAGES.OWN_MESSAGE_ARIA_LABEL
          : messageFromAuthorAriaLabel(message.author)
      }
    >
      {!isOwner && (
        <header className="message-card-author">{message.author}</header>
      )}
      <p className="message-card-text">{message.message}</p>
      <time className="message-card-time" dateTime={message.createdAt}>
        {formatMessageDate(message.createdAt)}
      </time>
    </article>
  );
}

export const MessageCard = memo(MessageCardComponent, areMessageCardPropsEqual);
