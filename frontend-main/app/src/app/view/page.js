"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';


export default function DocumentViewerPage() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get('id'); // Get the 'id' query parameter
  const [document, setDocument] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [chatInput, setChatInput] = useState(''); // State for chat input

  useEffect(() => {
    if (documentId) {
      // Fetch the document from local storage using the documentId
      const documentData = JSON.parse(localStorage.getItem(`document-${documentId}`));
      if (documentData) {
        setDocument(documentData);
      }
    }
  }, [documentId]);

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
          body: JSON.stringify({ question: chatInput, documentContent: document.content }),
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

  if (!document) {
    return <div>Loading...</div>; // Show a loading state while fetching the document
  }

  return (
    <div>
      <div className={`text-white text-xl px-32 py-4 w-full flex bg-gradient-to-br from-blue-400 to-indigo-500`}>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 
              contentEditable 
              className='hover:bg-neutral-100/50' 
            >
              {document.title}
            </h1> 
          </div>
          <div className='ml-auto text-sm flex items-center'>
            <button 
              className={`mr-2 px-4 text-sm pointer duration-400 transition py-1 rounded-full border`}
              onClick={() => setIsDialogOpen(true)} // Open dialog on click
            >
              <i className='fa fa-message mr-2'></i>
              Chat with Document
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen mt-4 p-6 max-w-7xl px-20 mx-auto">
        <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
        <p className="mb-4"><ReactMarkdown>{document.content}</ReactMarkdown></p>
      </div>

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
                          <p className="text-sm">{message.text}</p>
                        </div>
                      ))}
                    </div>
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
    </div>
  );
}
