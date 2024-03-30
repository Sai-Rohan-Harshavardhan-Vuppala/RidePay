import { CloseRounded, PersonRounded } from "@mui/icons-material";
import {
  TableContainer,
  Typography,
  Table,
  TableRow,
  TableCell,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  IconButton,
  DialogActions,
  TableBody,
} from "@mui/material";
import { useUserContext } from "../../hooks/UserContext";
import { useState } from "react";
import { USER_UPDATE_ROUTE, BASE_URL } from "../../constants";

import axios from "axios";

function EditDialog({ onClose, open, updateProfile, user }) {
  const [imageFile, setImageFile] = useState(null);
  const [phone, setPhone] = useState(user.phNo);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpdate = () => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("photo", imageFile);
    }

    if (phone !== user.phone) formData.append("phone", phone);

    axios
      .patch(USER_UPDATE_ROUTE, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <IconButton
        style={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
        onClick={onClose}
      >
        <CloseRounded style={{ color: "black" }} />
      </IconButton>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Profile Picture"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
          ) : user.photo ? (
            <img
              crossOrigin="use-credentials"
              src={`${BASE_URL}/api/v1/file/${user.photo}`}
              alt="Profile Picture"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
          ) : (
            <PersonRounded style={{ fontSize: "200px" }} />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <TextField type="tel" value={phone} onChange={handlePhoneChange} />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleUpdate} disabled={!(imageFile || phone !== user.phone)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const ProfilePage = () => {
  const { user, updateUser } = useUserContext();

  const [edit, setEdit] = useState(false);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        PROFILE PAGE
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <div>
          {user.photo ? (
            <img
              crossOrigin="use-credentials"
              src={`${BASE_URL}/api/v1/file/${user.photo}`}
              alt="Profile Picture"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
          ) : (
            <PersonRounded style={{ fontSize: "10rem" }} />
          )}
        </div>

        <Button
          style={{ width: "10rem", margin: "1rem auto" }}
          onClick={() => setEdit(true)}
        >
          Edit Profile
        </Button>

        <TableContainer style={{ width: "min(300px, 90vw)", margin: "auto" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "5rem", fontWeight: 600 }}>Name</TableCell>
                <TableCell align="center">{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "5rem", fontWeight: 600 }}>Email</TableCell>
                <TableCell align="center">{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "5rem", fontWeight: 600 }}>Phone</TableCell>
                <TableCell align="center">{user.phNo ?? "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "5rem", fontWeight: 600 }}>Role</TableCell>
                <TableCell align="center">
                  <Chip label={user.role} style={{ textTransform: "uppercase" }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <EditDialog
          onClose={() => setEdit(false)}
          open={edit}
          updateProfile={() => updateUser()}
          user={user}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
