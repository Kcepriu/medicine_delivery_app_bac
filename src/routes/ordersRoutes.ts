import express from "express";
import validateBody from "../middlewapres/validateBody";
import ctrl from "../controllers/ordersControllers";

import { shemas } from "../models/orderModel";

const routerOrder = express.Router();

routerOrder.get("/", ctrl.getAll);
routerOrder.get("/:orderId", ctrl.getOne);
routerOrder.post("/", validateBody(shemas.schemaAddOrder), ctrl.add);
routerOrder.delete("/:orderId", ctrl.remove);

export default routerOrder;
