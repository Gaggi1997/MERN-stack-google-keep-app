import React from 'react'
import { useContext } from 'react'
import NoteState from '../context/noteContext/NoteState'

const Trash = () => {
    const context = useContext()
    const { TrashNotes , setTrashNotes } = context
  return (
    <div>
      
    </div>
  )
}

export default Trash
