import './App.css';
import Main from './components/Main';
import NoteState from './context/noteContext/NoteState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [ alert , setAlert ] = useState(null)
  const showAlert = (message , type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    } , 1500)
  }
  return (
<>
    <NoteState>
     
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route index element={<Main showAlert = { showAlert }/>} />
            <Route path="/login" element={<Login showAlert = { showAlert }/>} />
            <Route path="/signup" element={<Signup showAlert = { showAlert }/>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    <Alert alert = { alert }/>
</>
  );
}

export default App;
