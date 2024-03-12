import { isValidObjectId } from "mongoose";
import RequestError from "../helpers/requestError";
import { modelGoods } from "../models/goodsModel";
import { modelShops } from "../models/shopsModel";
import { createGoodsSortObject } from "../helpers/createSortObject";

class GoodsServices {
  // * show ALL
  show = async (params: any) => {
    const { shop, sort } = params;
    const sortObj = createGoodsSortObject(sort);

    let goods;

    if (shop) {
      //@ts-ignore
      goods = await modelGoods.find({ shop }).sort({ ...sortObj });
    } else {
      //@ts-ignore
      goods = await modelGoods.find({}).sort({ ...sortObj });
    }

    if (!goods) {
      throw RequestError(400, "Unable to fetch Goods");
    }

    return goods;
  };

  // * showOne
  showOne = async (id: any) => {
    if (!isValidObjectId(id)) {
      throw RequestError(400, "Not valid ID");
    }

    const good = await modelGoods.findById(id);

    if (!good) {
      throw RequestError(400, "Unable to find Good");
    }

    return good;
  };

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
  remove = async (id: any) => {
    if (!isValidObjectId(id)) {
      throw RequestError(400, "Not valid ID");
    }

    const good = await modelGoods.findByIdAndDelete(id);

    if (!good) {
      throw RequestError(400, "Unable to find movie");
    }
    return good;
  };

  // * Change IsFavorite
  changeIsFavorite = async (id: any, data: any) => {
    if (!isValidObjectId(id)) {
      throw RequestError(400, "Not valid ID");
    }

    console.log("data", data);

    const good = await modelGoods.findByIdAndUpdate(id, data);

    if (!good) {
      throw RequestError(400, "Unable to find movie");
    }

    return good;
  };
}

const goodsServices = new GoodsServices();
export default goodsServices;
