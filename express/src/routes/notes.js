const express = require('express')
const fetchUser = require('../middleware/FetchUser')
require('../db')
const Notes = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require('express-validator');

//to fetch all notes of a user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.existUser.id })
    res.json(notes)
})
//to add a note
router.post('/addnote', [
    body('title', 'Title Cannot be empty').isLength({ min: 1 }),
    body('description', 'Description Cannot be empty').isLength({ min: 1 })
], fetchUser, async (req, res) => {
    const { title, description } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Notes({
            title, description, user: req.existUser.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        res.send(error)
    }

})
//to update a note
router.put('/updatenote/:id' ,[
    body('title' , "enter a valid title").isLength({ min: 5 }),
    body('description' , "description length must be more than 5").isLength({ min: 5 }),
], fetchUser , async (req , res) => {
    const { title , description } = req.body
    try {
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
         let noteExist = await Notes.findById(req.params.id)
           if(!noteExist){
             return res.status(404).send("Not Found")
           }
          if(noteExist.user.toString() !== req.existUser.id){
            return res.status(404).send("Not Allowed")
          }
           noteExist = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true})
          res.json(noteExist)
    } catch (error) {
        res.send(error)
    }
})

//to delete a note
router.delete('/deletenote/:id' , fetchUser , async (req , res) => {
    const { title , description } = req.body
    try {
         let noteDelete = await Notes.findById(req.params.id)
           if(!noteDelete){
             return res.status(404).send("Not Found")
           }
          if(noteDelete.user.toString() !== req.existUser.id){
            return res.status(404).send("Not Allowed")
          }
           noteDelete = await Notes.findByIdAndDelete(req.params.id)
          res.json("note deleted " + noteDelete)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})


module.exports = router