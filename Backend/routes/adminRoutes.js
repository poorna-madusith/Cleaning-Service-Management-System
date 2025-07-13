const express = require('express');
const { createService, getAllServices, updateService, deleteService, getAllBookings } = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole(['admin'])); // All routes below this will require admin role

// Service Management Routes
router.post('/services', createService);
router.get('/services', getAllServices);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Booking Management Routes (Admin View)
router.get('/bookings', getAllBookings);

module.exports = router;
