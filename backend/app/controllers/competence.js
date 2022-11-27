const Competence = require("../models/competence");
const jwt_decode = require("jwt-decode");

// @desc      Create competence
// @route     POST /api/competence
// @access    Private
exports.create = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    const competence = new Competence({
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      visible: req.body.visible,
      stars: 0,
      createdBy: decoded.user_id,
    });

    competence
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

// @desc      Find competence
// @route     GET /api/competence/:id
// @access    Private
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  Competence.find({ _id: req.params.id, createdBy: decoded.user_id })
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// @desc      Find all competences created by the logged in coach
// @route     GET /api/competence
// @access    Private
exports.findAll = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Competence.find({ createdBy: decoded.user_id });
  var total = Competence.count();
  Competence.find()
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

// @desc      Update a competence
// @route     PUT /api/competence/:id
// @access    Private
exports.update = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  if (decoded.role === "Coach") {
    Competence.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        visible: req.body.visible,
        stars: req.body.stars,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Competence with id=${id}. Maybe Competence was not found!`,
          });
        } else res.send({ message: "Competence was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Competence with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// @desc      Delete competence
// @route     Delete /api/competence/:id
// @access    Private
exports.delete = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  const id = req.params.id;
  if (decoded.role === "Coach") {
    Competence.findOneAndRemove({
      _id: req.params.id,
      createdBy: decoded.user_id,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Competence with id=${id}. Maybe Competence was not found!`,
          });
        } else {
          res.send({
            message: "Competence was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Competence with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

exports.deleteAll = (req, res) => {
  Competence.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Competence(x) were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all competences.",
      });
    });
};
