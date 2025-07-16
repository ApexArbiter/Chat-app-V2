import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniqure: true,
    },
    email: {
      type: String,
      required: true,
      uniqure: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModal = mongoose.models.Users || mongoose.model("User", userSchema);

export default UserModal;
