const express = require('express');

const router = express.Router()
const projectsDb = require('./data/helpers/projectModel')
//get all
router.get('/', (req, res) => {
    projectsDb.get()
    .then (projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({error: "No projects found"})
    })
})
//get by id
router.get('/:id', (req, res) => {
    projectsDb.get(req.params.id)
    .then(project => {
        if(project){
            res.status(200).json(project)
        } else {res.status(404).json({message: "Project with that ID not found"})}
    })
})
// get actions by id
router.get('/:id/actions', (req, res) => {
    projectsDb.getProjectActions(req.params.id)
    .then (projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(error => {
        res.status(500).json({error: "No projects found"})
    })
})
//post project
router.post('/', (req, res) => {
    projectsDb.insert(req.body)
    .then(projects => {
        res.status(201).json(projects)
    })
    .catch(error => res.status(400).json(error))
})
//change project
router.put('/:id', (req, res) => {
    projectsDb.update(req.params.id, req.body)
    .then(change => {
        if(change){
            res.status(200).json(change)
        } else {res.status(404).json({message: "Could not find that post"})}
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Error updating. Try again."})
    })
})
//delete project
router.delete('/:id', (req, res) => {
    projectsDb.remove(req.params.id)
    .then(item => {
        if(item == 0){
            res.status(404).json({error: "Could not find that ID"})
       } else{res.status(200).json({message: "The post has been deleted"})}
    })
    .catch(error => res.status(500).json({message:"The post could not be removed"}))
})




module.exports = router;