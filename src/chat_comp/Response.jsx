import ReactMarkdown from "react-markdown";
import "./chat_style.css";

function Response({ text }) {
  return (
    <div className="res">
      <div className="res_text">
        {/* This is the magic wand that fixes the mess */}
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Response;
