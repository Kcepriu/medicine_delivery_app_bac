import { model, Schema } from "mongoose";
import { modelGoods } from "./goodsModel";
import handleMongooseError from "../helpers/handleMongooseError";
import Joi from "joi";

interface IShop {
  name: string;
  location: string;
  adress: string;
}

interface IError extends Error {
  status: number;
}

const schemaShops = new Schema<IShop>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "DB: Name is required"],
    },
    location: {
      type: String,
      required: [true, "DB: location is required"],
    },
    adress: {
      type: String,
      required: [true, "DB: adress is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

schemaShops.post("save", handleMongooseError);

// TODO Винести в модуль
schemaShops.pre(
  ["deleteOne", "deleteMany", "findOneAndDelete"],
  async function (next: any) {
    const id = this.getQuery()._id;
    const productsCount = await modelGoods.countDocuments({ shop: id });

    if (productsCount > 0) {
      const error = new Error(
        "The table Goods contains data that refers to this object"
      ) as IError;
      error.status = 400;
      next(error);
    } else {
      next();
    }
  }
);

// * Schema Add new shop Joi validation
const schemaAddShop = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  location: Joi.string().min(3).max(30).required(),
  adress: Joi.string().min(3).max(30).required(),
});

export const shemas = {
  schemaAddShop,
};

export const modelShops = model<IShop>("shops", schemaShops);
