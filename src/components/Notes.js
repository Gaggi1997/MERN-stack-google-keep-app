import React, { useRef, useContext, useState } from 'react'
import { TextField , ClickAwayListener } from '@mui/material'
import styled from 'styled-components'
import noteContext from '../context/noteContext/NoteContext'



const Search = (props) => {
  const context = useContext(noteContext)
  const { hideOrShow , showTextField  , addNote } = context
  const [ note , setNote ] = useState({ title : "" , description : ""})
// handeling the satae and the function using contextApi

//useRef hook is just like document.querySelector , getElementByClassName
  const containerRef = useRef()
  
  const handleTextField = () => {
    hideOrShow.show()
    containerRef.current.style.minHeight = '70px'
  }
  const handleClickAway = () => {
    hideOrShow.hide()
    containerRef.current.style.minHeight = '30px'
    
    if ((note.title === "" && note.description === "")){
      setNote({title : "" , description : ""})
    }else if(!(localStorage.getItem('token'))){
      props.showAlert("Session expired , please login again" , "danger")
    }
    else if(!(note.title === "" && note.description === "") && (localStorage.getItem('token'))){
      addNote(note.title , note.description)
    setNote({title : "" , description : ""})
    props.showAlert("Note added succesfully" , "success")
    }
  }
  const onChange= ((event) => {
    setNote({...note ,[event.target.name] : event.target.value}) 
    //jo bhi name change ho rha hai vo uski value k barabr ho jaye
})

   
  return (
    // ClickAwayListener is a mui default property  to enable clicking outside the wrapper
    <ClickAwayListener onClickAway={ handleClickAway }>
      <Wrapper ref={containerRef}>
        { showTextField &&
      <TextField onChange={onChange} name='title' value={note.title} className='search' placeholder='Title' variant="standard" InputProps={{ disableUnderline : true}}/>
      }
      {/* //InputProps={{ disableUnderline : true}} -- default property to remove undeline  */}
      <TextField onChange={onChange} name='description' value={note.description} onClick={handleTextField} className='search' placeholder='take a note...' variant="standard" InputProps={{ disableUnderline : true}} multiline/>
     {/* multiline -- default property to inset multi line after hitting enter inside text field */}
     </Wrapper>
     </ClickAwayListener>
    
  )
}
const Wrapper = styled.div`
     display: flex;
     flex-direction: column;
     box-shadow: 0 1px 2px 0 rgb(60 64 67/ 30%), 0 2px 6px 2px rgb(60 64 67/ 15%);
     width: 40rem;
     border-radius: 10px;
     margin: auto;
     .search{
      padding: 5px 10px;
     }
     
`

export default Search
