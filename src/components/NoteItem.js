import React from 'react'
import noteContext from '../context/noteContext/NoteContext'
import { useContext } from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';


const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { delNote ,archiveNote  } = context
    const { handleEdit, note, showAlert } = props


    return (

        <Wrapper>
            <div className="container notes d-flex flex-row flex-wrap gap-4 justify-content-center">
                <div className="card" style={{ minWidth: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
        
                        <div className="Icons d-flex justify-content-end" >
                            {/* <i 
                                className="fa-solid fa-trash"></i>
                            <i  className="fa-solid fa-pen-to-square"></i> */}

                            <div className="dropdown">
                                <MoreVertIcon className='dropbtn' />
                                <ul className="dropdown-content">
                                    <li style={{cursor : "pointer"}} onClick={() => { handleEdit(note) }}>Edit</li>
                                    <li style={{cursor : "pointer"}} onClick={() => { delNote(note._id)
                                    showAlert("Note Deleted Sucessfully", "danger")}}>Delete</li>
                                    <li style={{cursor : "pointer"}} onClick={()=> { archiveNote(note._id)}}>archive</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
.notes{
    flex-wrap: wrap;
}
      .card{
        i{
            cursor: pointer;
            margin: 5px;
        }
        .Icons {
            &:hover .dropdown-content{
                display: block;
            }
            
        }
        .Icons {
            &:hover .dropbtn{
                display: none;
            }
            
        }
        .dropdown-content{
            display: none;
            list-style-type: none;
            box-shadow: '1px 0.5px 1px 1px #d8d8d8cc';

            li{
                font-weight: 500;
                &:hover{
                    color: #888;
                }
            }
        }
      }
`

export default NoteItem
