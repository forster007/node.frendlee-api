import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      required: true,
      type: String,
    },
    read: {
      default: false,
      required: true,
      type: Boolean,
    },
    user: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', NotificationSchema);
