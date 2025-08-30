const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user-routes');
const categoryRouter = require('./routes/categories-routes');
const customisationRouter = require('./routes/customisation-routes');
const menuRouter = require('./routes/menus-routes');

const app = express();
app.use(cors({
    origin: "http://192.168.1.76:19006",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/customisations", customisationRouter);
app.use("/menus", menuRouter);

// global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;