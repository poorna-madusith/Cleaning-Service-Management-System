import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import BookingForm from '../../components/Bookings/BookingForm';

const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/users/bookings');
      const { bookings } = response.data;
      if (Array.isArray(bookings)) {
        setBookings(bookings);
      } else {
        setBookings(response.data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings.');
    }
  };

  const handleAddBooking = async (bookingData) => {
    try {
      await api.post('/users/bookings', bookingData);
      setShowForm(false);
      fetchBookings();
    } catch (err) {
      console.error('Error adding booking:', err);
      setError('Failed to add booking.');
    }
  };

  const handleEditBooking = async (bookingData) => {
    try {
      await api.put(`/users/bookings/${editingBooking.id}`, bookingData);
      setEditingBooking(null);
      setShowForm(false);
      fetchBookings();
    } catch (err) {
      console.error('Error editing booking:', err);
      setError('Failed to edit booking.');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/users/bookings/${id}`);
        fetchBookings();
      } catch (err) {
        console.error('Error deleting booking:', err);
        setError('Failed to cancel booking.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <button
        onClick={() => { setShowForm(true); setEditingBooking(null); setError(''); }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Booking
      </button>

      {showForm && (
        <div className="mb-8">
          <BookingForm
            onSubmit={editingBooking ? handleEditBooking : handleAddBooking}
            initialData={editingBooking || {}}
            isEdit={!!editingBooking}
            onCancel={() => { setShowForm(false); setEditingBooking(null); setError(''); }}
          />
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{booking.Service.name}</h3>
              <p><strong>Customer:</strong> {booking.customerName}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Price:</strong> ${booking.Service.price}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => { setEditingBooking(booking); setShowForm(true); setError(''); }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
