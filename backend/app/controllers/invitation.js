const Invitation = require("../models/invitation");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail");
const jwt_decode = require("jwt-decode");

exports.inviterJoueur = async (req, res) => {
  var response = {};
  const token = req.params.token;
  try {
    var decoded = jwt_decode(token);
  } catch (error) {
    res.send({
      message: "Invalid token format",
    });
    return true;
  }
  const { email, nom, prenom, telephone } = req.body;

  if (!(email && nom && prenom && telephone)) {
    response.code = 1;
    response.msg = "All input is required";
    res.send(response);
  } else {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      const invitation = new Invitation({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        createdBy: decoded.user_id,
      });

      const token = jwt.sign(
        {
          invitation_id: invitation._id,
          email,
          prenom,
          nom,
          telephone,
          coach_id: decoded.user_id,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      invitation.token = token;

      await invitation.save();

      response.code = 0;
      response.msg = "Invitation created!";
      response.data = {
        id: invitation.id,
        email: invitation.email,
        nom: invitation.nom,
        prenom: invitation.prenom,
        telephone: invitation.telephone,
        token: invitation.token,
      };
      res.send(response);
      sendEmail(
        invitation.email,
        "Invitation",
        `Invitation Joueur:
          
          http://localhost:3000/joueur/register/${invitation.token}`
      );
    } else {
      response.code = 2;
      response.msg = "Account already exist";
      res.send(response);
    }
  }
};
