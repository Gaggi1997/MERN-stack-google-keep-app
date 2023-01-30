import { useState } from "react";
import noteContext from "./NoteContext";

const host = "http://localhost:8000"

const NoteState = (props) => {
    const note = []
    // State to hide or show the text fiels on search component
    const [showTextField, setShowTextField] = useState(false)
    const hideOrShow = {
        hide: () => { setShowTextField(false) },
        show: () => { setShowTextField(true) },
    }

    //State to fetch the notes
    const [notes, setNote] = useState(note)

    const [ archive , setArchive ] = useState([])

    //get all notes
    const getNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 
                'Content-Type': 'application/json',
                'authtoken' :  localStorage.getItem('token')
            },
        });
        const json = await response.json();
        // console.log(json)
        setNote(json)
    }

    //Add a note
    const addNote = async(title, description) => {
        
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json',
              'authtoken' : localStorage.getItem('token')
            },
            body: JSON.stringify({title , description}) // body data type must match "Content-Type" header
          });
        await response.json();
        // console.log(json)
        const note = {
            'title': title,
            'description': description
        }
        setNote(notes.concat(note))

    }

    //Delete a note
    const delNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json',
                       'authtoken' : localStorage.getItem('token')
                       
                     },
            body: JSON.stringify({id})
        });
        await response.json();
        // console.log("delete" + json)
        const delNote =  notes.filter((note) => {
            return note._id !== id
            
        })
    
        setNote(delNote)
        // console.log("deleting note with id : " + id)
    }

    const archiveNote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
            })
        setNote(newNotes)
        setArchive(prevArr => [ note , ...prevArr])
    }


    //Edit a note
    const editNote = async(id, title, description) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json',
              'authtoken' : localStorage.getItem('token')
            },
            body: JSON.stringify({title , description}) // body data type must match "Content-Type" header
          });
        await response.json();
        // console.log(json)
        let newNote = await JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                break;
            }
            
        }
        setNote(newNote)

    }

    const [ trashNotes , setTrashNotes ] = useState([])


    

    return (
        <noteContext.Provider value={{ showTextField, hideOrShow, notes, setNote, addNote, delNote, editNote, getNotes , trashNotes , setTrashNotes , archiveNote , setArchive , archive}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState