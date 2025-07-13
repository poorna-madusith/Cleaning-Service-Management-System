import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const BookingForm = ({ onSubmit, onCancel, initialData = {}, isEdit = false }) => {
  const [customerName, setCustomerName] = useState(initialData.customerName || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [date, setDate] = useState(initialData.date ? initialData.date.split('T')[0] : '');
  const [time, setTime] = useState(initialData.time || '');
  const [serviceId, setServiceId] = useState(initialData.service ? initialData.service.id : '');
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        if (isMounted) { // Only update state if component is still mounted
          if (Array.isArray(response.data)) {
            setServices(response.data);
          } else {
            console.error('API response for services is not an array:', response.data);
            setError('Failed to load services: Invalid data format.');
          }
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        if (isMounted) { // Only update state if component is still mounted
          setError('Failed to load services.');
        }
      }
    };
    fetchServices();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !address || !date || !time || !serviceId) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit({ customerName, address, date, time, serviceId });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{isEdit ? 'Edit Booking' : 'Add New Booking'}</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
          Customer Name:
        </label>
        <input
          type="text"
          id="customerName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address:
        </label>
        <input
          type="text"
          id="address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
          Time:
        </label>
        <input
          type="time"
          id="time"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
          Service:
        </label>
        <select
          id="service"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEdit ? 'Update Booking' : 'Add Booking'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
