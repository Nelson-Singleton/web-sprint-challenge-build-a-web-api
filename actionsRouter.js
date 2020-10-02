const express = require('express')
const router = express.Router()
const actionsDb = require('./data/helpers/actionModel')
const projectsDb = require('./data/helpers/projectModel')

router.get('/', (req, res) => {
    actionsDb.get()
    .then (actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({error: "No actions found"})
    })
})

router.get('/:id', (req, res) => {
    //const checkId = projectsDb.getProjectActions(req.params.id)
    projectsDb.getProjectActions(req.params.id)
    .then(actions => {
     if(actions.project_id == req.params.id) {res.status(200).json(actions)}
     else if (actions.project_id != req.params.id) {res.status(400).json({message: "Could not find actions associated with that project"})}
     else {res.status(400).json({error: "Error. Try again."})}         
    }) 
   
})

router.post('/', (req, res) => {
    actionsDb.insert(req.body)
    .then(actions => {
        res.status(201).json(actions)
    })
    .catch(error => res.status(400).json(error))
})

router.put('/:id', (req, res) => {
    actionsDb.update(req.params.id, req.body)
    .then(actions => {
        if(change){
            res.status(200).json(actopms)
        } else {res.status(404).json({message: "Could not find that post"})}
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Error updating. Try again."})
    })
})

router.delete('/:id', (req, res) => {
    actionsDb.remove(req.params.id)
    .then(actions => {
        if(item == 0){
            res.status(404).json({error: "Could not find that ID"})
       } else{res.status(200).json({message: "The post has been deleted"})}
    })
    .catch(error => res.status(500).json({message:"The post could not be removed"}))
})








module.exports = router;