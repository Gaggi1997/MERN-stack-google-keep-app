import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NoteItem from './NoteItem';
import Search from './Notes';
import NavList from './NavList';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import noteContext from '../context/noteContext/NoteContext';
import { useContext } from 'react';
import { useRef } from 'react';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import ModalComponent from './Modal';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import { color } from '@mui/system';

import Alert from './Alert';
import { useNavigate}  from 'react-router-dom';




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: '#fff',
  boxShadow: '1px 0.5px 1px 1px #d8d8d8cc',
  zIndex: theme.zIndex.drawer + 1,
  // transition: theme.transitions.create(['width', 'margin'], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  // ...(open && {
  //   background : 'red',
  // marginLeft: drawerWidth,
  // width: `calc(100% - ${drawerWidth}px)`,
  // transition: theme.transitions.create(['width', 'margin'], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.enteringScreen,
  //   background: 'white'
  // }),
  // }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    borderRight: 'none',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Main = (props) => {

  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(prevState => !prevState);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "" })
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
    // eslint-disable-next-line
    getNotes()
    
      
    }else{
    // eslint-disable-next-line
    navigate('/Login')
    }
    
  }, [])

  const openModal = useRef()
  const closeModal = useRef()

  const handleEdit = (currentnote) => {
    openModal.current.click()
    //  console.log("modal clicked")
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description })
    //  console.log("updating the note" + note)
  }
  const handleClickAway = () => {
    editNote(note.id, note.etitle, note.edescription)
    closeModal.current.click()
    showAlert("Note updated" , "success")
    // console.log("i am clicked")
  }

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  //Alert function

  const [ alert , setAlert] = useState(null)
  const showAlert = (message , type) => {
        setAlert({
          msg : message,
          type : type
        })
        setTimeout(() => {
          setAlert(null)
        }, 1500);
  }

  const archiveNote = (note) => {
      const archivedNotes = notes.filter(data => data._id !== note._id)
          setNote(archivedNotes)
      
  }
 


  return (
    <Box sx={{ display: 'flex' }} >
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 0,
            }}
          >
            <MenuIcon style={{ color: 'rgb(131, 131, 131)' }} />
          </IconButton>
          <img className='logo' src="images/logo.png" alt="logo" />
          <Typography variant="h6" noWrap component="div" style={{ color: 'rgb(131, 131, 131)', fontWeight: '550' }}>
            Gagan Keep
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}  >
        <DrawerHeader />
        <NavList open={open} />

      </Drawer>
      {/* <ClickAwayListener onClickAway={handleClickAway}> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Search showAlert={showAlert} />
        {notes.length === 0 ?
          <div className="noNotes" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20vh',
            fontSize: '2rem',
            color: 'rgb(131, 131, 131)'
          }}>
            <LightbulbIcon style={{ fontSize: '9rem' }} />
            <p>Notes you add appear here</p>
         
          </div> :
          <div className="Notes d-flex flex-wrap flex-row justify-content-start">
            {notes.map((note, index) => {
              return (
                <NoteItem key={index} handleEdit={handleEdit} note={note} showAlert = { showAlert} archiveNote = {archiveNote}/>
              )
            })}
          </div>
    
        }
        <Alert alert = { alert } />

        <React.Fragment>



          <ModalComponent onChange={onChange} note={note} closeModal={closeModal} handleModal={openModal} handleClickAway={handleClickAway} />


        </React.Fragment>

      </Box>
      {/* </ClickAwayListener> */}
    </Box>


  );
}
export default Main