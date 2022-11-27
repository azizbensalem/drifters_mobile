const mongoose = require("mongoose");

const defiSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    objectif: {
      type: String,
      // required: true,
    },
    lien: {
      type: String,
      // required: true,
    },
    periode: {
      type: String,
      // required: true,
    },
    joueurs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    done: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Defi", defiSchema);
