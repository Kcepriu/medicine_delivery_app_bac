// import express, { Request, Response, NextFunction } from "express";
import express, { Response } from "express";
import logger from "morgan";
import cors from "cors";
import routerShops from "./routes/shopsRoutes";
import routerGoods from "./routes/goodsRoutes";
import routerOrder from "./routes/ordersRoutes";
import routerDev from "./routes/devRoutes";
import routerMap from "./routes/mapRoutes";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/shops", routerShops);
app.use("/api/goods", routerGoods);
app.use("/api/orders", routerOrder);
app.use("/api/dev", routerDev);
app.use("/api/map", routerMap);

// * Not Found
app.use("*", (_, res: Response) => {
  // (req: Request, res: Response)
  res.status(404).json({ code: 404, message: "Not found" });
});

// * Server Error
app.use((err: any, _req: any, res: Response, _next: any) => {
  console.log("Server error");

  //(err: any, req: Request, res: Response, next: NextFunction)
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ code: status, message });
});

export default app;
