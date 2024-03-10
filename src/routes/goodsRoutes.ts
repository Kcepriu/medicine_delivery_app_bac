import express from "express";
import validateBody from "../middlewapres/validateBody";
import ctrl from "../controllers/goodsControllers";

import { shemas } from "../models/goodsModel";

const routerGoods = express.Router();

routerGoods.get("/", ctrl.getAll);
routerGoods.get("/:goodId", ctrl.getOne);
routerGoods.patch(
  "/changeFavorite/:goodId",
  validateBody(shemas.schemaChangeFavorite),
  ctrl.changeIsFavorite
);
routerGoods.post("/", validateBody(shemas.schemaAddGood), ctrl.add);
routerGoods.delete("/:goodId", ctrl.remove);

export default routerGoods;
