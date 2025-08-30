const Menu = require('../model/Menu');
const Category = require('../model/Categories');

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = new Category({ name, description });
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error creating category", err });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) return res.status(404).json({ message: "Category not found" });

        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const category = await Category.findOne({ name: name });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        await Menu.updateMany({ category: id }, { $unset: { category: "" } });

        await Category.findByIdAndDelete(id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    getCategoryByName
};