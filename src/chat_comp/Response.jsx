import "./chat_style.css";
function Response({text}) {
  return (
    <div className="res">
      <div className="res_text">{
        text
        }</div>
    </div>
  );
}
export default Response;
