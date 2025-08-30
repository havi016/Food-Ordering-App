const express = require('express');
const {
    createCustomisation,
    getAllCustomisations,
    getCustomisationById,
    updateCustomisation,
    deleteCustomisation
} = require('../controller/customisations-controller');

const router = express.Router();

// Routes
router.post('/', createCustomisation);
router.get('/', getAllCustomisations);
router.get('/:id', getCustomisationById);
router.put('/:id', updateCustomisation); // <-- PUT route added
router.delete('/:id', deleteCustomisation);

module.exports = router;