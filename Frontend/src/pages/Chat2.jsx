import React, { useState } from 'react';
import { FileText, Book, MessageSquare, Clock, Share2, Sun, Moon, Upload} from 'lucide-react';
import axios from 'axios';


// Main App component
const Chat2 = () => {
  const [theme, setTheme] = useState('dark');
  const [history, setHistory] = useState([]);
  const [currentPDF, setCurrentPDF] = useState(null);
  
  const addToHistory = (item) => {
    setHistory(prevHistory => [...prevHistory, item]);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      
      <main className="flex">
        <Sidebar theme={theme} history={history} setCurrentPDF={setCurrentPDF} />
        <PDFAnalysis theme={theme} addToHistory={addToHistory} currentPDF={currentPDF} />
      </main>
    </div>
  );
};



// Sidebar component (updated)
const Sidebar = ({ theme, history, setCurrentPDF }) => {
  return (
    <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4 overflow-y-auto`} style={{height: 'calc(100vh - 64px)'}}>
      <h2 className="font-bold mb-4">History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => setCurrentPDF(item.pdf)}>
            <div className="flex items-center mb-1">
              <FileText className="mr-2" size={16} />
              <span className="font-semibold">{item.pdf}</span>
            </div>
            {item.questions.map((q, qIndex) => (
              <div key={qIndex} className="ml-6 text-sm text-gray-400">
                <MessageSquare className="mr-1 inline" size={12} />
                {q}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </aside>
  );
};

// PDFAnalysis component (updated)
const PDFAnalysis = ({ theme, addToHistory, currentPDF }) => {
  const [pdfName, setPdfName] = useState(currentPDF || 'Upload a PDF');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userQuery, setUserQuery] = useState('');

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setTimeout(async () => {
            try {
              const response = await axios.post('https://skillpathfinder-1.onrender.com/aifeature', file);
              console.log('Pdf Uploaded', response.data);
              // You can update the recommendation page with this data if needed
            } catch (error) {
              console.error('Error uploading the file:', error);
            }
          }, 15000);
      setPdfName(file.name);
      setGeneratedQuestions([
        "What is the main topic of this PDF?",
        "Can you summarize the key points?",
        "Are there any specific terms or concepts I should focus on?"
      ]);
      addToHistory({ pdf: file.name, questions: [] });
    }
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const newQuestion = userQuery.trim();
    if (newQuestion) {
      setChatHistory(prev => [...prev, { type: 'user', content: newQuestion }]);
      setUserQuery('');
      addToHistory({ pdf: pdfName, questions: [newQuestion] });
      
      // Simulating AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'ai', content: 'This is a simulated AI response to your query.' }]);
      }, 1000);
    }
  };

 

  return (
    <section className="flex-grow p-8 overflow-y-auto" style={{height: 'calc(100vh - 64px)'}}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{pdfName}</h1>
        <label className={`cursor-pointer ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white px-4 py-2 rounded flex items-center`}>
          <Upload className="mr-2" size={20} />
          Upload PDF
          <input type="file" className="hidden" onChange={handlePDFUpload} accept=".pdf" />
        </label>
      </div>
      
      {/* Notebook guide section */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-8 shadow-lg`}>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MessageSquare className="mr-2" /> Notebook guide
        </h2>
        {pdfName !== 'Upload a PDF' ? (
          <>
            <p className="mb-4">
              Here are some suggested questions based on the content of {pdfName}:
            </p>
            <ul>
              {generatedQuestions.map((question, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <MessageSquare className="mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Upload a PDF to get started with analysis and suggested questions.</p>
        )}
      </div>

      {/* Chat section */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2" /> Chat History
        </h2>
        <div className="mb-4 h-64 overflow-y-auto">
          {chatHistory.map((entry, index) => (
            <div key={index} className={`mb-2 ${entry.type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
              <strong>{entry.type === 'user' ? 'You: ' : 'AI: '}</strong>{entry.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleQuerySubmit} className="flex">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="What would you like to know?"
            className={`flex-grow ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} p-2 rounded-l`}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat2;