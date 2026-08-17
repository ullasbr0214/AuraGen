const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      default: "",
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Required for normal email/password login,
    // but OAuth users do not have a password.
    password: {
      type: String,
      minlength: 6,
      default: null,
    },

    // Authentication provider
    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    // Google/GitHub account ID
    providerId: {
      type: String,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// A provider ID only needs to be unique within its provider.
// Example:
// google + 12345
// github + 12345
// are allowed to coexist.
userSchema.index(
  { authProvider: 1, providerId: 1 },
  {
    unique: true,
    sparse: true,
  }
);

module.exports = mongoose.model("User", userSchema);