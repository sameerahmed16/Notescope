"use client";

import React, { useState } from "react";

const SearchAndFilter = ({ documents, setFilteredDocuments }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterDocuments(value);
  };

  const filterDocuments = (term) => {
    if (term === "" || !term) {
      setFilteredDocuments(documents);
      return;
    }
    
    let filtered = documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(term) ||
        (doc.summary && doc.summary.toLowerCase().includes(term))
    );

    setFilteredDocuments(filtered);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 text-black pt-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or summary..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 mb-4 md:mb-0 p-3 rounded-xl border border-blue-700"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
