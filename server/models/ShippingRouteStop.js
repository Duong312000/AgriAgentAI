const mongoose = require('mongoose');

const shippingRouteStopSchema = new mongoose.Schema({
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingRoute', required: true },
  stopOrder: { type: Number, required: true },
  stopName: { type: String, required: true },
  address: { type: String, required: true },
  stopType: { type: String, enum: ['PICKUP', 'DROPOFF'], default: 'PICKUP' }
}, { timestamps: true });

module.exports = mongoose.model('ShippingRouteStop', shippingRouteStopSchema);
