const mongoose = require("mongoose");

const seanceSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    periode: {
      type: String,
      required: true,
    },
    lieu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lieu",
    },
    joueur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    statistiques: [
      {
        stat: { type: mongoose.Schema.Types.ObjectId, ref: "Statistiques" },
        value: { type: Number },
      },
    ],
    competences: [
      {
        competence: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Competences",
        },
        value: { type: Number },
      },
    ],
    objectifsStatistiques: [
      {
        stat: { type: mongoose.Schema.Types.ObjectId, ref: "Statistiques" },
        value: { type: Number },
      },
    ],
    objectifsCompetences: [
      {
        competence: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Competences",
        },
        name: { type: String },
      },
    ],
    objectifAtteint: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: String,
    },
    annuler: {
      type: Boolean,
      default: false,
    },
    raisonAnnuler: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    programme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Programme",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seance", seanceSchema);
