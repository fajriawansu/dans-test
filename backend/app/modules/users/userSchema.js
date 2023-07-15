const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userId: {
      type: ObjectId,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      lowercase: false,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "users")

module.exports = {
  User
};
