const Evenement = require("../models/evenement");
const jwt_decode = require("jwt-decode");

// créer un évenement
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
    const evenement = new Evenement({
      nom: req.body.nom,
      date: req.body.date,
      lieu: req.body.lieu,
      participants: req.body.participants,
      description: req.body.description,
      public: req.body.public,
      createdBy: decoded.user_id,
    });

    evenement
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

// afficher un évenement créé par le coach par son ID
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Evenement.find({ _id: req.params.id, createdBy: decoded.user_id })
    .populate("lieu")
    .populate("participants")
    .populate("createdBy")
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher un évenement  par son ID (joueur)

exports.findOneEventPlayer = (req, res) => {
  // const token = req.params.token;
  // var decoded = jwt_decode(token);

  Evenement.find({ _id: req.params.id })
    .populate("lieu")
    .populate("participants")
    .populate("createdBy")
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les évenements créés par le coach

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

  Evenement.find({ createdBy: decoded.user_id });
  var total = Evenement.count();
  Evenement.find({ createdBy: decoded.user_id })
    .populate("lieu")
    .populate("participants")
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

// afficher tous les évenements (joueur)

exports.findAllEventPlayer = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  Evenement.find();
  var total = Evenement.count();
  Evenement.find()
    .populate("lieu")
    .populate("participants")
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

// modifier un évenement créé par le coach par son ID
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
    Evenement.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        nom: req.body.nom,
        date: req.body.date,
        lieu: req.body.lieu,
        participants: req.body.participants,
        description: req.body.description,
        public: req.body.public,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Evenement with id=${id}. Maybe Evenement was not found!`,
          });
        } else res.send({ message: "Evenement was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Evenement with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// participer à un événement
exports.eventParticipate = (req, res) => {
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

  if (decoded.role === "Joueur") {
    Evenement.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          participants: decoded.user_id,
        },
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot participate with id=${id}. Maybe Evenement was not found!`,
          });
        } else res.send({ message: "participated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error",
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// etre intéresser par un événement
exports.eventInterest = (req, res) => {
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

  if (decoded.role === "Joueur") {
    Evenement.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          interesse: decoded.user_id,
        },
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot participate with id=${id}. Maybe Evenement was not found!`,
          });
        } else res.send({ message: "interested" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error",
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// ne pas participer à un événement
exports.eventNoParticipate = (req, res) => {
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

  if (decoded.role === "Joueur") {
    Evenement.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          participants: decoded.user_id,
        },
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot participate with id=${id}. Maybe Evenement was not found!`,
          });
        } else res.send({ message: "not participated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error",
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// supprimer un évenement créé par le coach par son ID
exports.delete = (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  const id = req.params.id;

  if (decoded.role === "Coach") {
    Evenement.findOneAndRemove({
      _id: req.params.id,
      createdBy: decoded.user_id,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Evenement with id=${id}. Maybe Evenement was not found!`,
          });
        } else {
          res.send({
            message: "Evenement was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Evenement with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
