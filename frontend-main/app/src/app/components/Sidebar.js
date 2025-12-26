"use client";

import React from "react";

const Sidebar = ({ document, onClose, onDelete }) => {
  if (!document) return null;

  return (
    <div className="fixed right-0 top-0 w-96 bg-white text-black h-full shadow-lg z-50 flex flex-col p-8">
      <div className="text-left">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &#10005; {/* This renders the 'X' character */}
        </button>

        {/* Document Title */}
        <h2 className="text-3xl font-bold mb-4">{document.name}</h2>

        {/* Document Subheading */}
        <h3 className="text-xl font-semibold text-black mb-4">
          <span className="font-bold text-gray-600 text-md">Title: </span>
          {document.title}
          <br></br>
          <span className="text-sm text-gray-500">
            Date Created: {new Date().toLocaleDateString()}
          </span>
        </h3>

        {/* Document Summary Content */}
        <h2 className="text-lg font-bold text-gray-600">Your Summary:</h2>
        <p className="text-black mb-6">
          {document.summary || "No summary"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-4 mt-auto">
        <button
          className="w-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => window.location.href = `/view?id=${document.id}`}
        >
          Open
        </button>
        <button
          className="w-1/2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          onClick={() => {
            // Remove the document from localStorage
            localStorage.removeItem(`document-${document.id}`);
            // Call the onDelete function to update the UI
window.location.reload()
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
