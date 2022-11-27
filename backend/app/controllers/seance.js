const Seance = require("../models/seance");
const jwt_decode = require("jwt-decode");

// créer une séance (coach)
exports.create = (req, res) => {
  const token = req.params.token;

  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  if (decoded.role === "Coach") {
    const seance = new Seance({
      nom: req.body.nom,
      date: req.body.date,
      periode: req.body.periode,
      lieu: req.body.lieu,
      joueur: req.body.joueur,
      objectif: req.body.objectif,
      programme: req.body.programme,
      annuler: false,
      createdBy: decoded.user_id,
    });

    seance
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error",
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// afficher le détail d'une séance (coach)
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Seance.find({ _id: req.params.id, createdBy: decoded.user_id })
    .populate("lieu")
    .populate("joueur")
    .populate("programme")
    .populate("createdBy")
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les séances créées par le coach (coach)
exports.findAll = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  Seance.find({ createdBy: decoded.user_id });
  var total = Seance.count();
  Seance.find({ createdBy: decoded.user_id })
    .populate("joueur")
    .populate("programme")
    .populate("lieu")
    .exec()
    .then((data) => {
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", total);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// annuler une séance créée par le coach par son ID (coach)
exports.annulerSeance = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  if (decoded.role === "Coach") {
    Seance.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        annuler: req.body.annuler,
        raisonAnnuler: req.body.raisonAnnuler,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Vous ne pouvez pas annuler cette seance avec id=${id}`,
          });
        } else res.send({ message: "Seance annulée" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// annuler une séance créée par le coach par son ID (coach)
exports.feedBackSeance = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  if (decoded.role === "Coach") {
    Seance.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        objectifAtteint: req.body.objectifAtteint,
        feedback: req.body.feedback,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Vous ne pouvez pas donner un feedback dans cette seance avec id=${id}`,
          });
        } else res.send({ message: "Feedback ajouté" });
      })
      .catch(() => {
        res.status(500).send({
          message: "Error with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// modifier une séance créée par le coach par son ID (coach)
exports.update = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  if (decoded.role === "Coach") {
    Seance.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        nom: req.body.nom,
        date: req.body.date,
        periode: req.body.periode,
        lieu: req.body.lieu,
        joueur: req.body.joueur,
        programme: req.body.programme,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Seance with id=${id}. Maybe Seance was not found!`,
          });
        } else res.send({ message: "Seance was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Seance with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// afficher le détail d'une séance (joueur)
exports.findSeancePlayer = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Seance.find({ _id: req.params.id, joueur: decoded.user_id })
    .populate("lieu")
    .populate("joueur")
    .populate("programme")
    .populate("createdBy")
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les séances du joueur (joueur)
exports.findAllSeancePlayer = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }
  Seance.find({ joueur: { $in: decoded.user_id } });
  var total = Seance.count();
  Seance.find({ joueur: { $in: decoded.user_id } })
    .populate("lieu")
    .populate("joueur")
    .populate("programme")
    .populate("createdBy")
    .exec()
    .then((data) => {
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", total);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// @desc      Get all sessions containing the same stat id
// @route     GET /api/coach/stat
// @access    Public(needs to be changed to private)
exports.findValeursStatistique = (req, res) => {
  Seance.find({
    statistiques: { $elemMatch: { stat: req.body.statId } },
  })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// @desc      Get all sessions containing the same competence id
// @route     GET /api/coach/competence
// @access    Public(needs to be changed to private)
exports.findValeursStatistique = (req, res) => {
  Seance.find({
    competences: { $elemMatch: { competence: req.body.competenceId } },
  })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};
