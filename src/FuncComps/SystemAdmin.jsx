
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// export default function SystemAdmin(props) {
//   const [user, setUser] = useState("");
//   const [editVisible, setEditVisible] = useState(false);

//   const logoutUser = () => {
//     props.sendHide()
//   };

//   const showEdit = () => {
//     if (editVisible) {
//       setEditVisible(false);
//       return;
//     }
//     setEditVisible(true);
//   };

//   return (
//     <>
//       <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={logoutUser}
//             >
//               Logout
//             </Button>

//     </>
//   )
// }

function Row(props) {
  const users = props.row;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {users.username} </TableCell>
        <TableCell align="right">{users.firstname + " " + users.lastname}</TableCell>
        <TableCell align="right">{users.date}</TableCell>
        <TableCell align="right">{users.street + "," + users.city}</TableCell>
        <TableCell align="right">{users.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Profile
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Firstname</TableCell>
                    <TableCell align="right">Lastname</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={users.date}>
                      <TableCell component="th" scope="row">
                        {users.date}
                      </TableCell>
                      <TableCell>{users.username}</TableCell>
                      <TableCell align="right">{users.firstname}</TableCell>
                      <TableCell align="right"> {users.lastname}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

//the top of the table
export default function CollapsibleTable() {
  const users = JSON.parse(localStorage.getItem("users"));
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { users && users.map((user) => (
            <Row key={user?.username} row={user} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
