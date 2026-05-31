/** User-facing copy for the chat UI. */
export const USER_MESSAGES = {
  LOADING_MESSAGES: "Loading messages…",
  ERROR_LOAD_MESSAGES: "Could not load messages.",
  CHAT_MESSAGES_ARIA_LABEL: "Chat messages",
  SEND_MESSAGE_FORM_ARIA_LABEL: "Send a message",
  MESSAGE_INPUT_LABEL: "Message",
  MESSAGE_INPUT_PLACEHOLDER: "Message",
  SEND_BUTTON: "Send",
  OWN_MESSAGE_ARIA_LABEL: "Your message",
  MESSAGE_FROM_AUTHOR_ARIA_LABEL: "Message from",
} as const;

export function messageFromAuthorAriaLabel(author: string): string {
  return `${USER_MESSAGES.MESSAGE_FROM_AUTHOR_ARIA_LABEL} ${author}`;
}


/** Author name sent with new messages; used to style outgoing bubbles. */
export const CURRENT_AUTHOR =
  import.meta.env.VITE_CURRENT_AUTHOR ?? "You";