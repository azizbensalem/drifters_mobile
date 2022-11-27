module.exports = (app) => {
  const statistique = require("../controllers/statistique");
  var router = require("express").Router();

  router.post("/:token", statistique.create);

  router.get("/:id/:token", statistique.find);

  router.get("/:token", statistique.findAll);

  router.put("/:id/:token", statistique.update);

  router.delete("/:id/:token", statistique.delete);

  router.delete("/:token", statistique.deleteAll);

  app.use("/api/statistique", router);
};
