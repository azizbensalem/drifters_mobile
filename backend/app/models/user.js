const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, 'Email must be valid "example@example.com" '],
      unique: [true, "This email is already used"],
    },
    password: {
      type: String,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    photoDeProfil: {
      type: String,
    },
    telephone: {
      type: Number,
    },
    sexe: {
      type: String,
      enum: ["Homme", "Femme", "Non binaire"],
    },
    dateDeNaissance: {
      type: String,
      // required: true,
    },
    lieuDeNaissance: {
      type: String,
    },
    poids: {
      type: Number,
    },
    taille: {
      type: String,
    },
    IMC: {
      type: Number,
    },
    main: {
      type: String,
      enum: ["Droitier", "Gaucher"],
    },
    ville: {
      type: String,
    },
    occupation: {
      type: String,
      enum: ["Élève", "Étudiant", "Salarié"],
    },
    typeEtablissement: {
      type: String,
      enum: ["Public", "Privée", "Mission", "Autres"],
    },
    nombreSeance: {
      type: Number,
    },
    prixSeance: {
      type: Number,
    },
    etat: {
      type: String,
      enum: ["Actif", "Non actif"],
    },
    abonnement: {
      type: String,
      enum: ["Free", "Basic", "Premium"],
      default: "Free",
    },
    role: {
      type: String,
      enum: ["Coach", "Joueur"],
    },
    lastAuthentication: {
      type: Date,
    },
    discipline: {
      type: String,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
