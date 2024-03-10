import express from "express";
import ctrl from "../controllers/shopsControllers";
import validateBody from "../middlewapres/validateBody";
import { shemas } from "../models/shopsModel";

const routerShops = express.Router();

routerShops.get("/", ctrl.getAll);
routerShops.get("/:shopId", ctrl.getOne);
routerShops.post("/", validateBody(shemas.schemaAddShop), ctrl.add);
routerShops.delete("/:shopId", ctrl.remove);

export default routerShops;
