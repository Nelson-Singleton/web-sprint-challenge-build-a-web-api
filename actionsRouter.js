const express = require('express')
const { update } = require('./data/dbConfig')
const router = express.Router()
const actionsDb = require('./data/helpers/actionModel')
const projectsDb = require('./data/helpers/projectModel')


///////////////////////////////////////////////////////////////
function checkID(req, res, next){

const projectID = req.body.project_id

    if(!projectID) {res.status(400).json({message: "Please include a project ID"})}
    else{next()}
}

///////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
    actionsDb.get()
    .then (actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({error: "No actions found"})
    })
})
///////////////////////////////////////////////////////////////
router.get('/:id', (req, res) => {
    //const checkId = projectsDb.getProjectActions(req.params.id)
    projectsDb.getProjectActions(req.params.id)
    .then(actions => {
     if(actions.project_id = req.params.id) {res.status(200).json(actions)}
     else if (actions.project_id != req.params.id) {res.status(400).json({message: "Could not find actions associated with that project"})}
     else {res.status(400).json({error: "Error. Try again."})}         
    }) 
   
})
///////////////////////////////////////////////////////////////
router.post('/:id', checkID, (req, res) => {     
    
    actionsDb.insert(req.body)
    .then(actions => {
       {res.status(200).json(actions)}
      
        
})
    .catch(error => res.status(400).json({error: "Error adding action."}))
})
//////////////////////////////////////////////////////////////
router.put('/:id', checkID, (req, res) => {
    const id = req.params.id
    const changes = req.body

    actionsDb.update(id, changes)

    .then(update => {
        res.status(200).json({message: "Update was successful", changes})
        
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Error updating. Try again."})
    })
})

router.delete('/:id', (req, res) => {

    actionsDb.remove(req.params.id)
    
    .then(actions => {
        if(actions == 0){
            res.status(404).json({error: "Could not find that ID"})
       } else{res.status(200).json({message: "The post has been deleted"})}
    })
    .catch(error => res.status(500).json({message:"The post could not be removed"}))
})








module.exports = router;