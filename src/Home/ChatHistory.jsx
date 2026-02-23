import { showChatSummary } from "../db/db_operations";
import { useEffect, useState } from "react";
import "./chat_history_style.css";
import { useNavigate } from "react-router-dom";
function ChatHistory() {
  const nav = useNavigate();
  const [firstMessages, setFistMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      const firstChats = await showChatSummary();

      if (firstChats) {
        setFistMessages(firstChats);
      }
    };

    getMessages();
  }, []);
  return (
    <div className="chat_history_container">
      <p>Chat History</p>
      {firstMessages.map((message) => {
        const batch = message.batch;
        return (
          <div
            className="chat_card"
            key={message.timestamp}
            onClick={() => {
              nav("/", {
                state: {
                  initialChatBatch: batch,
                },
              });
            }}
          >
            {message.prompt}
          </div>
        );
      })}
    </div>
  );
}
export default ChatHistory;
