import Category from "../models/category.js";
import cloudinary from "../utils/cloudinary.js";

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find().lean();

    if (!category.length) {
      return res.status(404).json({
        message: "No Categories Found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log("Error in Category Controller - Get Category:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Category Image is required",
      });
    }

    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "category" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadImage();

    const newCategory = new Category({
      name,
      slug,
      image: result.secure_url,
      imageId: result.public_id,
    });

    const savedCategory = await newCategory.save();

    res.status(200).json({
      message: "Category Created.",
      data: savedCategory,
    });
  } catch (error) {
    console.log("Error in Category Controller - Add Category:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedField = ["name", "slug"];

    const updates = {};

    allowedField.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (req.file) {
      const uploadImage = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "category" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );
          stream.end(req.file.buffer);
        });

      const result = await uploadImage();

      const existingCategory = await Category.findById(id);
      if (existingCategory?.imageId) {
        await cloudinary.uploader.destroy(existingCategory.imageId);
      }

      updates.image = result.secure_url;
      updates.imageId = result.public_id;
    }

    const updateCategory = await Category.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });

    if (!updateCategory) {
      return res.status(404).json({
        message: "No Category found with this id.",
      });
    }

    return res.status(200).json({
      message: "Category Updated",
      data: updateCategory,
    });
  } catch (error) {
    console.log("Error in Category Controller - Update Category:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.imageId) {
      await cloudinary.uploader.destroy(category.imageId);
    }

    await Category.findByIdAndDelete(id);

    res.json({ message: "Category deleted" });
  } catch (error) {
    console.log("Error in Category Controller - Delete Category:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};