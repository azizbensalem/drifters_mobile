const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    lieu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lieu",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    interesse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      // required: true,
    },
    public: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evenement", evenementSchema);
