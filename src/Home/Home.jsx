import { useState, useRef, useEffect } from "react";
import Navbar from "../NavBarComp/Navbar";
import Mymessage from "../chat_comp/Mymessage";
import Response from "../chat_comp/Response";
import "./home_style.css";
import { send_and_hear_res } from "../api/send_and_hear";
import { init } from "../api/user_operation";
import { useNavigate } from "react-router-dom";
import { db } from "../db/jackie_db";
import {
  continueLatestChat,
  getChatsByBatch,
  getLatestBatchId,
} from "../db/db_operations";
import ChatHistory from "./ChatHistory";
import { useLocation } from "react-router-dom";
import { handleKeyDown } from "../api/user_operation";
import ThinkingAnimation from "../chat_comp/ThinkingAnimation";

function Home() {
  const location = useLocation();
  const initialChatBatch = location.state?.initialChatBatch ?? null;
  const nav = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showhistory, setShowHistory] = useState(true);
  const [batch, setbatch] = useState(0);
  const email = localStorage.getItem("jackie_email");

  //intial check
  {
    useEffect(() => {
      const check = async () => {
        //console.log("cheching");
        const move = await init();
        if (!move) {
          nav("/login");
        }
      };
      check();
    }, []);
  }

  useEffect(() => {
    const constinueChat = async () => {
      const rawChats =
        initialChatBatch === null
          ? await continueLatestChat()
          : await getChatsByBatch(initialChatBatch);

      const formattedHistory = rawChats.flatMap((chat) => [
        { text: chat.prompt, type: "user" },
        { text: chat.response, type: "bot" },
      ]);

      setChatHistory(formattedHistory);

      if (initialChatBatch === null) {
        setbatch(await getLatestBatchId());
      } else {
        setbatch(initialChatBatch);
      }
    };

    constinueChat();
  }, [initialChatBatch]);

  const prompt_text = useRef(null);

  const handleSend = async () => {
    const prompt = prompt_text.current.value;
    if (!prompt) return;

    const newMessage = { type: "user", text: prompt };
    setChatHistory((prev) => [...prev, newMessage]);

    prompt_text.current.value = "";
    setIsLoading(true);

    const res = await send_and_hear_res(prompt);

    if (res) {
      const aiResponse = { type: "bot", text: res };
      setChatHistory((prev) => [...prev, aiResponse]);

      await db.chats.add({
        timestamp: Date.now(),
        batch: batch,
        prompt: prompt,
        response: res,
        jackie_email: email,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="main">
      <div className="header">
        <Navbar />
      </div>
      {
        <div
          style={{
            position: "fixed",
            marginTop: "5%",
            color: "#ffffff",
            backgroundImage: "linear-gradient(45deg,blue,cyan)",
            paddingRight: "1%",
            paddingLeft: "1%",
            paddingBottom: "0.3%",
            paddingTop: "0.3%",
            borderRadius: "16px",
            display: "flex",
            gap: "2%",
            cursor: "pointer",
            zIndex: 999,
          }}
          onClick={() => {
            setShowHistory(!showhistory);
          }}
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-message-square-text-icon lucide-message-square-text"
          >
            <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
            <path d="M7 11h10" />
            <path d="M7 15h6" />
            <path d="M7 7h8" />
          </svg>
        </div>
      }

      <div className="content_holder">
        {
          // chat history div
          <div
            style={{
              width: !showhistory ? "400px" : "0px", // Use actual pixels or a solid percentage
              opacity: !showhistory ? 1 : 0, // Optional: fade it out too
              overflow: "hidden", // CRITICAL: prevents content from spilling out
              transition: "width 0.5s ease-in-out, opacity 0.3s ease", // THE MAGIC WAND
            }}
            className="history_holder"
          >
            {!showhistory && (
              <div>
                <div
                  className="new_chat_btn"
                  onClick={async () => {
                    let latestbatchfromdb = await getLatestBatchId();
                    latestbatchfromdb = parseInt(latestbatchfromdb);
                    latestbatchfromdb += 1;
                    setbatch(latestbatchfromdb.toString());
                    setChatHistory([]);
                    setShowHistory(!showhistory);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  New Chat
                </div>

                <ChatHistory />
              </div>
            )}
          </div>
        }
        <div className="home_content">
          {chatHistory.map((chat, index) =>
            chat.type === "user" ? (
              <Mymessage key={index} text={chat.text} />
            ) : (
              <Response key={index} text={chat.text} />
            ),
          )}
          {isLoading && (
            <div>
              <ThinkingAnimation></ThinkingAnimation>
            </div>
          )}
        </div>
      </div>

      <div className="input_container">
        <textarea
          ref={prompt_text}
          placeholder="anything in mind"
          onKeyDown={(e) => {
            handleKeyDown(e, handleSend);
          }}
        ></textarea>
        <button type="button" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
}

export default Home;
