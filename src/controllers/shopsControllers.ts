import expressAsyncHandler from "express-async-handler";
import shopsServices from "../services/shopsServices";

class ShopsController {
  getAll = expressAsyncHandler(async (_req, res: any) => {
    const shops = await shopsServices.show();

    res.status(200).json({ code: 200, data: shops, qty: shops.length });
  });

  getOne = expressAsyncHandler(async (req, res: any) => {
    const { shopId: id } = req.params;

    const shop = await shopsServices.showOne(id);

    res.status(200).json({ code: 200, data: shop });
  });

  add = expressAsyncHandler(async (req: any, res: any) => {
    const shop = await shopsServices.add({ ...req.body });

    res.status(200).json({ code: 200, data: shop });
  });

  remove = expressAsyncHandler(async (req, res) => {
    const { shopId: id } = req.params;

    const shop = await shopsServices.remove(id);

    res.status(200).json({ code: 200, data: shop });
  });
}

const shopController = new ShopsController();

export default shopController;
