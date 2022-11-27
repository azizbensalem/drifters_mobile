const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, 'Email must be valid "example@example.com" '],
    },
    telephone: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val.toString().length >= 10 && val.toString().length <= 14;
        },
        message: `Phone number must be valid`,
      },
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invitation", invitationSchema);
