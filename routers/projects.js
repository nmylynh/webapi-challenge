const express = require("express");
const actionsDB = require("../data/helpers/actionModel")
const projectsDB = require("../data/helpers/projectModel")
const router = express.Router();

//middleware

const validateActionId = async (req, res, next) => {
    try {
    const {project_id} = req.body;
    const action = await actionsDB.get(project_id);

    action 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing action id"});
    }
}

const validateProjectId = async (req, res, next) => {
    try {
    const {id} = req.params;
    const project = await projectsDB.get(id);

    project 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing user id"});
    }
}

const validateActionBody = (req, res, next) => {
    const {project_id, description, notes} = req.body;

    project_id && description && notes
    ? next()
    : res.status(400).json({message: "missing required fields for actions"})
} 

const validateProjectBody = (req, res, next) => {
    const { name, description } = req.body;

    name 
    ? description
    ? next()
    : res.status(400).json({message: "missing description"})
    : res.status(400).json({message: "missing name"});
};
