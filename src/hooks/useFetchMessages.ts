import { useCallback, useEffect, useState } from "react";
import { getMessages } from "../api/messages.api";
import type { Message } from "../types/message";

const DEFAULT_LIMIT = 50;

// Sort the messages in descending order to display the most recent message at the top
function sortMessagesChronologically(messages: Message[]): Message[] {
  return [...messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

// custom hook with error handling that handles fetching the messages from the api and formatting it in ascending order
export function useFetchMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getMessages("", DEFAULT_LIMIT);
      setMessages(sortMessagesChronologically(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, setMessages, isLoading, error, refetch: fetchMessages };
}
