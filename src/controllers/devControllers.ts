import expressAsyncHandler from "express-async-handler";

import fs from "fs/promises";
import path from "path";

import RequestError from "../helpers/requestError";
import goodsServices from "../services/goodsServices";
import shopsServices from "../services/shopsServices";
import devServices from "../services/devServices";

interface IGoods {
  name: string;
  urlPicture: string;
  price: number;
}

interface IShop {
  name: string;
  location: string;
  adress: string;
  goods: IGoods[];
}

class DevController {
  protected initialDataPath = path.join(
    __dirname,
    "..",
    "testDB",
    "testData.json"
  );

  protected createTestData = async () => {
    const initialData = await this.readTestData();

    for (const shopWithGoods of initialData) {
      // Create shop
      const shopId = await this.createShops(shopWithGoods);

      const { goods } = shopWithGoods;

      for (const article of goods) {
        await this.createGoods(shopId, article);
      }
    }
  };

  protected readTestData = async (): Promise<IShop[]> => {
    console.log("initialDataPath", this.initialDataPath);

    const data = await fs.readFile(this.initialDataPath, "utf8");
    return JSON.parse(data);
  };

  protected createShops = async (data: IShop): Promise<string> => {
    const { goods, ...shop } = data;
    const newShop = await shopsServices.add(shop);

    return String(newShop._id);
  };

  protected createGoods = async (shop: string, goods: IGoods) => {
    await goodsServices.add({ shop, ...goods });
  };

  create_all_data = expressAsyncHandler(async (req: any, res: any) => {
    const { isCreate } = req.body;
    if (!isCreate) {
      throw RequestError(400, 'Missing parameter "isCreate"');
    }
    await this.createTestData();

    res.status(201).json({ code: 201, message: "Test data created" });
  });

  delete_all_data = expressAsyncHandler(async (req, res) => {
    const { isDelete } = req.body;
    if (!isDelete) {
      throw RequestError(400, 'Missing parameter "isDelete"');
    }
    const count_orders = await devServices.removeAllOrders();
    const count_goods = await devServices.removeAllGoods();
    const count_shops = await devServices.removeAllShops();

    res.status(200).json({ code: 200, count_orders, count_goods, count_shops });
  });
}

const devController = new DevController();

export default devController;
