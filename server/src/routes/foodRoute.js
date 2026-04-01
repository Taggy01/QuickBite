import express from "express";

import {getFood, addFood, updateFood, deleteFood} from "../controllers/food.controller.js";
import upload from "../middlewares/upload.js";

const route = express.Router();

route.get("/" , getFood);
route.post("/add", upload.single("foodImage"), addFood);
route.patch("/update/:id", upload.single("foodImage"), updateFood);
route.delete("/delete/:id", deleteFood);

export default route;