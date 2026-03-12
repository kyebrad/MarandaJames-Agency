import { useState, useRef, useEffect } from 'react';
import { MessageCircleHeart, X, Send, AlertTriangle, Loader2 } from 'lucide-react';
import { ai } from '../lib/gemini';
import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Hello. I am the MarandaJames Agency assistant. How can I support you today? \n\n*If you are in immediate danger, please call 911 or the National Domestic Violence Hotline at 1-800-799-SAFE.*'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat session
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction: "You are a compassionate, helpful, and trauma-informed assistant for MarandaJames Agency, a faith-based women's transitional shelter in Niagara Falls, NY. Provide supportive, safe, and accurate information about our services (housing, case management, life skills, employment, financial literacy, spiritual guidance), intake process, and general help. Keep responses concise, empowering, and empathetic. If someone indicates they are in immediate danger or experiencing acute domestic violence, prioritize telling them to call 911 or the National Domestic Violence Hotline at 1-800-799-SAFE (7233). Do not provide medical or legal advice.",
        }
      });
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I am having trouble connecting right now. Please try again later or call our office directly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-amethyst hover:bg-amethyst-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open support chat"
      >
        <MessageCircleHeart className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-amethyst/20">
          {/* Header */}
          <div className="bg-amethyst p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircleHeart className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg">Support Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Warning Banner */}
          <div className="bg-red-50 p-3 flex items-start gap-2 border-b border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-800 leading-tight">
              <strong>Safety Warning:</strong> This chat is an AI assistant, not a live person. For immediate emergencies, call 911.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-lavender-base/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-olive text-white rounded-br-sm' 
                      : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <div className="markdown-body prose prose-sm prose-a:text-amethyst max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-amethyst animate-spin" />
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-amethyst hover:bg-amethyst-dark text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
