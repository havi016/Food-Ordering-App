const express = require('express');
const {
    createMenu,
    getMenuById,
    getMenusByCategory,
    getMenusSortedByRating,
    searchMenus,
    addCustomisationToMenu,
    removeCustomisationFromMenu,
    deleteMenu,
    getAllMenus
} = require('../controller/menus-controller');

const router = express.Router();

router.get('/search', searchMenus);
router.get('/category/:name', getMenusByCategory);

router.get('/:id', getMenuById);

router.post('/', createMenu);
router.get('/', getAllMenus);
router.delete('/:id', deleteMenu);

router.get('/sorted/by-rating', getMenusSortedByRating);

router.post('/:menuId/customisations/:customisationId', addCustomisationToMenu);
router.delete('/:menuId/customisations/:customisationId', removeCustomisationFromMenu);

module.exports = router;