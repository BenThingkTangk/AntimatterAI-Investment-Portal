import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Sparkles } from "lucide-react";
import { C1Chat } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";

export default function C1Assistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#00FFB2] to-[#00CC8E] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,178,0.3)] hover:shadow-[0_0_50px_rgba(0,255,178,0.5)] hover:scale-110 transition-all duration-300"
            data-testid="btn-open-ai-assistant"
            aria-label="Open AI Investment Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,178,0.15)] border border-white/10 flex flex-col"
            style={{ background: "#0a0a0a" }}
            data-testid="panel-ai-assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFB2] to-[#00CC8E] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display tracking-wide">
                    ATOM Intelligence
                  </h3>
                  <p className="text-[10px] text-gray-500 tracking-wider uppercase">
                    Powered by Thesys C1 GenUI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                data-testid="btn-close-ai-assistant"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* C1 Chat */}
            <div className="flex-1 overflow-hidden c1-chat-container">
              <C1Chat
                theme={{ mode: "dark" }}
                apiUrl="/api/chat"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
