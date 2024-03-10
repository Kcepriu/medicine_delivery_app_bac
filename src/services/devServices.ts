import { isValidObjectId } from "mongoose";
import RequestError from "../helpers/requestError";
import { modelGoods } from "../models/goodsModel";
import { modelShops } from "../models/shopsModel";
import { modelOrder } from "../models/orderModel";

class DevServices {
  // * Add
  add = async (data: any) => {
    const { shop: shopId } = data;
    if (!isValidObjectId(shopId)) {
      throw RequestError(400, "Not valid Shop ID");
    }

    const shop = await modelShops.findById(shopId);

    if (!shop) {
      throw RequestError(400, "Unable to find Goods");
    }

    const good = await modelGoods.create(data);

    if (!good) {
      throw RequestError(400, "Unable to save in DataBase");
    }

    return good;
  };

  // * Remove
  removeAllGoods = async () => {
    const res = await modelGoods.deleteMany({});
    return res.deletedCount;
  };

  removeAllShops = async () => {
    const res = await modelShops.deleteMany({});
    return res.deletedCount;
  };

  removeAllOrders = async () => {
    const res = await modelOrder.deleteMany({});
    return res.deletedCount;
  };
}

const devServices = new DevServices();
export default devServices;
