const express = require("express");
const actionsData = require("../data/helpers/actionModel")
const projectData = require("../data/helpers/projectModel")
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
router.post("/", (req, res) => {
    if(req.body.project_id && req.body.description && req.body.notes) {
        actionsData
            .insert(req.body)
            .then(response => {
                res.status(201).json({response})
            })
            .catch(() => {
                res.status(500).json({error: "Failure to post action."});
            });
    } else {
        res.status(404).json({error: "Required parameters are missing."});
    }
});

router.put("/:id", (req, res) => {
    if(req.params.id && req.body.project_id && req.body.description && req.body.notes) {
        actionsData
            .update(req.params.id, req.body)
            .then(action => {
                res.status(200).json({action})
            })
            .catch(() => {
                res.status(500).json({error: "Failure to update action."});
            });
    } else {
        res.status(404).json({error: "Required parameters are missing."});
    }
});

router.delete("/:id", (req, res) => {
    if(req.params.id){
        actionsData
            .remove(req.params.id)
            .then(response => {
                res.status(200).json({response})
            })
            .catch(() => {
                res.status(500).json({error: "Failure to delete action."})
            })
    } else {
        res.status(404).json({error: "Required id is missing."});
    }
})

module.exports = router;