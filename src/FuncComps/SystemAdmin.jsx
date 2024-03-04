import { useState } from "react";
import Button from "@mui/material/Button";

export default function SystemAdmin(props) {
  const [user, setUser] = useState("");
  const [editVisible, setEditVisible] = useState(false);

  const logoutUser = () => {
    props.sendHide()
  };

  const showEdit = () => {
    if (editVisible) {
      setEditVisible(false);
      return;
    }
    setEditVisible(true);
  };

  return (
    <>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={logoutUser}
            >
              Fuck
            </Button>
    </>
  )
}
