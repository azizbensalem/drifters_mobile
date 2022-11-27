module.exports = (app) => {
  const programme = require("../controllers/programme");
  var router = require("express").Router();

  router.post("/:token", programme.create);
  router.get("/:id/:token", programme.find);
  router.get("/:token", programme.findAll);
  router.get("/", programme.progList);
  router.put("/:id/:token", programme.update);
  router.delete("/:id/:token", programme.delete);

  app.use("/api/coach/programme", router);
};
