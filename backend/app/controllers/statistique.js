const Statistique = require("../models/statistiques");
const jwt_decode = require("jwt-decode");

// @desc      Create statistique
// @route     POST /api/statistique
// @access    Private
exports.create = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    const statistique = new Statistique({
      nom: req.body.nom,
      description: req.body.description,
      type: req.body.type,
      unite: req.body.unite,
      objectif: req.body.objectif,
      lien: req.body.lien,
      visible: req.body.visible,
      createdBy: decoded.user_id,
    });

    statistique
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

// @desc      Find statistique
// @route     GET /api/statistique/:id
// @access    Private
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  Statistique.find({ _id: req.params.id, createdBy: decoded.user_id })
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// @desc      Find all statistics created by the logged in coach
// @route     GET /api/statistique
// @access    Private
exports.findAll = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Statistique.find({ createdBy: decoded.user_id });
  var total = Statistique.count();
  Statistique.find()
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

// @desc      Update a statistic
// @route     PUT /api/statistique/:id
// @access    Private
exports.update = (req, res) => {
  console.log("hey up stater");
  const token = req.params.token;
  console.log(token);
  var decoded = jwt_decode(token);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  if (decoded.role === "Coach") {
    Statistique.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        nom: req.body.nom,
        description: req.body.description,
        type: req.body.type,
        unite: req.body.unite,
        objectif: req.body.objectif,
        lien: req.body.lien,
        visible: req.body.visible,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Statistique with id=${id}. Maybe Statistique was not found!`,
          });
        } else res.send({ message: "Statistique was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Statistique with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// @desc      Delete statistique
// @route     Delete /api/statistique/:id
// @access    Private
exports.delete = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  const id = req.params.id;
  if (decoded.role === "Coach") {
    Statistique.findOneAndRemove({
      _id: req.params.id /* user: decoded.user_id */,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Statistique with id=${id}. Maybe Statistique was not found!`,
          });
        } else {
          res.send({
            message: "Statistique was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Statistique with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

exports.deleteAll = (req, res) => {
  Statistique.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Statistique(x) were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all statistics.",
      });
    });
};
