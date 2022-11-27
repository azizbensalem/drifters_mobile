const Lieu = require("../models/lieu");
const jwt_decode = require("jwt-decode");

// créer un lieu
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
    const lieu = new Lieu({
      nom: req.body.nom,
      ville: req.body.ville,
      pays: req.body.pays,
      adresse: req.body.adresse,
      createdBy: decoded.user_id,
    });

    lieu
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

// afficher un lieu créé par le coach par son ID
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Lieu.find({ _id: req.params.id, createdBy: decoded.user_id })
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les lieux créés par le coach
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

  Lieu.find({ createdBy: decoded.user_id });
  var total = Lieu.count();
  Lieu.find({ createdBy: decoded.user_id })
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

// afficher tous les lieux
exports.findAllPublic = (req, res) => {
  Lieu.find();
  var total = Lieu.count();
  Lieu.find()
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

// modifier un lieu créé par le coach par son ID
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
    Lieu.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        nom: req.body.nom,
        ville: req.body.ville,
        pays: req.body.pays,
        adresse: req.body.adresse,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Lieu with id=${id}. Maybe Lieu was not found!`,
          });
        } else res.send({ message: "Lieu was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Lieu with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// supprimer un lieu créé par le coach par son ID
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
    Lieu.findOneAndRemove({ _id: req.params.id, createdBy: decoded.user_id })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Lieu with id=${id}. Maybe Lieu was not found!`,
          });
        } else {
          res.send({
            message: "Lieu was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Lieu with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
