const express = require("express");
const actionsDB = require("../data/helpers/actionModel")
const projectsDB = require("../data/helpers/projectModel")
const router = express.Router();


//middleware
const validateActionBody = (req, res, next) => {
    const {project_id, description, notes} = req.body;

    project_id && description && notes
    ? next()
    : res.status(400).json({message: "missing required fields for actions"})
} 

const validateAPid = async (req, res, next) => {
    try {
    const {project_id} = req.body;
    const action = await projectsDB.get(project_id);

    action 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing action id"});
    }
}

const validateActionId = async (req, res, next) => {
    try {
    const {id} = req.params;
    const action = await actionsDB.get(id);

    action 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing action id"});
    }
}


module.exports = router;