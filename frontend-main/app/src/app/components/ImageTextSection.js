"use client";

import React from "react";

const ImageTextSection = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <div className="flex flex-col md:flex-row justify-between bg-white p-6 rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/assets/notescopepic.jpg"
            alt="Placeholder"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 md:pl-8 text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Effortlessly Organize Your Notes
          </h2>
          <p className="text-gray-600 mb-4">
            With Notescope, managing your lecture transcriptions and notes has
            never been easier. Quickly find the information you need with our
            advanced search features and customizable filters. Our platform
            helps you stay on top of your studies by providing a seamless,
            organized experience tailored to your workflow.
          </p>
          <p className="text-gray-600">
            Join us today and see how Notescope can enhance your productivity
            and help you manage your academic content effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTextSection;
