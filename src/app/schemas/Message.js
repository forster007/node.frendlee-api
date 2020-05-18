import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    appointment_id: { required: true, type: Number },
    messages: [
      {
        text: { type: String },
        user: {
          _id: { type: Number },
          email: { type: String },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Message', MessageSchema);
