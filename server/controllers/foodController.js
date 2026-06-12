import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Add food item
export const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            // If an image was uploaded, clean it up to prevent orphan files
            if (req.file) {
                fs.unlink(path.join("uploads", req.file.filename), () => {});
            }
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name,
            description,
            price: Number(price),
            category,
            image: image_filename
        });

        await food.save();
        return res.status(201).json({ success: true, message: "Food added successfully", data: food });
    } catch (error) {
        console.error("Error adding food:", error);
        if (req.file) {
            fs.unlink(path.join("uploads", req.file.filename), () => {});
        }
        return res.status(500).json({ success: false, message: "Failed to add food", error: error.message });
    }
};

// List all food items
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        return res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing food:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch food list", error: error.message });
    }
};

// Remove food item
export const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete associated image file
        if (food.image) {
            const filePath = path.join("uploads", food.image);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete local image file:", err);
                } else {
                    console.log("Deleted image:", food.image);
                }
            });
        }

        await foodModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error("Error removing food:", error);
        return res.status(500).json({ success: false, message: "Failed to remove food", error: error.message });
    }
};
