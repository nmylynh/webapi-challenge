const express = require("express");
const actionsData = require("../data/helpers/actionModel")
const projectsData = require("../data/helpers/projectModel")
const router = express.Router();


router.get("/", (req, res) => {
    projectsData
        .get()
        .then(projects =>{
            res.status(200).json({projects});
        })
        .catch(() => {
            res.status(500).json({ error: "Failure to get data from projects."});
        });
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    projectsData
        .get(id)
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(() => {
            res.status(404).json({error: "Failure to get this project."});
        });
});

//name, description
router.post("/", (req, res) => {
    if(req.body.name && req.body.description) {
        projectsData
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
    if(req.body.name && req.body.description) {
        projectsData
            .update(req.params.id, req.body)
            .then(project => {
                res.status(200).json({project})
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
        projectsData
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