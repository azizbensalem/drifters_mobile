const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    statistiques: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Statistiques",
    }]
}, {
    timestamps:true
}
);


module.exports = mongoose.model("Discipline", disciplineSchema);
