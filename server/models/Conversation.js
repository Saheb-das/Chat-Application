// external imports
const { Schema, model } = require("mongoose");

// create schema
const conversationSchema = new Schema(
  {
    conversationName: { type: String },
    creator: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: { type: String },
      avatar: { type: String },
    },

    participant: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: { type: String },
      avatar: { type: String },
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
    isGroup: { type: Boolean, default: false },
    groupAvatar: { type: String },
    groupMembers: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        username: { type: String },
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// create model
const Conversation = model("Conversation", conversationSchema);

// export
module.exports = Conversation;
