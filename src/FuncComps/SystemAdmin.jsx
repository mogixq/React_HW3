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
import EditDetails from "./EditDetails";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Avatar from "@mui/material/Avatar";

function Row(props) {
  const user = props.row;
  const [open, setOpen] = React.useState(false);

  const userToEdit = (user) => {
    props.userToEdit(user);
  };

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
          <Avatar alt="ALA" src={user.picture} />
        </TableCell>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell align="right">
          {user.firstname + " " + user.lastname}
        </TableCell>
        <TableCell align="right">{user.date}</TableCell>
        <TableCell align="right">{user.street + "," + user.city}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell>
          <ChipDelete
            color="danger"
            variant="plain"
            onClick={() => props.sendDeleteUser(user)}
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
              <EditDetails user={user} userToEdit={userToEdit} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SystemAdmin(props) {
  const [numberUsers, setNumberUsers] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setNumberUsers(users.length);
  }, [users]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);


  const sendDeleteUser = (user) => {
    props.sendDeleteUser(user);
    setUsers(props.users);
  };

  const logoutUser = () => {
    sessionStorage.clear()
    props.sendHide();
  };

  const userToEdit = (user) => {
    props.userToEdit(user);
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
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>No. {numberUsers}</TableCell>
            <TableCell></TableCell>
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
                userToEdit={userToEdit}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}