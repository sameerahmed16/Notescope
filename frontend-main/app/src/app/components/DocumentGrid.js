"use client";

import React from "react";

// Helper function to truncate the summary text
const truncateSummary = (summary, wordLimit) => {
  const words = summary.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return summary;
};

// Function to parse date strings into Date objects
const parseDate = (dateString) => {
  return new Date(dateString);
};

// DocumentGrid Component
const DocumentGrid = ({ documents, onSelectDocument, limit }) => {
  // Sort documents from newest to oldest by default
  const sortedDocuments = documents.sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );

  // If there's a limit, only display the first 'limit' documents
  const displayDocs = limit ? sortedDocuments.slice(0, limit) : sortedDocuments;

  return (
    <div className="container mx-auto mt-2 px-4">
      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayDocs.length > 0 ? (
          displayDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-lg shadow-lg border text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectDocument(doc)}
            >
              <h2 className="text-xl font-bold">{doc.title}</h2>
              <p className="text-gray-400">Created: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">{doc.summary && truncateSummary(doc.summary, 20)}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentGrid;
