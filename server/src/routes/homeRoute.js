import express from "express";

import {category} from "../controllers/food.controller.js";

const route = express.Router();

route.get("/category" , category);

export default route;