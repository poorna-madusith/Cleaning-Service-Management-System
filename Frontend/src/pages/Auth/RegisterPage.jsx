import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (username, email, password) => {
    const success = await register(username, email, password);
    if (success) {
      navigate('/login'); // Redirect to login after successful registration
    } else {
      setError('Registration failed. User might already exist.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
};

export default RegisterPage;
