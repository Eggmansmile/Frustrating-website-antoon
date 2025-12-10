import React, { useState, useRef, useEffect } from 'react';
import { getUnhelpfulResponse } from '../services/geminiService';

export const UnhelpfulChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I see you're struggling. I'm here to make it worse." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const botResponse = await getUnhelpfulResponse(userText);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-hurt-pink text-white p-4 rounded-full shadow-lg border-4 border-yellow-400 animate-bounce hover:bg-red-500 z-50 font-bold"
      >
        Need "Help"? 🤡
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border-4 border-hurt-pink shadow-2xl z-50 flex flex-col font-comic">
      <div className="bg-hurt-pink text-white p-2 flex justify-between items-center font-bold">
        <span>Useless Support</span>
        <button onClick={() => setIsOpen(false)} className="text-xl hover:text-black">X</button>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 bg-gray-100 flex flex-col gap-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded max-w-[80%] ${m.role === 'user' ? 'bg-blue-200 self-end' : 'bg-pain-yellow self-start border border-black'}`}>
            {m.text}
          </div>
        ))}
        {isTyping && <div className="text-gray-500 text-sm animate-pulse">Ignorning your request...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-2 border-t-2 border-hurt-pink flex">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Complain here..."
          className="flex-1 p-1 border border-gray-400 focus:outline-none focus:border-red-500"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-2 hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
};