const routes = require("express").Router();
const temples = require("../controllers/temple.js");

routes.get("/", temples.findAll);
routes.get("/:temple_id", temples.findOne);
routes.get("/published", temples.findAllPublished);

routes.post("/", temples.create);
routes.post("/update/:temple_id", temples.update);
routes.post("/delete", temples.deleteAll);
routes.post("/delete/:temple_id", temples.delete);

module.exports = routes;
