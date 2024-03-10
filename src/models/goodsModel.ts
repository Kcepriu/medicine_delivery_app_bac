import { model, Schema, Types } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError";
import Joi from "joi";

interface IGood {
  name: string;
  urlPicture: string;
  price: number;
  shop: Types.ObjectId;
  isFavorite: boolean;
}

const goodsSchema = new Schema<IGood>(
  {
    name: {
      type: String,
      required: [true, "DB: Name is required"],
    },
    urlPicture: {
      type: String,
      required: [true, "DB: Url fro Picture is required"],
    },
    price: {
      type: Number,
      required: [true, "DB: price is required"],
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shops",
      required: [true, "DB: shop is required"],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
goodsSchema.post("save", handleMongooseError);

// * Schema Add new shop Joi validation
const schemaAddGood = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  urlPicture: Joi.string().min(10).max(30).required(),
  price: Joi.number().min(0.01).positive().required(),
  shop: Joi.string().min(3).max(30).required(),
  isFavorite: Joi.boolean(),
});

const schemaChangeFavorite = Joi.object({
  isFavorite: Joi.boolean().required(),
});

export const shemas = {
  schemaAddGood,
  schemaChangeFavorite,
};

export const modelGoods = model<IGood>("goods", goodsSchema);
