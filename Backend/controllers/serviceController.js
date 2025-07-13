const Service = require('../models/Service');

exports.getPublicServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public services', error: error.message });
  }
};
