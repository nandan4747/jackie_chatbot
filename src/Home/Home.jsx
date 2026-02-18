import { useState, useRef } from "react";
import Navbar from "../NavBarComp/Navbar";
import Mymessage from "../chat_comp/Mymessage";
import Response from "../chat_comp/Response";
import "./home_style.css";
import { send_and_hear_res } from "../api/send_and_hear";

function Home() {
  const prompt_text = useRef(null);

  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    }
    setIsLoading(false);
  };

  return (
    <div className="main">
      <div className="header">
        <Navbar />
      </div>

      <div className="home_content">
       
        {/* We map through the history and render the correct component */}
        {chatHistory.map((chat, index) =>
          chat.type === "user" ? (
            <Mymessage key={index} text={chat.text} />
          ) : (
            <Response key={index} text={chat.text} />
          ),
        )}
        {isLoading && <p>Don't disturb let me Think....</p>}
      </div>

      <div className="input_container">
        <textarea ref={prompt_text} placeholder="anything in mind"></textarea>
        <button type="button" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
}

export default Home;
