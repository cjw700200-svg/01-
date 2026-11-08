import React, { useState } from 'react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello wy19881018! Welcome to Shopee Singapore Support. How can we help you today with your orders, vouchers, or ShopeePay?',
      time: '10:00 AM'
    },
    {
      id: '2',
      sender: 'user',
      text: 'Hi! When will my UGREEN 65W GaN Charger arrive?',
      time: '10:01 AM'
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Your order #SG992341 has been handed to J&T Express Singapore! It is currently out for delivery and will arrive by 3:00 PM today.',
      time: '10:02 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: 'Just now'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Thank you for reaching out! Our official Shopee SG agent is reviewing your inquiry. Feel free to browse our Daily Flash Deals in the meantime!',
        time: 'Just now'
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl h-full bg-[#f5f3f3] flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="bg-[#b22204] text-white p-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/20"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div>
              <h2 className="text-sm font-bold flex items-center gap-1">
                Shopee SG Customer Care
                <span className="material-symbols-outlined text-[14px] text-amber-300">verified</span>
              </h2>
              <span className="text-[10px] text-orange-200">Online · Typically replies instantly</span>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#b22204] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-100'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="bg-white p-2.5 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-xs bg-slate-100 rounded-full px-4 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#b22204]"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#b22204] text-white flex items-center justify-center hover:bg-orange-700 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
