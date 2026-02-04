import mongoose, { Schema, Types } from 'mongoose'

const chatRoomSchema = new Schema(
  {
    isGroup: {
      type: Boolean,
      default: false,
    },
    // this is only for group
    name: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  },
)

chatRoomSchema.index({
  members: 1,
})

const ChatRoom = mongoose.models.ChatRoom || mongoose.model('ChatRoom', chatRoomSchema)

export default ChatRoom
