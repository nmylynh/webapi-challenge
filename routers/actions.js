const express = require("express");
const actionsData = require("../data/helpers/actionModel")
const router = express.Router();

router.get("/", (req, res) => {
    actionsData
        .get()
        .then(actions =>{
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ error: "Failure to get data from actions."});
        });
});