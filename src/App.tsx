import { MessageContainer } from "./components/MessageContainer";
import { useFetchMessages } from "./hooks/useFetchMessages";
import { useSendMessage } from "./hooks/useSendMessage";
import { CURRENT_AUTHOR } from "./utils/constants";

function App() {
  const { messages, setMessages, isLoading, error, refetch } = useFetchMessages();
  const { send, isSending } = useSendMessage(setMessages);

  return (
    <MessageContainer
      messages={messages}
      author={CURRENT_AUTHOR}
      onSend={send}
      onRetry={refetch}
      isLoading={isLoading}
      isSending={isSending}
      error={error}
    />
  );
}

export default App;
