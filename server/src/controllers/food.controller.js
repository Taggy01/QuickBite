import Foods from "../models/food.js";
import Category from "../models/category.js";
import cloudinary from "../utils/cloudinary.js";

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
    const { name, quantity, price, categorySlug, foodTime } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Food Image is required.",
      });
    }

    if (!name || !foodTime || !price || !quantity) {
      return res.status(400).json({ message: "Required all fields" });
    }

    const category = await Category.findOne({slug: categorySlug});
    if (!category) {
      return res.status(404).json({
        message: "No category Found",
      });
    }

    if (quantity < 0 || price < 0) {
      return res.status(400).json({
        message: "Quantity and price cannot be negative",
      });
    }

    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "foods" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadImage();

    const newFood = new Foods({
      name,
      quantity,
      price,
      category,
      foodTime,
      foodImage: result.secure_url,
      imageId: result.public_id,
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

    const allowedFields = ["name", "price", "quantity", "foodTime"];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (req.file) {
      const uploadImage = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "foods" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );
          stream.end(req.file.buffer);
        });

      const result = await uploadImage();

      const existingFood = await Foods.findById(id);
      if (existingFood?.imageId) {
        await cloudinary.uploader.destroy(existingFood.imageId);
      }

      updates.foodImage = result.secure_url;
      updates.imageId = result.public_id;
    }

    if (req.body.categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          message: "No category Found",
        });
      }

      updates.category = req.body.categoryId;
    }

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

    const food = await Foods.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.imageId) {
      await cloudinary.uploader.destroy(food.imageId);
    }

    await Foods.findByIdAndDelete(id);

    res.json({ message: "Food deleted" });
  } catch (error) {
    console.log("Error in Food Controller - Delete Food:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
