import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";

const host = "http://localhost:8000"
const Login = (props) => {
    const [ credentials , setCredentials] = useState({ email : "" , password: ""})
    const navigate = useNavigate();
    const loginUser = async() => {
        try {const response = await fetch(`${host}/api/auth/userlogin`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email , password : credentials.password}) // body data type must match "Content-Type" header
          });
        const json = await response.json();
        if (json.success) {
            // console.log(json)
            localStorage.setItem('token' , json.authToken)
            navigate('/')
            props.showAlert("Logged in sucessfull" , "success")
        }else{
            console.log("invalid login")
            props.showAlert("invalid Login credentials" , "danger")
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
                    
                    <Typography className='heading'>Login</Typography>
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
                        id="outlined-required"
                        label="password"
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button onClick={loginUser} style={{ background: '#feefc3', color: '#5D5D5D', boxShadow: 'none', fontWeight: '550' }} variant="contained">Submit</Button>
                   <Typography style={{color : "#888"}} className='my-1'>or</Typography>
                    <Link to="/Signup" style={{ textDecoration : "none", color
                : "#888" , fontWeight : "bold" }} >Sign up</Link>
                </div>
            </Box>
        </Wrapper>
    )
    }

export default Login
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
