import { memo, useState, type FormEvent } from "react";
import { USER_MESSAGES } from "../../utils/constants";
import "./MessageInput.scss";

type MessageInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

function MessageInputComponent({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSend(trimmed);
    setText("");
  };

  return (
    <form
      className="message-input-bar"
      onSubmit={handleSubmit}
      aria-label={USER_MESSAGES.SEND_MESSAGE_FORM_ARIA_LABEL}
    >
      <label className="message-input-bar-label" htmlFor="message-input">
        {USER_MESSAGES.MESSAGE_INPUT_LABEL}
      </label>
      <input
        id="message-input"
        className="message-input-bar-input"
        type="text"
        placeholder={USER_MESSAGES.MESSAGE_INPUT_PLACEHOLDER}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        autoComplete="off"
      />
      <button
        className="message-input-bar-button"
        type="submit"
        disabled={disabled || !text.trim()}
      >
        {USER_MESSAGES.SEND_BUTTON}
      </button>
    </form>
  );
}

export const MessageInput = memo(MessageInputComponent);
