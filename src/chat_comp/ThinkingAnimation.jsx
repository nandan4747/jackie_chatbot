import "./chat_style.css";

function ThinkingAnimation() {
  return (
    <div className="thinking_container flex items-center gap-2">
      <div style={{
        marginLeft:"4px",
        alignSelf:"center",
        color:"#434343"
      }}>
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
          class="lucide lucide-bot-icon lucide-bot"
        >
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </div>
      <div className="thinking_svg">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gray-500"
        >
          {/* Dot 1 */}
          <circle cx="5" cy="12" r="1" className="animate-dot delay-1" />
          {/* Dot 2 */}
          <circle cx="12" cy="12" r="1" className="animate-dot delay-2" />
          {/* Dot 3 */}
          <circle cx="19" cy="12" r="1" className="animate-dot delay-3" />
        </svg>
      </div>
    </div>
  );
}
export default ThinkingAnimation;
