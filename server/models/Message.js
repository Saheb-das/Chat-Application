// external imports
const { Schema, model } = require("mongoose");

// create schema
const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
    },
    sender: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: { type: String, required: true },
      avatar: { type: String },
    },
    receiver: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: { type: String },
      avatar: { type: String },
    },

    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  { timestamps: true }
);

// creare model
const Message = model("Message", messageSchema);

// export
module.exports = Message;
