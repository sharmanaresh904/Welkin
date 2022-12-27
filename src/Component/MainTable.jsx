import React, { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { deleteApi, getApi, updateApi } from '../api';
import { Stack } from '@mui/system';

const MainTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editData, setEditData] = React.useState({});

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = (id) => {
    deleteApi(id).then(() => getTableData());
  };

  const handleUpdate = (id) => {
    updateApi(id, editData).then(() => handleClose());
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setData(tempData);
  };

  const getTableData = () => {
    getApi().then((res) => setData(res.data));
  };

  useEffect(() => {
    getTableData();
  }, []);

  const handleEdit = (data) => {
    setEditData(data);
    handleOpen();
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Sr. No.</StyledTableCell>
                <StyledTableCell align='right'>Task Details</StyledTableCell>
                <StyledTableCell align='right'>Start Date</StyledTableCell>
                <StyledTableCell align='right'>End Date</StyledTableCell>
                <StyledTableCell align='right'>Status</StyledTableCell>
                <StyledTableCell align='right'>Assignee</StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId='droppable-1'>
              {(provider) => (
                <TableBody
                  className='text-capitalize'
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {data.map((row, index) => (
                    <>
                      <Draggable
                        key={row.id.toString()}
                        draggableId={row.id.toString()}
                        index={index}
                      >
                        {(provider) => (
                          <StyledTableRow
                            key={row.name}
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                            {...provider.dragHandleProps}
                          >
                            <StyledTableCell component='th' scope='row'>
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.Task_Details}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.Start_Date}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.End_Date}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.Status}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.Assignee}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              <DeleteOutlinedIcon
                                onClick={() => handleDelete(row.id)}
                              />
                            </StyledTableCell>

                            <StyledTableCell align='right'>
                              <EditOutlinedIcon
                                onClick={() => handleEdit(row)}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                      </Draggable>
                    </>
                  ))}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <form onSubmit={() => handleUpdate(editData.id)}>
              <Typography
                name='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{ marginBottom: '12px' }}
              >
                Update
              </Typography>
              <Stack direction='column' spacing={2}>
                <TextField
                  required
                  name='Task_Details'
                  label='Task detail'
                  type='text'
                  onChange={handleChange}
                  defaultValue={editData.Task_Details}
                />
                <TextField
                  name='Status'
                  select
                  defaultValue={editData.Status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='Open'>Open</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='Done'>Done</MenuItem>
                </TextField>
                <TextField
                  name='Assignee'
                  required
                  type='text'
                  onChange={handleChange}
                  value={editData.Assignee}
                />
                <TextField
                  name='Start_Date'
                  required
                  type='date'
                  onChange={handleChange}
                  value={editData.Start_Date}
                />
                <TextField
                  name='End_Date'
                  required
                  type='date'
                  onChange={handleChange}
                  value={editData.End_Date}
                />
                <Button variant='contained' type='submit'>
                  Apply
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </DragDropContext>
    </>
  );
};

export default MainTable;
