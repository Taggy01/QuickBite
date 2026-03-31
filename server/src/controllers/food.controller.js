import Foods from "../models/food.js";

export const getFood = async (req, res) => {
  try {
    const food = await Foods.find().lean();

    if (!food.length) {
      return res.status(404).json({
        message: "No food items found",
      });
    }
    res.status(200).json(food);
  } catch (error) {
    console.log("Error in Food Controller - Get Food:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addFood = async (req, res) => {
  try {
    const { name, quantity, price, category, foodTime, foodImage } = req.body;

    if (!name || !foodTime || !price || !category || !foodImage || !quantity) {
      return res.status(400).json({ message: "Required all fields" });
    }

    if (quantity < 0 || price < 0) {
      return res.status(400).json({
        message: "Quantity and price cannot be negative",
      });
    }

    const newFood = new Foods({
      name,
      quantity,
      price,
      category,
      foodTime,
      foodImage,
    });

    const savedFood = await newFood.save();

    res.status(201).json({
      message: "Food Item Created Successfully.",
      data: savedFood,
    });
  } catch (error) {
    console.log("Error in Food Controller - Add Food:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "price",
      "quantity",
      "category",
      "foodTime",
      "foodImage",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    if (updates.price !== undefined && updates.price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (updates.quantity !== undefined && updates.quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    const updatedFood = await Foods.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });

    if (!updatedFood) {
      return res.status(404).json({
        message: "No food found with this id.",
      });
    }

    return res.status(200).json({
      message: "Food Updated",
      data: updatedFood,
    });
  } catch (error) {
    console.log("Error in Food Controller - Update Food:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Foods.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted" });
  } catch (error) {
    console.log("Error in Food Controller - Delete Food:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};