const mongoose = require("mongoose");

const competencesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seance",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Competences", competencesSchema);
