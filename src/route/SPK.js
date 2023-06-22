const express = require("express");
const {
  create_SPK,
  getall_SPK,
  getDetail_SPK,
  getByUser,
  update_SPK,
} = require("../controller/SPK");
const checkToken = require("../middleware/checkToken");
const isAdmin = require("../middleware/isAdmin");
const SPK_Route = express.Router();
//ADMIN
SPK_Route.post("/spk", isAdmin, create_SPK);
SPK_Route.get("/spk", checkToken, getall_SPK);
//user
SPK_Route.get("/spk/user", checkToken, getByUser);
SPK_Route.get("/spk/:id", checkToken, getDetail_SPK);
SPK_Route.put("/spk/update/:id", checkToken, update_SPK);

module.exports = SPK_Route;
