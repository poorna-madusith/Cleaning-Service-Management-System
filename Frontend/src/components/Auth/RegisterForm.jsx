import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, error, usernameError, emailError, passwordError, onValidationErrors }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let valid = true;

    if (!username) {
      errors.username = 'Username is required.';
      valid = false;
    }

    if (!email) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid email format.';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    if (!valid) {
      onValidationErrors(errors);
      return;
    }

    onValidationErrors({}); // Clear previous errors on successful validation
    onSubmit(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {usernameError && <p className="text-red-500 text-center mb-4">{usernameError}</p>}
      {emailError && <p className="text-red-500 text-center mb-4">{emailError}</p>}
      {passwordError && <p className="text-red-500 text-center mb-4">{passwordError}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {usernameError && <p className="text-red-500 text-xs italic">{usernameError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
