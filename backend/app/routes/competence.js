module.exports = (app) => {
  const competence = require("../controllers/competence");
  var router = require("express").Router();

  router.post("/:token", competence.create);

  router.get("/:id/:token", competence.find);

  router.get("/:token", competence.findAll);

  router.put("/:id/:token", competence.update);

  router.delete("/:id/:token", competence.delete);

  router.delete("/:token", competence.deleteAll);

  app.use("/api/competence", router);
};
