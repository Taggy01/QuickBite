import express from "express";

import {getFood, addFood, updateFood} from "../controllers/food.controller.js";

const route = express.Router();

route.get("/food" , getFood);
route.post("/food", addFood);
route.patch("/food/:id", updateFood);

export default route;