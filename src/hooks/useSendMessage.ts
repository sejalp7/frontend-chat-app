import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { sendMessage } from "../api/messages.api";
import type { Message } from "../types/message";
import { CURRENT_AUTHOR } from "../utils/constants";


// custom hook with error handling to send the message to the send message api call
export function useSendMessage(
  setMessages: Dispatch<SetStateAction<Message[]>>,
) {
  const [isSending, setIsSending] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const optimisticId = `optimistic-${Date.now()}`;
      const optimistic: Message = {
        id: optimisticId,
        author: CURRENT_AUTHOR,
        message: text,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, optimistic]);
      setIsSending(true);

      try {
        const created = await sendMessage({
          message: text,
          author: CURRENT_AUTHOR,
        });
        setMessages((current) => [
          ...current.filter((msg) => msg.id !== optimisticId),
          created,
        ]);
      } catch {
        setMessages((current) =>
          current.filter((msg) => msg.id !== optimisticId),
        );
      } finally {
        setIsSending(false);
      }
    },
    [setMessages],
  );

  return { send, isSending };
}
