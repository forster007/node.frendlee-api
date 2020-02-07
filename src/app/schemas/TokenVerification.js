import mongoose from 'mongoose';

const TokenVerificationSchema = new mongoose.Schema({
  user: {
    required: true,
    type: Number,
  },
  token: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

export default mongoose.model('TokenVerification', TokenVerificationSchema);
