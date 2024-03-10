import expressAsyncHandler from "express-async-handler";
import goodsServices from "../services/ordersServices";

class OrdersController {
  getAll = expressAsyncHandler(async (req: any, res: any) => {
    const orders = await goodsServices.show({ ...req.query });

    res.status(200).json({ code: 200, data: orders, qty: orders.length });
  });

  getOne = expressAsyncHandler(async (req, res: any) => {
    const { orderId: id } = req.params;

    const order = await goodsServices.showOne(id);

    res.status(200).json({ code: 200, data: order });
  });

  add = expressAsyncHandler(async (req: any, res: any) => {
    const order = await goodsServices.add({ ...req.body });

    res.status(201).json({ code: 201, data: order });
  });

  remove = expressAsyncHandler(async (req, res) => {
    const { orderId: id } = req.params;

    const order = await goodsServices.remove(id);

    res.status(200).json({ code: 200, data: order });
  });
}

const ordersController = new OrdersController();

export default ordersController;
