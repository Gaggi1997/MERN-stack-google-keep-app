import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';

const ModalComponent = (props) => {
  const { handleModal , closeModal} = props
  const [open, setOpen] = React.useState(false);
  const { onChange , note , handleClickAway } = props
  return (
    <React.Fragment>
      <Button style={{ display : 'none'}} ref = {handleModal} variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            ref = { closeModal }
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
           <Box className='d-flex flex-column' style = {{width: '40rem'}}>
          <TextField onChange={onChange} name='etitle' value={note.etitle}  className='search' placeholder='Title' variant="standard" InputProps={{ disableUnderline : true}}/>
          <TextField onChange={onChange} name='edescription' value={note.edescription}   className='search' placeholder='take a note...' variant="standard" InputProps={{ disableUnderline : true}} multiline/>
          <button style={{width : '80px' , border : 'none'}} onClick={handleClickAway}>update</button>
           </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
export default ModalComponent
