import "./chat_style.css";
function Mymessage({text}) {
  return (
    <div className="prompt">
      <div className="my_text">
        {text}
      </div>
    </div>
  );
}
export default Mymessage;
