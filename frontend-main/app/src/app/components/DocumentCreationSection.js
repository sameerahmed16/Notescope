"use client";

import React, { useState } from "react";

const DocumentCreationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentSubject, setDocumentSubject] = useState("");
  const [documentContent, setDocumentContent] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDocumentCreation = () => {
    console.log(`Creating document: ${documentTitle}`);
    // Redirect to the editor page with title and subject as query parameters
    window.location.href = `./editor?title=${encodeURIComponent(documentTitle)}&subject=${encodeURIComponent(documentSubject)}`;
  };

  return (
    <div className="container mx-auto px-4">
      {/* New Document Button */}
      <div
        className="bg-gradient-to-r from-blue-400  hover:opacity-75 to-blue-600 text-white cursor-pointer py-6 px-4 rounded-lg flex items-center justify-start shadow-lg relative"
        onClick={openModal}
      >
        <span className="text-4xl font-bold text-white mr-4">+</span>
        <span className="text-xl font-semibold">New Note</span>

      </div>

      {/* Description Below the Button */}
      <p className="mt-4 text-gray-500">
        Start a new recording or transcription by clicking the "New Note"
        button. You can easily organize and manage your notes or transcripts in
        this section.
      </p>

      {/* Modal for Creating a New Document */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Note</h2>
            <p className="mb-4">
              Provide a title, subject, and content for your new document to
              begin your recording or transcription. This will help you keep
              track of all your recent notes efficiently.
            </p>

            <input
              type="text"
              placeholder="Document Title"
              className="border border-gray-700 bg-[#ededed] p-2 w-full mb-4 text-black"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Document Subject"
              className="border border-gray-700 bg-[#ededed] p-2 w-full mb-4 text-black"
              value={documentSubject}
              onChange={(e) => setDocumentSubject(e.target.value)}
            />

         
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleDocumentCreation}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentCreationSection;
