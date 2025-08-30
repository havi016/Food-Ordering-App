const express = require('express');
const seed = require('./seed.ts');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await seed();
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
