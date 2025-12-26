"use client"
import { useState, useEffect } from 'react';
// import markdown viewer
import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Create() {
   
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [contentPreview, setContentPreview] = useState('');
  const [realTimeTranscription, setRealTimeTranscription] = useState('');
  const [textColor, setTextColor] = useState('text-yellow-400');

  const [snippets, setSnippets] = useState([]); // Change snippet to snippets array

  // Add a state to trigger animation
  const [animateSnippets, setAnimateSnippets] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get('title') || 'LECTURE';
  const subject = searchParams.get('subject') || 'documents/lecture12';

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [chatInput, setChatInput] = useState(''); // State for chat input

  const handleTitleChange = (event) => {
    const newTitle = event.target.innerText;
    const params = new URLSearchParams(searchParams);
    params.set('title', newTitle);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setRealTimeTranscription((prev) => {
              const newContent = prev + event.results[i][0].transcript;
              setTextColor('text-yellow-400'); // Set text color to yellow
              setTimeout(() => setTextColor('text-green-400'), 2000); // Change to green after 2 seconds
              return newContent;
            });
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      setRecognition(speechRecognition);
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRecording) { // Check if recording is true
        const words = realTimeTranscription.split(' ');
        const lastFiftyWords = words.slice(-50).join(' ');
        // Check if there are at least 10 words
        if (words.length >= 10) {
          fetch('http://localhost:3001/api/ai/generate-snippet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: lastFiftyWords, markdown: contentPreview.slice(-200) }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Generated Snippet:', data.response);
            setSnippets((prevSnippets) => [data.response, ...prevSnippets]); // Add new snippet to top of stack
          })
          .catch(error => {
            console.error('Error generating snippet:', error);
          });
        }
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [realTimeTranscription, isRecording]);

  useEffect(() => {
    if (snippets.length > 0) {
      setAnimateSnippets(true);
      const timer = setTimeout(() => setAnimateSnippets(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [snippets]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === 'Enter') { // Check for Command + Enter
        if (snippets.length > 0) {
          handleInsertSnippet(snippets[0]); // Insert the first snippet
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup on component unmount
    };
  }, [snippets]);

  const handleToggleRecording = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleTextareaChange = (event) => {
    setContentPreview(event.target.value);
  };

  const handleInjectMarkdown = () => {
    setContentPreview((prev) => prev + realTimeTranscription);
    setRealTimeTranscription(''); // Clear the real-time transcription after injecting
  };

  const handleEditorChange = ({ text }) => {
    setContentPreview(text);
  };

  const handleInsertSnippet = (snippet) => {
    setContentPreview((prev) => prev + '\n' + snippet);
  };

  const handleSaveDocument = async () => {
    const documentId = uuidv4(); // Generate a unique ID
    const documentData = {
      id: documentId,
      title,
      content: contentPreview,
    };

    // Save the document data to local storage
    localStorage.setItem(`document-${documentId}`, JSON.stringify(documentData));
    console.log('Document saved:', documentData);

    // Show a toast notification

    // Hit the summary endpoint
    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown: contentPreview }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Summary:', data.summary);

        // Store the summary in local storage
        const documentWithSummary = {
          ...documentData,
          summary: data.summary,
        };
        localStorage.setItem(`document-${documentId}`, JSON.stringify(documentWithSummary));
        console.log('Document with summary saved:', documentWithSummary);
        toast.success('Document saved successfully!');

      } else {
        toast.error('Error saving!');

        console.error('Internal Error');
      }
    } catch (error) {
    toast.error('Error saving!');
      console.error('Error hitting summary endpoint:', error);
    }
  };

  const toggleSidebar = () => {
    console.log('Sidebar toggled');
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const newMessage = { id: uuidv4(), text: chatInput, sender: 'user' };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatInput('');

      try {
        // Send the chat input and document content to the backend
        const response = await fetch('http://localhost:3001/api/ai/chat-with-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: chatInput, documentContent: contentPreview }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data.response);

        // Add AI response to chat messages
        const aiResponse = { id: uuidv4(), text: data.response, sender: 'ai' };
        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error('Error chatting with document:', error);
      }
    }
  };

  return (
    <>
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
      <div className={`text-white text-xl px-32 py-4 w-full flex bg-gradient-to-br from-blue-400 to-indigo-500 ${isRecording ? 'border-t-4 border-red-500 pulse-red' : ''}`}>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 
              contentEditable 
              className='hover:bg-neutral-100/50' 
              onBlur={handleTitleChange}
            >
              {title}
            </h1> 
            <p className='text-sm'><i className='fa fa-folder'></i> {subject}</p> 
          </div>
          <div className='ml-auto text-sm flex items-center'>
            <button 
              onClick={handleToggleRecording} 
              className={`mr-2 px-4 text-sm pointer duration-400 transition py-1 rounded-full  ${isRecording ? 'border bg-red-900 border-red-800 hover:bg-red-800' : 'bg-gray-900 border-gray-400 hover:bg-gray-800'}`}
            >
              <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i> {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <button 
              className={`mr-2 px-4 text-sm pointer duration-400 transition py-1 rounded-full border`}
              onClick={() => setIsDialogOpen(true)} // Open dialog on click
            >
              <i className='fa fa-message mr-2'></i>
              Chat with Document
            </button>

            <button 
              className={`mr-2 px-4 text-sm bg-white text-blue-500 pointer duration-400 transition py-1 rounded-full border`}
              onClick={handleSaveDocument}>
              <i className='fa fa-save mr-2'></i>
              Save
            </button>
          </div>
        </div>
      </div>

      <main className='bg-neutral-200 mx-auto' data-color-mode="light">
        <div className='grid grid-cols-2 '>
         <div className=' bg-white shadow-lg px-8 py-4 ' >
         <p className='uppercase font-bold text-sm text-black'>REAL TIME TRANSCRIPTION</p>

         <p className={`bg-white ${textColor} border border-neutral-300 px-4 py-3 relative overflow-hidden`}>
              {realTimeTranscription.split(' ').slice(-10).join(' ')}
              <span className="sound-wave"></span>

            </p>


         
         
         <p className='uppercase font-bold text-sm mt-2 text-black'>EDITOR</p>

         <MdEditor
         className=''
           style={{ height: 'calc(100vh - 190px)' }} // Adjust height to fit within the div
           value={contentPreview}
           onChange={handleEditorChange}
           renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
           config={{
             view: {
               menu: true,
               md: true,
               html: false // Hide the preview
             },
             theme: 'light' // Set the theme to light
           }}
         />


<br></br>
<br></br>
            
       </div>


<div className='px-4 mt-10'>
<div className='bg-white shadow-xl px-4 py-2  overflow-y-auto' style={{
    height: 'calc(99vh - 190px)' // Set a fixed height, e.g., 500px
}}>
  <div className='markdown bg-white px-2 py-4 text-black'>
    <ReactMarkdown>{contentPreview}</ReactMarkdown>

<div className={`bg-white text-white ${animateSnippets ? 'animate-fade-in' : ''}`}>
    <p className='px-2 hidden'>
    noscope
    </p>
    <div className='bg-white text-black px-2 py-2 relative text-pink-500/50 border-t border-dash'>

      {snippets.length > 0 && (
        <div className='mb-2'>
          <ReactMarkdown value={snippets[0]} className='w-full'>{snippets[0]}</ReactMarkdown>
          <button 
            onClick={() => handleInsertSnippet(snippets[0])} 
            className='mt-4 bg-black-500 px-3 justify-center align-center items-center text-sm bg-black py-1 text-white hover:bg-black-600 rounded-full cursor-pointer'
          >
            Insert <span style={{
                fontFamily: "Consolas, 'Courier New', monospace"
            }} className='border text-xs rounded-md text-black px-2 bg-gray-200  '>⌘ + Enter</span>
          </button>
        </div>
      )}
      {snippets.length <= 0 && (
        <p className='text-black px-2 text-lg italic text-sm'><i className='fa fa-star mr-1'></i>Start writing for snippets to appear!</p>
      )}
      
    </div>
    </div>


  </div>
</div>

       </div>
        </div>
      
      </main>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onClose={setIsDialogOpen} className="relative z-10">
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Chat with AI</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setIsDialogOpen(false)}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="flex flex-col space-y-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
                          <p className="text-sm"><ReactMarkdown>{message.text}</ReactMarkdown></p>
                        </div>
                      ))}
                    </div>
                    {/* Move this div to the bottom */}
                    <div className="mt-4 flex absolute bottom-0 left-0 right-0 p-4 bg-white">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 border border-gray-300 rounded-md p-2"
                        placeholder="Type a message..."
                      />
                      <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}