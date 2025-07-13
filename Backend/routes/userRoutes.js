const express = require('express');
const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken); // All routes below this will require authentication

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;
