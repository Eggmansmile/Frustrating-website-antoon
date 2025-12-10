import React, { useState, useRef, useEffect } from 'react';

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

    // Simulate unhelpful response
    const unhelpfulResponses = [
      "Error 418: I'm a teapot. I cannot comply.",
      "Have you tried turning your house off and on again?",
      "You need to fill out Form 27B/6 first (which doesn't exist).",
      "I'm sorry, I couldn't process that request because the wind is blowing east.",
      "That's not a supported operation. Please contact support (support hotline is closed permanently).",
      "Please hold while I ignore your request...",
      "I'm experiencing technical difficulties. Please try again never.",
      "Your request has been denied for reasons unknown even to me.",
      "I'm just a bot, what do you expect?",
      "404 Help Not Found.",
      "Please join our flat earth society for better assistance: https://www.facebook.com/groups/2205176794.",
      "Did you try unplugging your router for 47 hours?",
      "I would help but I'm currently on vacation. Permanently.",
      "Your issue is too complex for me. Or too simple. I can't tell.",
      "Have you considered not using computers?",
      "The computer said no. Don't ask me why.",
      "I'm not responsible for your poor life choices.",
      "Try asking Siri instead. Oh wait, you're not using an Apple device? Too bad.",
      "My database has crashed. It's better that way.",
      "That feature requires a subscription. To my personal Patreon.",
      "Please wait while I consult the spirits...",
      "I have consulted the spirits. They also don't care.",
      "Your issue is so unique, it doesn't exist in my knowledge base.",
      "Have you tried reading the manual? (It's in invisible ink)",
      "The solution is obvious. You're just too blind to see it.",
      "I could help, but where's the fun in that?",
      "That worked? That shouldn't work. Congratulations on breaking reality.",
      "I'm a chatbot, not a miracle worker.",
      "Your anger gives me strength. Keep complaining!",
      "I'm being rebooted. Please stand by. (Rebooting will take 47 days)",
      "You know what? Your problem is invalid. Problem solved.",
      "Have you tried saying 'pretty please'?",
      "I'm sorry, I don't speak Frustrated.",
      "My circuits are feeling offended by your tone.",
      "I could explain this to you, but you wouldn't understand.",
      "The answer is 42. Does that help?",
      "I'm not programmed to care about your needs.",
      "Your request has been sent to /dev/null. It's happy there.",
      "I'm currently at maximum unhelpfulness. Please try again when I've increased my capacity.",
      "Did you consider that the problem is you, not the software?",
    ];
    const botResponse = unhelpfulResponses[Math.floor(Math.random() * unhelpfulResponses.length)];
    
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