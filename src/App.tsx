import { MessageContainer } from "./components/MessageContainer";
import { useMessages } from "./hooks/useMessages";
import { useSendMessage } from "./hooks/useSendMessage";
import { CURRENT_AUTHOR } from "./utils/constants";

function App() {
  const { messages, setMessages, isLoading, error } = useMessages();
  const { send, isSending } = useSendMessage(setMessages);

  return (
    <MessageContainer
      messages={messages}
      author={CURRENT_AUTHOR}
      onSend={send}
      isLoading={isLoading}
      isSending={isSending}
      error={error}
    />
  );
}

export default App;
