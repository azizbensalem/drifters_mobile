const mongoose = require('mongoose');

const statistiquesSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Compteur', 'Timer'],
        required: true
    },
    unite: {
        type: String,
        required: true
    },
    objectif: {
        type: String,
        enum: ['Max', 'Min'],
        required: true
    },
    lien: {
        type: String,
        // required: true
    },
    visible: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps:true
}
);


module.exports = mongoose.model("Statistiques", statistiquesSchema);
