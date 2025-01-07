import React, { useState } from 'react';
import { MessageCircle, Maximize2, Minimize2, X } from 'lucide-react';

interface FlowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          message: any;
          text: string;
        };
      };
    }>;
  }>;
}

interface Tweaks {
  [key: string]: object;
}

class LangflowClient {
  private baseURL: string;
  private applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint: string, body: object, headers: { [key: string]: string } = { "Content-Type": "application/json" }): Promise<any> {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error);
      throw error;
    }
  }

  async initiateSession(
    flowId: string,
    langflowId: string,
    inputValue: string,
    inputType = 'chat',
    outputType = 'chat',
    stream = false,
    tweaks: Tweaks = {}
  ): Promise<any> {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
  }

  handleStream(streamUrl: string, onUpdate: Function, onClose: Function, onError: Function): EventSource {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = (event) => {
      console.error('Stream Error:', event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose('Stream closed');
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(
    flowIdOrName: string,
    langflowId: string,
    inputValue: string,
    inputType = 'chat',
    outputType = 'chat',
    tweaks: Tweaks = {},
    stream = false,
    onUpdate: Function,
    onClose: Function,
    onError: Function
  ): Promise<FlowResponse> {
    try {
      const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
      console.log('Init Response:', initResponse);
      if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
        const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error('Error running flow:', error);
      onError('Error initiating session');
      throw error;
    }
  }
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([{ text: "Hello! How can I help you with your social media analytics today?", isUser: false }]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', "");
  const flowIdOrName = '5b03c292-95ee-4497-b604-951b57bcb40d';
  const langflowId = '56a72d88-9d75-4b3e-9a7e-b5a8310a9875';

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const tweaks: Tweaks = {
        "File-p5f93": {},
        "AstraDB-3BrL7": {},
        "MistalAIEmbeddings-fdkW0": {},
        "ChatInput-Ev1rP": {},
        "Agent-WBqR3": {},
        "ChatOutput-6inEp": {},
        "Prompt-OwKob": {},
        "AstraDB-V9v0s": {},
        "MistalAIEmbeddings-QMxaF": {},
        "ParseData-KZMDD": {},
        "SplitText-R5yR1": {},
      };

      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        input,
        'chat',
        'chat',
        tweaks,
        false,
        (data: any) => {
          setMessages(prev => [...prev, { text: data.chunk, isUser: false }]);
        },
        (message: string) => {
          setIsLoading(false);
          console.log('Stream closed:', message);
        },
        (error: string) => {
          setIsLoading(false);
          console.log('Stream Error:', error);
        }
      );

      if (response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;

        setMessages(prev => [...prev, { text: output.message.text, isUser: false }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong. Please try again later.', isUser: false }]);
      setIsLoading(false);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
        <div className={`fixed transition-all duration-300 ease-in-out ${isExpanded ? 'right-0 top-0 bottom-0 w-96' : 'bottom-6 right-6 w-96 h-[500px]'}`} style={{ zIndex: 9999 }}>
          <div className="bg-gray-800 rounded-lg shadow-xl h-full flex flex-col">
            <div className="p-4 bg-gray-900 rounded-t-lg flex items-center justify-between">
              <h3 className="text-white font-semibold">Analytics Assistant</h3>
              <div className="flex gap-2">
                <button onClick={toggleExpand} className="text-gray-400 hover:text-white">
                  {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-700 text-white">...</div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
