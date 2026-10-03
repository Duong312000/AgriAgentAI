const mongoose = require('mongoose');

const shippingPoolSchema = new mongoose.Schema({
  poolCode: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  originProvince: { type: String, required: true },
  destinationProvince: { type: String, required: true },
  driverName: String,
  driverPhone: String,
  licensePlate: String,
  truckType: String,
  maxCapacityKg: { type: Number, required: true },
  currentWeightKg: { type: Number, default: 0 },
  departureTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['COLLECTING', 'FULL', 'DEPARTED', 'COMPLETED'], 
    default: 'COLLECTING' 
  }
}, { timestamps: true });

module.exports = mongoose.model('ShippingPool', shippingPoolSchema);
