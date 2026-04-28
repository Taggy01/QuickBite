import express from "express";

import {getCategory, addCategory, updateCategory, deleteCategory} from "../controllers/Category.controller.js";
import upload from "../middlewares/upload.js";

const route = express.Router();

route.get("/" , getCategory);
route.post("/add", upload.single("CategoryImage"), addCategory);
route.patch("/update/:id", upload.single("CategoryImage"), updateCategory);
route.delete("/delete/:id", deleteCategory);

export default route;