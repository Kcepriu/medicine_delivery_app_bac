import expressAsyncHandler from "express-async-handler";
import mapsServices from "../services/mapServices";

class MapController {
  found_by_location = expressAsyncHandler(async (req: any, res: any) => {
    const adress = await mapsServices.found_by_location({ ...req.query });

    res.status(200).json({ code: 200, data: adress });
  });

  found_by_adress = expressAsyncHandler(async (req: any, res: any) => {
    const location = await mapsServices.found_by_adress({ ...req.query });

    res.status(200).json({ code: 200, data: location });
  });
}

const mapController = new MapController();

export default mapController;
