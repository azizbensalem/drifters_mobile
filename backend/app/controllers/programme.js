const Programme = require("../models/programme");
const jwt_decode = require("jwt-decode");

// créer un programme
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
    const programme = new Programme({
      title: req.body.title,
      description: req.body.description,
      src: req.body.src,
      video: req.body.video,
      createdBy: decoded.user_id,
    });

    programme
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

// afficher un programme créé par le coach par son ID
exports.find = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  Programme.find({ _id: req.params.id, createdBy: decoded.user_id })
    .populate("createdBy")
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

// afficher tous les programmes créés par le coach
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

  Programme.find({ createdBy: decoded.user_id });
  var total = Programme.count();
  Programme.find({ createdBy: decoded.user_id })
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

// afficher tous les programmes
exports.progList = (req, res) => {
  Programme.find();
  var total = Programme.count();
  Programme.find()
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

// modifier un programme créé par le coach par son ID
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
    Programme.findOneAndUpdate(
      { _id: req.params.id, createdBy: decoded.user_id },
      {
        title: req.body.title,
        description: req.body.description,
        src: req.body.src,
        video: req.body.video,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Programme with id=${id}. Maybe Programme was not found!`,
          });
        } else res.send({ message: "Programme was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Programme with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// supprimer un programme créé par le coach par son ID
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
    Programme.findOneAndRemove({
      _id: req.params.id /* user: decoded.user_id */,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Programme with id=${id}. Maybe Programme was not found!`,
          });
        } else {
          res.send({
            message: "Programme was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete Programme with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
