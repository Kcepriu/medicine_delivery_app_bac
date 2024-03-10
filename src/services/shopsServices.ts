import { isValidObjectId } from "mongoose";
import RequestError from "../helpers/requestError";
import { modelShops } from "../models/shopsModel";

class ShopsServices {
  // * show ALL
  show = async () => {
    const shops = await modelShops.find({});
    if (!shops) {
      throw RequestError(400, "Unable to fetch shops");
    }

    return shops;
  };

  // * showOne
  showOne = async (id: any) => {
    if (!isValidObjectId(id)) {
      throw RequestError(400, "Not valid ID");
    }

    const shop = await modelShops.findById(id);

    if (!shop) {
      throw RequestError(400, "Unable to find Shop");
    }

    return shop;
  };

  // * add
  add = async (data: any) => {
    // const shop: IShop | null = (await modelShops.create(
    //   data
    // )) as Promise<IShop | null>;

    const shop = await modelShops.create(data);

    if (!shop) {
      throw RequestError(400, "Unable to save in DataBase");
    }

    return shop;
  };

  // * remove
  remove = async (id: any) => {
    if (!isValidObjectId(id)) {
      throw RequestError(400, "Not valid ID");
    }

    const shop = await modelShops.findByIdAndDelete(id);

    if (!shop) {
      throw RequestError(400, "Unable to find movie");
    }
    return shop;
  };
}

const shopsServices = new ShopsServices();
export default shopsServices;
