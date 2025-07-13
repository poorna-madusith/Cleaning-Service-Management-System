import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ServiceForm from '../../components/Admin/ServiceForm';


const AdminDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchAllBookings();
    fetchServices();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const response = await api.get('/admin/bookings');
      const { bookings } = response.data;
      if (Array.isArray(bookings)) {
        setBookings(bookings);
      } else {
        setBookings(response.data);
      }
    } catch (err) {
      console.error('Error fetching all bookings:', err);
      setError('Failed to load all bookings.');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/admin/services');
      const { services } = response.data;
      if (Array.isArray(services)) {
        setServices(services);
      } else {
        setServices(response.data);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services.');
    }
  };

  

  

  const handleAddService = async (serviceData) => {
    try {
      await api.post('/admin/services', serviceData);
      setShowServiceForm(false);
      fetchServices();
    } catch (err) {
      console.error('Error adding service:', err);
      setError('Failed to add service.');
    }
  };

  const handleEditService = async (serviceData) => {
    try {
      await api.put(`/admin/services/${editingService.id}`, serviceData);
      setEditingService(null);
      setShowServiceForm(false);
      fetchServices();
    } catch (err) {
      console.error('Error updating service:', err);
      setError('Failed to update service.');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/admin/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
        setError('Failed to delete service.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Services</h2>
        <button
          onClick={() => setShowServiceForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Service
        </button>
        {showServiceForm && (
          <ServiceForm
            onSubmit={editingService ? handleEditService : handleAddService}
            initialData={editingService || {}}
            isEdit={!!editingService}
            onCancel={() => { setShowServiceForm(false); setEditingService(null); setError(''); }}
          />
        )}
        {services.length === 0 ? (
          <p className="text-center text-gray-600">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => { setShowServiceForm(true); setEditingService(service); setError(''); }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{booking.Service?.name}</h3>
                <p><strong>Customer:</strong> {booking.customerName}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Price:</strong> ${booking.Service?.price}</p>
                <p><strong>User:</strong> {booking.User?.username} ({booking.User?.email})</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
