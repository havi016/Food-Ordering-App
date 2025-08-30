const Menu = require('../model/Menu');
const Customisation = require('../model/Customisation');
const Category = require('../model/Categories');
const mongoose = require("mongoose");

const createMenu = async (req, res, next) => {

    try{
        const{
            name,
            description,
            imageUrl,
            rating,
            calories,
            protein,
            price,
            category,
            customisations
        } = req.body;

        const menu = new Menu({
            name,
            description,
            imageUrl,
            rating,
            calories,
            protein,
            price,
            category,
            customisations
        })

        const savedMenu = await menu.save();
        res.status(201).json(savedMenu);
    }catch(err){
        res.status(400).json({message:"Error creating menu", err});
        console.error(err);
    }

}

const deleteMenu = async (req, res, next) => {
    try{
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({message:"No menu found."});
        }
        await Customisation.updateMany(
            {_id: {$in: menu.customisations } },
            {$pull: {menus: menu._id} }
        );

        await menu.remove();
        res.status(200).json({message:"Menu removed successfully."});

    }catch(err){
        res.status(500).json({message:"Error deleting menu", err});
        console.error(err);
    }

}

const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find()
            .populate('category')
            .populate('customisations');
        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id)
            .populate('category')
            .populate('customisations');
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const getMenusByCategory = async (req, res) => {
    try {
        const { name } = req.params;

        // Find the category by name
        const category = await Category.findOne({ name });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const menus = await Menu.find({ category: category._id }).populate('customisations');

        if (!menus || menus.length === 0) {
            return res.status(404).json({ message: "No menus found for this category" });
        }

        res.json(menus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const getMenusSortedByRating = async (req, res) => {
    try {
        const menus = await Menu.find()
            .sort({ rating: -1 }) // -1 = descending, 1 = ascending
            .populate('category')
            .populate('customisations');

        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const searchMenus = async (req, res) => {
    try {
        const { query } = req.query;

        const menus = await Menu.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).populate('category').populate('customisations');

        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const addCustomisationToMenu = async (req, res) => {
    try {
        const { menuId, customisationId } = req.body;

        const menu = await Menu.findByIdAndUpdate(
            menuId,
            { $addToSet: { customisations: customisationId } }, // ensures no duplicates
            { new: true }
        ).populate('customisations');

        await Customisation.findByIdAndUpdate(
            customisationId,
            { $addToSet: { menus: menuId } }
        );

        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

const removeCustomisationFromMenu = async (req, res) => {
    try {
        const { menuId, customisationId } = req.body;

        const menu = await Menu.findByIdAndUpdate(
            menuId,
            { $pull: { customisations: customisationId } },
            { new: true }
        ).populate('customisations');

        await Customisation.findByIdAndUpdate(
            customisationId,
            { $pull: { menus: menuId } }
        );

        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

module.exports = {
    createMenu,
    getMenuById,
    getMenusByCategory,
    getMenusSortedByRating,
    searchMenus,
    addCustomisationToMenu,
    removeCustomisationFromMenu,
    deleteMenu,
    getAllMenus
}


