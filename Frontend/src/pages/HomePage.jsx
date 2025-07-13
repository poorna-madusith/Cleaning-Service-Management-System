import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Cleaning Service Management</h1>
      <p className="text-lg text-gray-600">Your one-stop solution for managing cleaning bookings.</p>
      <div className="mt-8">
        <img src="../public/clean.png" alt="Cleaning Service" className="w-60 h-60 mx-auto bg-transparent" />
      </div>
    </div>
  );
};

export default HomePage;
