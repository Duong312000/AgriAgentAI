const mongoose = require('mongoose');

const shippingRouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  originProvince: { type: String, required: true },
  destinationProvince: { type: String, required: true },
  totalDistanceKm: { type: Number },
  estimatedHours: { type: Number },
  scheduleDays: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ShippingRoute', shippingRouteSchema);
