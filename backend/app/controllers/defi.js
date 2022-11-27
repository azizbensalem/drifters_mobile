const Defi = require("../models/defi");
const jwt_decode = require("jwt-decode");

// créer un défi (coach)
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
    const defi = new Defi({
      nom: req.body.nom,
      objectif: req.body.objectif,
      lien: req.body.lien,
      periode: req.body.periode,
      joueurs: req.body.joueurs,
      done: req.body.done,
      createdBy: decoded.user_id,
    });

    defi
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

// afficher un défi de joueur par son ID (joueur)
exports.find = async (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  const playerDone = await Defi.findOne({ done: { $in: decoded.user_id } });
  console.log(playerDone);
  Defi.findOne({ _id: req.params.id })
    .then((data) => {
      if (playerDone) {
        res.json({
          _id: data._id,
          nom: data.nom,
          objectif: data.objectif,
          lien: data.lien,
          periode: data.periode,
          done: true,
        });
      } else {
        res.json({
          _id: data._id,
          nom: data.nom,
          objectif: data.objectif,
          lien: data.lien,
          periode: data.periode,
          done: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher un défi de joueur par son ID (joueur)
exports.checkDone = async (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  const playerDone = await Defi.findOne({ done: { $in: decoded.user_id } });
  Defi.findOne({ _id: req.params.id })
    .then(() => {
      if (playerDone) {
        res.json({
          done: true,
        });
      } else {
        res.json({
          done: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les défis du joueurs (joueur)
exports.findAllDefiPlayer = async (req, res) => {
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }

  Defi.find({ joueurs: { $in: [decoded.user_id] } });
  var total = Defi.count();
  Defi.find({ joueurs: { $in: [decoded.user_id] } })
    .populate("joueurs")
    .populate("done")
    .exec()
    .then((data) => {
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", total);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les défis créés par le coach (coach)
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

  Defi.find({ createdBy: decoded.user_id });
  var total = Defi.count();
  Defi.find({ createdBy: decoded.user_id })
    .populate("joueurs")
    .populate("done")
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

// modifier un défi créé par le coach par son ID
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
    Defi.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        nom: req.body.nom,
        object: req.body.object,
        lien: req.body.lien,
        periode: req.body.periode,
        joueurs: req.body.joueurs,
        done: req.body.done,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Defi with id=${id}. Maybe Defi was not found!`,
          });
        } else res.send({ message: "Defi was updated successfully." });
      })
      .catch(() => {
        res.status(500).send({
          message: "Error updating Defi with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// mettre un joueur done dans un défi (joueur)
exports.doneDefi = (req, res) => {
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
    Defi.findOneAndUpdate(
      { _id: req.params.id, joueurs: { $in: [decoded.user_id] } },
      {
        $push: { done: decoded.user_id },
      },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot add player with id=${id}. Maybe Defi was not found!`,
          });
        } else res.send({ message: "Player was added successfully." });
      })
      .catch(() => {
        res.status(500).send({
          message: "Error adding player with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// supprimer un défi créé par le coach par son ID
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
    Defi.findOneAndRemove({ _id: req.params.id, createdBy: decoded.user_id })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Defi with id=${id}. Maybe Defi was not found!`,
          });
        } else {
          res.send({
            message: "Defi was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Defi with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
