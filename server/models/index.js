// Xuất toàn bộ Mongoose Models cho toàn bộ 27 bảng/thực thể trong Đặc tả CSDL AgriAgentAI

const User = require('./User');
const UserOtp = require('./UserOtp');
const UserAddress = require('./UserAddress');

const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const VoiceUploadLog = require('./VoiceUploadLog');
const AiPricingLog = require('./AiPricingLog');
const MarketPriceBenchmark = require('./MarketPriceBenchmark');

const Order = require('./Order');
const OrderReturn = require('./OrderReturn');
const OrderReturnImage = require('./OrderReturnImage');

const ShippingRoute = require('./ShippingRoute');
const ShippingRouteStop = require('./ShippingRouteStop');
const ShippingPool = require('./ShippingPool');

const PaymentTransaction = require('./PaymentTransaction');
const FarmerWallet = require('./FarmerWallet');
const PayoutRequest = require('./PayoutRequest');

const ChatRoom = require('./ChatRoom');
const ChatParticipant = require('./ChatParticipant');
const ChatMessage = require('./ChatMessage');

const Voucher = require('./Voucher');
const Notification = require('./Notification');
const ProductReview = require('./ProductReview');
const Banner = require('./Banner');

module.exports = {
  User,
  UserOtp,
  UserAddress,
  Category,
  Product,
  ProductImage,
  VoiceUploadLog,
  AiPricingLog,
  MarketPriceBenchmark,
  Order,
  OrderReturn,
  OrderReturnImage,
  ShippingRoute,
  ShippingRouteStop,
  ShippingPool,
  PaymentTransaction,
  FarmerWallet,
  PayoutRequest,
  ChatRoom,
  ChatParticipant,
  ChatMessage,
  Voucher,
  Notification,
  ProductReview,
  Banner
};
