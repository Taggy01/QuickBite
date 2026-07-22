import express from "express";
import { getBasket,addToBasket,deleteFromBasket,decreaseFromBasket,mergeBasket } from "../controllers/basket.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const app = express.Router();

app.get("/", protectRoute, getBasket);
app.post("/", protectRoute, addToBasket);
app.put("/merge", protectRoute, mergeBasket);
app.delete("/", protectRoute, deleteFromBasket);
app.put("/", protectRoute, decreaseFromBasket);

export default app;