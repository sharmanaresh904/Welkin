import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Box,
  Button,
  MenuItem,
  TextField,
} from '@mui/material';
import { getApi, postApi } from '../api';
import { Stack } from '@mui/system';
import { CSVLink } from 'react-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
const PostData = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [form, setFrom] = React.useState({
    Start_Date: '',
    End_Date: '',
    Status: '',
    Task_Details: '',
    Assignee: '',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 12,

    p: 4,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrom({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    postApi(form).then(() => getApi());
    handleClose();
  };

  const headers = [
    { label: 'Task_Details', key: 'Task_Details' },
    { label: 'Start_Date', key: 'Start_Date' },
    { label: 'End_Date', key: 'End_Date' },
    { label: 'Assignee', key: 'Assignee' },
    { label: 'Status', key: 'Status' },
  ];

  useEffect(() => {
    getApi().then((res) => setData(res.data));
  }, []);

  return (
    <Box sx={{ margin: '5px' }}>
      <Stack
        direction='row'
        spacing={2}
        justifyContent='space-around'
        alignItems={'center'}
      >
        <Button
          variant='contained'
          onClick={handleOpen}
          sx={{
            background: 'black',
            '&:hover': {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        >
          Add data <AddIcon />
        </Button>
        <CSVLink
          data={data}
          headers={headers}
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant='contained'
            sx={{
              background: 'black',
              '&:hover': {
                color: 'black',
                backgroundColor: 'white',
              },
            }}
          >
            Download as Csv <FileDownloadIcon />
          </Button>
        </CSVLink>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography name='modal-modal-title' variant='h6' component='h2'>
              Add Your Data
            </Typography>
            <Stack direction='column' spacing={2}>
              <Stack direction='row' spacing={2}>
                <TextField
                  name='Task_Details'
                  label='Task_Details'
                  type='text'
                  onChange={handleChange}
                  value={form.Task_Details}
                  required
                />
                <TextField
                  name='Status'
                  label='Status'
                  defaultValue='Done'
                  onChange={handleChange}
                  value={form.Status}
                  required
                >
                  <MenuItem value='Open'>Open</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='Done'>Done</MenuItem>
                </TextField>
              </Stack>
              <Stack direction='row' spacing={2}>
                <TextField
                  id='date'
                  label='Start_date'
                  type='date'
                  onChange={handleChange}
                  name='Start_Date'
                  value={form.Start_Date}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  id='date'
                  label='End Date'
                  name='End_Date'
                  type='date'
                  onChange={handleChange}
                  value={form.End_Date}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Stack>
              <Stack direction='row' spacing={2}>
                <TextField
                  name='Assignee'
                  label='Assignee'
                  type='text'
                  onChange={handleChange}
                  value={form.Assignee}
                  required
                />
                <Button
                  type='submit'
                  sx={{ width: '230px' }}
                  variant='contained'
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default PostData;
