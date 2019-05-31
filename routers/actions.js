const express = require("express");
const actionsData = require("../data/helpers/actionModel")
const router = express.Router();

router.get("/", (req, res) => {
    actionsData
        .get()
        .then(actions =>{
            res.status(200).json({actions});
        })
        .catch(() => {
            res.status(500).json({ error: "Failure to get data from actions."});
        });
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    actionsData
        .get(id)
        .then(action => {
            res.status(200).json({action})
        })
        .catch(() => {
            res.status(404).json({error: "Failure to get this action."});
        });
});

//id, description, notes
