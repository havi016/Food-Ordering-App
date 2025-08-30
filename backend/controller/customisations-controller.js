const Customisation = require('../model/Customisation');
const Menu = require('../model/Menu');

const createCustomisation = async (req, res) => {
    try {
        const { name, price, type } = req.body;

        const customisation = new Customisation({ name, price, type });
        const savedCustomisation = await customisation.save();

        res.status(201).json(savedCustomisation);
    } catch (err) {
        res.status(400).json({ message: "Error creating customisation", err });
    }
};

const getAllCustomisations = async (req, res) => {
    try {
        const customisations = await Customisation.find().populate('menus');
        res.json(customisations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCustomisationById = async (req, res) => {
    try {
        const { id } = req.params;
        const customisation = await Customisation.findById(id).populate('menus');

        if (!customisation) return res.status(404).json({ message: "Customisation not found" });

        res.json(customisation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCustomisation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, type } = req.body;

        const updated = await Customisation.findByIdAndUpdate(
            id,
            { name, price, type },
            { new: true, runValidators: true }
        ).populate('menus');

        if (!updated) return res.status(404).json({ message: "Customisation not found" });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Error updating customisation", err });
    }
};

const deleteCustomisation = async (req, res) => {
    try {
        const { id } = req.params;

        const customisation = await Customisation.findById(id);
        if (!customisation) return res.status(404).json({ message: "Customisation not found" });

        // Remove customisation from all menus that reference it
        await Menu.updateMany(
            { customisations: id },
            { $pull: { customisations: id } }
        );

        await Customisation.findByIdAndDelete(id);
        res.json({ message: "Customisation deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCustomisation,
    getAllCustomisations,
    getCustomisationById,
    updateCustomisation,
    deleteCustomisation
};