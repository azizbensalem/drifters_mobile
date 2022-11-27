const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordRegex = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})"
);
const jwt_decode = require("jwt-decode");

// inscription coach
exports.register = async (req, res) => {
  var response = {};

  const { email, password, nom, prenom } = req.body;

  if (!(email && password && nom && prenom)) {
    response.msg = "All input is required";
    res.status(400).send(response);
  } else {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      if (!passwordRegex.test(password)) {
        response.msg = "Unsafe password";
        res.status(400).send(response);
        return;
      }
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        nom: req.body.nom,
        prenom: req.body.prenom,
        dateDeNaissance: req.body.dateDeNaissance,
        photoDeProfil: req.body.photoDeProfil,
        role: "Coach",
        lastAuthentication: Date.now(),
      });

      const accessToken = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      await user.save();

      response.msg = "Account created!";
      response.data = {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        dateDeNaissance: user.dateDeNaissance,
        photoDeProfil: user.photoDeProfil,
        lastAuthentication: user.lastAuthentication,
        token: accessToken,
      };
      res.send(response);
    } else {
      response.msg = "Account already exist. Please Login";
      res.status(400).send(response);
    }
  }
};

// login coach
exports.login = async (req, res) => {
  var response = {};
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "Coach" });
    if (user != null) {
      user.lastAuthentication = Date.now();
      if (await bcrypt.compare(password, user.password)) {
        response.msg = "Account found";
        const accessToken = jwt.sign(
          { user_id: user._id, email, role: user.role },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        response.data = {
          id: user.id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,
          abonnement: user.abonnement,
          lastAuthentication: user.lastAuthentication,
          token: accessToken,
        };
        res.send(response);
      } else {
        response.msg = "Email or password incorrect";
        res.status(400).send(response);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc      Find all players trained by the logged in coach
// @route     GET /api/playerslist
// @access    Private
exports.playersList = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.find({ coach: decoded.user_id })
      .then((data) => res.json(data))
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

// affichage du profil d'un coach
exports.showProfile = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOne({ _id: decoded.user_id })
      .then((data) =>
        res.json({
          // id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          dateDeNaissance: data.dateDeNaissance,
          abonnement: data.abonnement,
          photoDeProfil: data.photoDeProfil,
        })
      )
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

// abonnement du compte coach
exports.abonnement = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOneAndUpdate(
      { _id: decoded.user_id },
      {
        abonnement: req.body.abonnement,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Abonnement nom payé avec id=${id} `,
          });
        } else res.send({ message: "Abonnement payé" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error abonnement avec id= " + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// parametrage du compte coach
exports.editProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOneAndUpdate(
      { _id: decoded.user_id },
      {
        $set: {
          email: req.body.email,
          nom: req.body.nom,
          prenom: req.body.prenom,
          dateDeNaissance: req.body.dateDeNaissance,
          photoDeProfil: req.body.photoDeProfil,
        },
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update this profile with id= ${id} `,
          });
        } else res.send({ message: "Profile updated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating profile with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// ajouter un discipline au compte coach
exports.addDiscipline = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOneAndUpdate(
      { _id: decoded.user_id },
      {
        discipline: req.body.discipline,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update this profile with id= ${id} `,
          });
        } else res.send({ message: "Profile updated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating profile with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// modifier joueur (coach)
exports.editPlayer = (req, res) => {
  console.log("u called edit player :D");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  const id = req.params.id;

  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOneAndUpdate(
      { _id: id },
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        dateDeNaissance: req.body.dateDeNaissance,
        lieuDeNaissance: req.body.lieuDeNaissance,
        email: req.body.email,
        telephone: req.body.telephone,
        sexe: req.body.sexe,
        poids: req.body.poids,
        taille: req.body.taille,
        main: req.body.main,
        ville: req.body.ville,
        prixSeance: req.body.prixSeance,
        typeEtablissement: req.body.typeEtablissement,
        etat: req.body.etat,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update this player with id=${id} `,
          });
        } else res.send({ message: "Player updated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating player with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// @desc      Find all players trained by the logged in coach
// @route     GET /api/playerslist
// @access    Private
exports.editPlayer = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  const id = req.params.id;

  var decoded = jwt_decode(token);

  if (decoded.role === "Coach") {
    User.findOneAndUpdate(
      { _id: id },
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        dateDeNaissance: req.body.dateDeNaissance,
        lieuDeNaissance: req.body.lieuDeNaissance,
        telephone: req.body.telephone,
        sexe: req.body.sexe,
        poids: req.body.poids,
        taille: req.body.taille,
        main: req.body.main,
        ville: req.body.ville,
        type: req.body.type,
        typeEtablissement: req.body.typeEtablissement,
        nombreSeance: req.body.nombreSeance,
        prixSeance: req.body.prixSeance,
        etat: req.body.etat,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update this player with id=${id} `,
          });
        } else res.send({ message: "Player updated" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating player with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// @desc      Delete a player
// @route     Delete /api/deletePlayer/:id/:token
// @access    Private
exports.deletePlayer = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);
  const id = req.params.id;
  if (decoded.role === "Coach") {
    User.findOneAndRemove({
      _id: req.params.id,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete player with id=${id}. Maybe player was not found!`,
          });
        } else {
          res.send({
            message: "player was deleted successfully!",
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete player with id=" + id,
        });
      });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
