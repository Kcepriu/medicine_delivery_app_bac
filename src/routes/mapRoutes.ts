import express from "express";
import ctrl from "../controllers/mapControllers";

const mapRoutes = express.Router();

mapRoutes.get("/by_location", ctrl.found_by_location);
mapRoutes.get("/by_adress", ctrl.found_by_adress);

export default mapRoutes;
