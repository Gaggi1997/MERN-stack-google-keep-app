import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const host = "http://localhost:8000"
const Signup = () => {
    const [ credentials , setCredentials] = useState({name: "" , email : "" , password: ""})
    const navigate = useNavigate();
    const createUser = async() => {
        try {const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : credentials.name , email : credentials.email , password : credentials.password}) // body data type must match "Content-Type" header
          });
        const json = await response.json();
        if(json.success){
            console.log(json.user.name)
          localStorage.setItem('token' , json.authToken)
          navigate('/Login')
        }else{
          alert("Try again Later")
        }
     } catch (error) {
            console.log(error)
    }
}
         
        const handleChange = (e) => {
            setCredentials({...credentials , [e.target.name] : e.target.value})
        }
    


    return (
        <Wrapper>
            <Box className='Box'>

                <div className="form">
                    <Typography className='heading'>Create Account</Typography>
                    <TextField className='inputs'
                        required
                        id="outlined-required"
                        label="name"
                        name='name'
                        value={credentials.name}
                        onChange={handleChange}
                    />
                    <TextField className='inputs'
                        required
                        id="outlined-required"
                        label="email"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <TextField className='inputs'
                        required
                        type='password'
                        id="outlined-required"
                        label="password"
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <TextField className='inputs'
                        required
                        type='password'
                        id="outlined-required"
                        label="confirm password"
                        name='cpassword'
                        onChange={handleChange}
                    />
                    <Button onClick={createUser} style={{ background: '#feefc3', color: '#5D5D5D', boxShadow: 'none', fontWeight: '550' }} variant="contained">Submit</Button>
                </div>
            </Box>
        </Wrapper>
    )
    }

export default Signup
const Wrapper = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   align-items: center;
   justify-content: center;
   .Box{
    box-shadow: 1px 1px 5px 1px #8888;
    border-radius: 10px;
   }
  .form{
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     padding: 3rem 2rem;
   }
   .inputs{
    width: 20rem;
    margin: 1rem 0;
   }
   .heading{
    color: rgb(131, 131, 131);
    font-weight: 550;
    font-size: 1.5rem;
   }
`
