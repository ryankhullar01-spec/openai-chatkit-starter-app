import { useMemo, useState, CSSProperties } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const chatkit = useChatKit({
    api: { getClientSecret },
    theme: {
      colorScheme: "light",
      radius: "round",
      typography: {
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      },
    },
    header: { enabled: true },
    composer: { placeholder: "Message BennieBot..." },
    startScreen: { enabled: true },
  });

  const [house, setHouse] = useState("default");

  const houseThemes: Record<string, string> = {
    default: "#4D277B",
    mackillop: "#A5CB7E",
    hildegard: "#1F7DFF",
    ingham: "#766BE9",
    norcia: "#EF985A",
    polding: "#F6CB65",
    dharawal: "#FF4C1F",
  };

  const purple = "#4D277B";
  const accent = houseThemes[house];

  const rootVars: CSSProperties = {
    ["--bb-purple" as string]: purple,
    ["--bb-accent" as string]: accent,
    ["--bb-third-color" as string]: house === "default" ? "#faf7ff" : accent,
    ["--bb-glow-color" as string]: accent,
    ["--bb-scrollbar-thumb" as string]: accent,
    ["--bb-shadow-strong" as string]: "0 18px 45px rgba(0,0,0,0.18)",
    ["--bb-shadow-medium" as string]: "0 14px 32px rgba(0,0,0,0.16)",
    ["--bb-shadow-light" as string]: "0 10px 24px rgba(0,0,0,0.16)",
    ["--bb-transition-fast" as string]: "0.18s ease",
    ["--bb-transition-medium" as string]: "0.25s ease",
  };

  return (
    <>
      <style>
        {`
/* GLOBAL RESET */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* BACKGROUND ENGINE */
.bb-background {
  background: linear-gradient(
    135deg,
    var(--bb-purple) 0%,
    var(--bb-accent) 50%,
    var(--bb-third-color) 100%
  );
  background-size: 400% 400%;
  animation: bbGradientDrift 14s ease-in-out infinite;
}
@keyframes bbGradientDrift {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

/* HEADER GLOW */
.bb-header-glow-wrapper {
  position: relative;
}
.bb-header-glow-wrapper::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: calc(100% + 16px);
  background: radial-gradient(
    circle at center,
    var(--bb-glow-color) 0%,
    transparent 70%
  );
  opacity: 0.22;
  filter: blur(28px);
  animation: bbGlowPulse 5.2s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes bbGlowPulse {
  0% { opacity: 0.18; transform: scale(0.95); }
  50% { opacity: 0.32; transform: scale(1.05); }
  100% { opacity: 0.18; transform: scale(0.95); }
}

/* MESSAGE ANIMATION */
.ck-message {
  animation: bbMessageIn 0.22s ease-out;
  transform-origin: bottom;
}
@keyframes bbMessageIn {
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* TYPING INDICATOR */
.ck-typing-indicator {
  display: flex !important;
  gap: 4px !important;
  padding: 6px 10px !important;
  margin-left: 6px !important;
  opacity: 0;
  animation: bbTypingFadeIn 0.4s ease forwards;
}
@keyframes bbTypingFadeIn {
  to { opacity: 1; }
}
.ck-typing-indicator-dot {
  width: 7px !important;
  height: 7px !important;
  background: var(--bb-accent) !important;
  border-radius: 50% !important;
  animation: bbTypingBounce 1.2s infinite ease-in-out;
}
.ck-typing-indicator-dot:nth-child(2) { animation-delay: 0.15s; }
.ck-typing-indicator-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bbTypingBounce {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(-4px); opacity: 1; }
}

/* SCROLLBARS */
.ck-chat-scrollable {
  scrollbar-width: thin;
  scrollbar-color: var(--bb-scrollbar-thumb) transparent;
}
.ck-chat-scrollable::-webkit-scrollbar { width: 6px; }
.ck-chat-scrollable::-webkit-scrollbar-thumb {
  background: var(--bb-scrollbar-thumb);
  border-radius: 10px;
  opacity: 0;
  transition: opacity var(--bb-transition-medium);
}
.ck-chat-scrollable:hover::-webkit-scrollbar-thumb {
  opacity: 0.8;
}

/* HISTORY PANEL */
.ck-history-panel {
  animation: bbHistoryFadeIn 0.35s ease;
  padding: 10px !important;
}
@keyframes bbHistoryFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* COMPOSER */
.ck-composer {
  border-radius: 9999px !important;
  transition:
    box-shadow var(--bb-transition-medium),
    border-color var(--bb-transition-medium),
    background-color var(--bb-transition-medium);
}
.ck-composer:focus-within {
  box-shadow: 0 0 0 2px var(--bb-accent);
  border-color: var(--bb-accent) !important;
  background-color: #faf7ff !important;
}

/* BUTTONS */
.ck-button {
  border-radius: 9999px !important;
  transition:
    transform var(--bb-transition-fast),
    box-shadow var(--bb-transition-medium),
    background-color var(--bb-transition-medium),
    color var(--bb-transition-medium);
}
.ck-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
}
.ck-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
}

/* LAYOUT */
.bb-header-animate {
  animation: bbHeaderSlideIn 0.9s ease-out forwards;
  opacity: 0;
  transform: translateX(-20px);
  position: relative;
  z-index: 2;
}
@keyframes bbHeaderSlideIn {
  to { opacity: 1; transform: translateX(0); }
}
.bb-gold-slide {
  animation: bbGoldSlideIn 0.9s ease-out forwards;
  transform: scaleX(0);
  transform-origin: left;
}
@keyframes bbGoldSlideIn {
  to { transform: scaleX(1); }
}
.bb-chat-fade {
  animation: bbChatFadeUp 1.1s ease-out forwards;
  opacity: 0;
  transform: translateY(18px);
}
@keyframes bbChatFadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* FIX: Lavender chat background (new ChatKit classes) */
.ck-chat,
.ck-chat-wrapper,
.ck-chat-container,
.ck-chat-scrollable,
.ck-chat-root {
  background: #faf7ff !important;
}

/* FIX: Outgoing bubble always purple (new ChatKit classes) */
.ck-message--outgoing,
.ck-message--outgoing .ck-message-bubble,
.ck-message--outgoing * {
  background-color: var(--bb-accent) !important;
  color: white !important;
}

/* FIX: Smooth glow for house selector */
.bb-house-select {
  transition:
    box-shadow var(--bb-transition-medium),
    transform var(--bb-transition-medium),
    opacity var(--bb-transition-medium);
}
.bb-house-select:hover {
  box-shadow: 0 0 14px var(--bb-accent) !important;
  transform: scale(1.02);
  opacity: 1;
}

/* RESPONSIVE */
.bb-card {
  box-shadow: var(--bb-shadow-strong);
}
@media (max-width: 768px) {
  .bb-card { box-shadow: var(--bb-shadow-medium); }
}
@media (max-width: 640px) {
  .bb-card { box-shadow: var(--bb-shadow-light); }
}
.bb-chat-shell { height: 70vh; }
@media (max-width: 1024px) { .bb-chat-shell { height: 66vh; } }
@media (max-width: 768px) { .bb-chat-shell { height: 62vh; } }
@media (max-width: 480px) { .bb-chat-shell { height: 58vh; } }

body { overflow-x: hidden; }
`}
      </style>

      <div
        className="flex h-screen w-full items-center justify-center p-3 sm:p-4 md:p-6 bb-background"
        style={rootVars}
      >
        <div className="w-full max-w-4xl bb-card rounded-xl md:rounded-2xl border-2 md:border-4 border-[#4D277B] bg-white overflow-hidden flex flex-col">

          {/* HEADER */}
          <div className="bb-header-glow-wrapper">
            <div className="px-2 py-1 flex items-center justify-between bg-[#4D277B] bb-header-animate">
              <div className="flex items-center gap-1">
                <div className="p-[1px] bg-white rounded-full">
                  <img
                    src="/benniebot-logo.png"
                    alt="BennieBot Logo"
                    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                  />
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white ml-1">
                  BennieBot
                </h1>
              </div>

              <select
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                className="bb-house-select text-xs sm:text-sm text-[#4D277B] bg-white rounded-lg px-2 sm:px-3 py-1 shadow border border-[#E5E5E5] max-w-[52%] sm:max-w-none"
              >
                <option value="default">Default (Purple)</option>
                <option value="mackillop">Mackillop (Green)</option>
                <option value="hildegard">Hildegard (Blue)</option>
                <option value="ingham">Ingham (Purple)</option>
                <option value="norcia">Norcia (Orange)</option>
                <option value="polding">Polding (Yellow)</option>
                <option value="dharawal">Dharawal (Red)</option>
              </select>
            </div>
          </div>

          {/* GOLD UNDERLINE */}
          <div className="h-1.5 md:h-2 w-full bg-[#F8D685] bb-gold-slide" />

          {/* CHAT AREA */}
          <div className="bb-chat-shell bb-chat-fade">
            <ChatKit
              control={chatkit.control}
              className="
                h-full w-full
                [&_.ck-message-out]:text-white
                [&_.ck-message-out]:rounded-full
                [&_.ck-message-out]:shadow-md
                [&_.ck-message-out]:px-4
                [&_.ck-message-out]:py-2
                [&_.ck-message-in]:bg-white
                [&_.ck-message-in]:text-[#4D277B]
                [&_.ck-message-in]:border
                [&_.ck-message-in]:border-[#E5E5E5]
                [&_.ck-message-in]:rounded-xl
                [&_.ck-message-in]:shadow-sm
                [&_.ck-message-in]:px-4
                [&_.ck-message-in]:py-2
                [&_.ck-message-group]:my-3
              "
              style={{
                ["--ck-message-out-bg" as string]: `${accent} !important`,
                ["--ck-accent-color" as string]: accent,
                ["--ck-accent-color-hover" as string]: accent,
                ["--ck-accent-color-active" as string]: accent,
              }}
            />
          </div>

          {/* FOOTER */}
          <div className="py-2 sm:py-3 text-center text-xs sm:text-sm text-[#4D277B] opacity-70 bg-white border-t border-[#E5E5E5]">
            Powered by BennieBot — St Benedict's Catholic College
          </div>
        </div>
      </div>
    </>
  );
}
