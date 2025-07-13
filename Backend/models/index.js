const User = require('./User');
const Service = require('./Service');
const Booking = require('./Booking');

// Define associations
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Booking, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = {
  User,
  Service,
  Booking,
};
