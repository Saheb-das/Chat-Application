// external imports
const { Schema, model } = require("mongoose");

// create user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: [6, "password is too short"],
    },
    favorites: [
      {
        conversationId: {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
        },
        name: { type: String },
        avatar: { type: String },
      },
    ],
    singleChats: [
      {
        conversationId: {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
        },
        name: { type: String },
        avatar: { type: String },
      },
    ],
    groups: [
      {
        conversationId: {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
        },
        name: { type: String },
        avatar: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// create model
const User = model("User", userSchema);

// exports
module.exports = User;
