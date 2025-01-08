import React, { useState } from 'react';
import { MessageCircle, Maximize2, Minimize2, X } from 'lucide-react';

class ExpressClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async post(endpoint: string, body: object, headers: { [key: string]: string } = { 'Content-Type': 'application/json' }): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Status:', response.status, 'Response:', errorText);
        throw new Error(`${response.status} ${response.statusText} - ${errorText}`);
      }

      const responseText = await response.text();
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Request Error:', error);
      throw error;
    }
  }
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([{ text: "Hello! How can I help you?", isUser: false }]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Theme toggle state

  const expressClient = new ExpressClient('http://localhost:3000'); // Replace with your Express backend URL

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await expressClient.post('/chat', { input_value: input });

      if (response && response.message) {
        setMessages(prev => [...prev, { text: response.message, isUser: false }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong. Please try again later.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const toggleTheme = () => setIsDarkMode(!isDarkMode); // Toggle theme function

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed transition-all duration-300 ease-in-out ${isExpanded ? 'right-0 top-0 bottom-0 w-96' : 'bottom-6 right-6 w-96 h-[500px]'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{ zIndex: 9999 }}
        >
          <div className={`rounded-lg shadow-xl h-full flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-t-lg flex items-center justify-between`}>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold`}>Analytics Assistant</h3>
              <div className="flex gap-2">
                <button onClick={toggleExpand} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-10 h-5" />}
                </button>
                <button onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? 'bg-purple-600 text-white' : isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>...</div>
                </div>
              )}
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className={`flex-1 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-purple-300'}`}
                />
                <button
                  onClick={handleSend}
                  className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>

            <div className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} flex justify-center`}>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {isDarkMode ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;