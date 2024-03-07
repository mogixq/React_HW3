import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TextField from "@mui/material/TextField";
import EditDetails from "./EditDetails";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";

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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {users.username}{" "}
        </TableCell>
        <TableCell align="right">
          {users.firstname + " " + users.lastname}
        </TableCell>
        <TableCell align="right">{users.date}</TableCell>
        <TableCell align="right">{users.street + "," + users.city}</TableCell>
        <TableCell align="right">{users.email}</TableCell>
        <TableCell>
          {/* <Chip
            variant="outlined"
            color="danger"
            //onClick={() => alert("You clicked the chip!")}
            endDecorator={
              <ChipDelete
                color="danger"
                variant="plain"
                onClick={() => alert("You clicked the delete button!")}
              >
                <DeleteForever />
              </ChipDelete>
            }
          >
          </Chip> */}
          <ChipDelete
            color="danger"
            variant="plain"
            onClick={() => props.sendDeleteUser(users)}
          >
            <DeleteForever />
          </ChipDelete>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Profile
              </Typography>
              <EditDetails userToEdit={users} />
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
export default function SystemAdmin(props) {
  const [numberUsers, setNumberUsers] = useState(null);
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    setNumberUsers(users.length)
  }, [users])

  useEffect(() => {
    setUsers(props.users);
    console.log("set users in sysad");
  }, [props.users]); 
  


  // const renderTable = () => {
  //   <Table aria-label="collapsible table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell />
  //           <TableCell>Username</TableCell>
  //           <TableCell align="right">Full Name</TableCell>
  //           <TableCell align="right">Date Of Birth</TableCell>
  //           <TableCell align="right">Address</TableCell>
  //           <TableCell align="right">Email</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {users &&
  //           users.map((user) => (
  //             <Row
  //               key={user?.username}
  //               row={user}
  //               sendDeleteUser={sendDeleteUser}
  //             />
  //           ))}
  //       </TableBody>
  //     </Table>
  // }
 
  const sendDeleteUser = (user) => {
    props.sendDeleteUser(user);
    setUsers(props.users)
  };

  const logoutUser = () => {
    props.sendHide();
  };

  return (
    <TableContainer component={Paper}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={logoutUser}
      >
        Logout
      </Button>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell>No. {numberUsers}</TableCell>
            <TableCell>Username</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <Row
                key={user?.username}
                row={user}
                sendDeleteUser={sendDeleteUser}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

{
  /* <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TextField
                        margin="normal"
                        // fullWidth
                        id="usernameEdit"
                        label="Username"
                        name="usernameEdit"
                        placeholder="AA"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        margin="normal"
                        // fullWidth
                        id="passwordEdit"
                        label="Password"
                        name="passwordEdit"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        margin="normal"
                        // fullWidth
                        id="passwordVerEdit"
                        label="Confirm Password"
                        name="passwordVerEdit"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        margin="normal"
                        // fullWidth
                        id="passwordVerEdit"
                        label="Confirm Password"
                        name="passwordVerEdit"
                      />
                    </TableCell>
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
              </Table> */
}
