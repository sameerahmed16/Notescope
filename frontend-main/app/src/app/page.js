"use client";

import React, { useState, useEffect } from "react";
import DocumentGrid from "./components/DocumentGrid";
import Sidebar from "./components/Sidebar";
import DocumentCreationSection from "./components/DocumentCreationSection";
import SearchAndFilter from "./components/SearchAndFilter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]); // State to store documents

  // Fetch documents from local storage
  const fetchDocuments = () => {
    const docs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('document-')) { // Check if the key is a document
        const documentData = JSON.parse(localStorage.getItem(key));
        docs.push(documentData);
      }
    }
    setDocuments(docs);
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents on component mount
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold text-black mb-6">
          Dashboard
        </h2>
      </div>

      {/* Document Creation Section */}
      <DocumentCreationSection />

      {/* Search and Filter Component */}
      <SearchAndFilter
        documents={documents}
        setFilteredDocuments={setDocuments}
      />

      {/* Heading with View All Link */}
      <div className="container flex flex-row justify-between mx-auto mt-8 px-4">
        <div>
          <h1 className="text-2xl font-bold text-black mb-6">
            Recent Documents
          </h1>
        </div>
        <div>
          <a
            href="/documents"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            View All
          </a>
        </div>
      </div>

      {/* Document Grid - Limit to 9 documents */}
      <DocumentGrid
        documents={documents}
        onSelectDocument={setSelectedDocument}
        limit={9}
      />

      {/* Sidebar for the selected document */}
      <Sidebar
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
}
