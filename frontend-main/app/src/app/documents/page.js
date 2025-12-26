"use client";

import React, { useState, useEffect } from "react";
import DocumentGrid from "../components/DocumentGrid"; // Import DocumentGrid
import Sidebar from "../components/Sidebar"; // Import Sidebar
import SearchAndFilter from "../components/SearchAndFilter"; // Import SearchAndFilter

export default function DocumentsPage() {
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
    <div className="bg-white text-white min-h-screen mt-5">
      {/* Search and Filter Component */}
      <SearchAndFilter
        documents={documents}
        setFilteredDocuments={setDocuments}
      />

      {/* Document Grid - Show filtered documents */}
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold !text-black mb-6">All Documents</h1>
      </div>
      <DocumentGrid
        documents={documents}
        onSelectDocument={setSelectedDocument}
        limit={10000}
      />
      <Sidebar
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
}
