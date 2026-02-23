
import "./chat_style.css";

function ThinkingAnimation() {
  return (
    <div className="thinking_container flex items-center gap-2">
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
