import Category from "../models/Category.js";

export const addCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const savCategory = await newCategory.save();
    res.status(201).json(savCategory);
  } catch (error) {
    next(error);
  }
};

export const allCategory = async (req, res, next) => {
  try {
    const CategoryData = await Category.find().sort({
      createdAt: -1,
    });
    res.status(200).json(CategoryData);
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const CategoryData = await Category.findByIdAndDelete(id);
    res.status(200).json("delete");
  } catch (error) {
    next(error);
  }
};
