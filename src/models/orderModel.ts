import Joi from "joi";
import { model, Schema, Types, Document } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError";

interface IDocumentGoods {
  goods: Types.ObjectId;
  count: number;
  sum: number;
  price: number;
}
interface IOrder extends Document {
  name: string;
  shop: Types.ObjectId;
  email: string;
  phone: string;
  location: string;
  adress: string;
  sum: number;
  goodsDocument: IDocumentGoods[];
}

const phoneRegExp =
  /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schemaGoodsDocument = new Schema<IDocumentGoods>({
  goods: {
    type: Schema.Types.ObjectId,
    ref: "goods",
    required: [true, "DB: goods is required"],
  },
  count: { type: Number, default: 0 },
  sum: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "DB: price is required"],
  },
});

const schemaOrders = new Schema<IOrder>(
  {
    name: {
      type: String,
      required: [true, "DB: Name is required"],
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shops",
      required: [true, "DB: shop is required"],
    },

    phone: {
      type: String,
      match: phoneRegExp,
      required: [true, "DB: phone is required"],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, "DB: email is required"],
    },

    location: {
      type: String,
      required: [true, "DB: location is required"],
    },
    adress: {
      type: String,
      required: [true, "DB: adress is required"],
    },

    sum: {
      type: Number,
      default: 0,
    },

    goodsDocument: { type: [schemaGoodsDocument], required: true },
  },
  { versionKey: false, timestamps: true }
);

schemaOrders.post("save", handleMongooseError);

// * Schema Add new shop Joi validation
const schemaAddOrder = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  shop: Joi.string().min(3).max(100).required(),
  phone: Joi.string().min(3).max(100).pattern(phoneRegExp).required(),
  email: Joi.string().min(3).max(100).pattern(emailRegExp).required(),
  location: Joi.string().min(3).max(100).required(),
  adress: Joi.string().min(3).max(300).required(),
  sum: Joi.number().min(0).positive().required(),
  goodsDocument: Joi.array().items(
    Joi.object({
      goods: Joi.string().min(3).max(100).required(),
      count: Joi.number().min(1).positive().required(),
      sum: Joi.number().min(0).positive().required(),
      price: Joi.number().min(0.01).positive().required(),
    })
  ),
});

export const shemas = {
  schemaAddOrder,
};

export const modelOrder = model<IOrder>("orders", schemaOrders);
