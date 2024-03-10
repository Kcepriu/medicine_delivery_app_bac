import express from "express";
import validateBody from "../middlewapres/validateBody";
import ctrl from "../controllers/devControllers";

import { shemas } from "../models/devModel";

const devRoutes = express.Router();

devRoutes.post(
  "/create_all_data",
  validateBody(shemas.schemaCreate),
  ctrl.create_all_data
);
devRoutes.post(
  "/delete_all_data",
  validateBody(shemas.schemaDelete),
  ctrl.delete_all_data
);

export default devRoutes;
