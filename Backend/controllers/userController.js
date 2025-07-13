const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
  console.log('Received booking data:', req.body);
  console.log('User ID:', req.user.id);
  try {
    const { customerName, address, date, time, serviceId } = req.body;
    const userId = req.user.id;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = await Booking.create({
      customerName,
      address,
      date,
      time,
      serviceId,
      userId,
    });
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.findAll({ where: { userId }, include: [Service] });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { customerName, address, date, time, serviceId, status } = req.body;

    const booking = await Booking.findOne({ where: { id, userId } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or you do not have permission to update this booking' });
    }

    if (serviceId) {
      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
    }

    await booking.update({ customerName, address, date, time, serviceId, status });
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ where: { id, userId } });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or you do not have permission to delete this booking' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};
