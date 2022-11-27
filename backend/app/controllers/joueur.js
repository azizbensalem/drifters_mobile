const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordRegex = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})"
);
const jwt_decode = require("jwt-decode");

// inscription joueur
exports.register = async (req, res) => {
  var response = {};
  const token = req.params.token;

  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    response.msg = "Invalid token format";
    res.send(response);
    return true;
  }

  const email = decoded.email;
  const { password, nom, prenom, dateDeNaissance } = req.body;

  if (Math.round(Date.now() / 1000) >= decoded.exp) {
    response.msg = "Token expired";
    res.send(response);
    return true;
  }

  if (!(password && nom && prenom && dateDeNaissance)) {
    response.msg = "All input is required";
    res.send(response);
  } else {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      if (!passwordRegex.test(password)) {
        response.msg = "Unsafe password";
        res.send(response);
        return;
      }

      const user = new User({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: decoded.email,
        password: req.body.password,
        dateDeNaissance: req.body.dateDeNaissance,
        lieuDeNaissance: req.body.lieuDeNaissance,
        //   photoDeProfil: req.file.photoDeProfil,
        telephone: req.body.telephone,
        sexe: req.body.sexe,
        poids: req.body.poids,
        taille: req.body.taille,
        IMC: req.body.IMC,
        main: req.body.main,
        ville: req.body.ville,
        occupation: req.body.occupation,
        typeEtablissement: req.body.typeEtablissement,
        nombreSeance: req.body.nombreSeance,
        prixSeance: req.body.prixSeance,
        etat: req.body.etat,
        coach: decoded.coach_id,
        role: "Joueur",
        lastAuthentication: Date.now(),
      });

      const accessToken = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      await user.save();

      response.msg = "Account created";
      response.data = {
        id: user.id,
        email: user.email,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        dateDeNaissance: user.dateDeNaissance,
        lieuDeNaissance: user.lieuDeNaissance,
        //   photoDeProfil: user.photoDeProfil,
        telephone: user.telephone,
        sexe: user.sexe,
        poids: user.poids,
        taille: user.taille,
        IMC: user.IMC,
        main: user.main,
        ville: user.ville,
        type: user.type,
        typeEtablissement: user.typeEtablissement,
        nombreSeance: user.nombreSeance,
        prixSeance: user.prixSeance,
        etat: user.etat,
        firstAuth: "true",
        role: user.role,
        token: accessToken,
      };
      res.status(200).send(response);
    } else {
      response.msg = "Account already exist. Please Login";
      res.status(400).send(response);
    }
  }
};

// login joueur
exports.login = async (req, res) => {
  var response = {};

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "Joueur" });
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
          password: user.password,
          nom: user.nom,
          prenom: user.prenom,
          dateDeNaissance: user.dateDeNaissance,
          lieuDeNaissance: user.lieuDeNaissance,
          //   photoDeProfil: user.photoDeProfil,
          telephone: user.telephone,
          sexe: user.sexe,
          poids: user.poids,
          taille: user.taille,
          IMC: user.IMC,
          main: user.main,
          ville: user.ville,
          type: user.type,
          typeEtablissement: user.typeEtablissement,
          nombreSeance: user.nombreSeance,
          prixSeance: user.prixSeance,
          etat: user.etat,
          lastAuthentication: user.lastAuthentication,
          firstAuth: "false",
          role: user.role,
          token: accessToken,
        };

        res.status(200).send(response);
      } else {
        response.msg = "Email or password incorrect";
        res.status(400).send(response);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// affichage du profil d'un joueur
exports.showProfile = (req, res) => {
  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Joueur") {
    User.findOne({ _id: decoded.user_id })
      .then((data) =>
        res.json({
          id: data.id,
          email: data.email,
          password: data.password,
          nom: data.nom,
          prenom: data.prenom,
          dateDeNaissance: data.dateDeNaissance,
          lieuDeNaissance: data.lieuDeNaissance,
          //   photoDeProfil: data.photoDeProfil,
          telephone: data.telephone,
          sexe: data.sexe,
          poids: data.poids,
          taille: data.taille,
          IMC: data.IMC,
          main: data.main,
          ville: data.ville,
          type: data.type,
          typeEtablissement: data.typeEtablissement,
          nombreSeance: data.nombreSeance,
          prixSeance: data.prixSeance,
          etat: data.etat,
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

// parametrage du compte joueur
exports.editProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const token = req.params.token;
  var decoded = jwt_decode(token);

  if (decoded.role === "Joueur") {
    User.findOneAndUpdate(
      { _id: decoded.user_id },
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
        typeEtablissement: req.body.typeEtablissement,
        etat: req.body.etat,
      },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update this profile with id=${id} `,
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
        IMC: req.body.IMC,
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
