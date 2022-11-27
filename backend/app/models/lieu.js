const mongoose = require('mongoose');

const lieuSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    pays: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}
);


module.exports = mongoose.model("Lieu", lieuSchema);
