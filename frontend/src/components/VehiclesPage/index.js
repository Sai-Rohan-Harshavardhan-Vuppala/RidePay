import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import OutlinedCard from "../UI/Card/OutlinedCard";
import {
  Box,
  Button,
  Stack,
  TextField,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { VEHICLE_ROUTE, GET_ALL_VEHICLES } from "../../constants";
import { AddRounded, CloseRounded } from "@mui/icons-material";

const dummyVehicleData = {
  vehicleId: "V001",
  vehicleNumber: "MH01AB1234",
  type: "Bus",
  model: "Volvo 9400",
  status: "Active",
  seats: 50,
  driverNumber: "9876543210",
};

const vehicleTypes = ["Bus", "BOV", "Traveller"];

const AddVehicle = ({ handleClose, refetch }) => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleId: "",
    vehicleNumber: "",
    type: "",
    seats: 0,
    model: "",
    driveNumber: "",
  });

  const updateField = (field, value) => {
    const updatedVehicleDetails = { ...vehicleDetails };
    updatedVehicleDetails[`${field}`] = value;
    setVehicleDetails(updatedVehicleDetails);
  };

  const onSubmit = () => {
    console.log(vehicleDetails);
    axios
      .post(VEHICLE_ROUTE, vehicleDetails, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        handleClose();
        refetch();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const content = (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} style={{ backgroundColor: "white" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            variant="filled"
            placeholder="Vehicle ID"
            helperText="Vehicle ID"
            value={vehicleDetails.vehicleId}
            style={{ background: "white", color: "white", fontSize: "0.1rem" }}
            onChange={(event) => {
              updateField("vehicleId", event.target.value);
            }}
          />
        </div>
        <TextField
          id="standard-number"
          placeholder="Vehicle Number"
          helperText="Vehicle Number"
          variant="filled"
          value={vehicleDetails.vehicleNumber}
          onChange={(event) => {
            updateField("vehicleNumber", event.target.value);
          }}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          select
          placeholder="Vehicle type"
          helperText="Vehicle type"
          variant="filled"
          value={vehicleDetails.type}
          onChange={(event) => {
            updateField("type", event.target.value);
          }}
          // helperText="Please select the vehicle type"
        >
          {vehicleTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-number"
          placeholder="Seats"
          helperText="Seats"
          type="number"
          variant="filled"
          value={vehicleDetails.seats}
          onChange={(event) => {
            updateField("seats", event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          placeholder="Model"
          helperText="Model"
          value={vehicleDetails.model}
          variant="filled"
          onChange={(event) => {
            updateField("model", event.target.value);
          }}
          // helperText="Please select the vehicle type"
        ></TextField>
      </Stack>
      <TextField
        id="outlined-basic"
        style={{}}
        placeholder="Driver Number"
        helperText="Driver Number"
        variant="filled"
        onChange={(event) => {
          updateField("driverNumber", event.target.value);
        }}
      />
    </Stack>
  );

  const actions = (
    <Stack className="d-flex flex-row-reverse">
      <Button variant="outlined" onClick={onSubmit}>
        Confirm
      </Button>
    </Stack>
  );
  return <OutlinedCard content={content} actions={actions} />;
};

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const fetchVehicles = () => {
    axios
      .get(GET_ALL_VEHICLES, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        setVehicles(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const closeModal = () => setOpenModal(false);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        VEHICLES PAGE
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
        <Button onClick={() => setOpenModal(true)}>
          <AddRounded /> Add Vehicle
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid black",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Vehicle Id
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid black",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Type
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid black",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Vehicle Number
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid black",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Seats
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles?.map((vehicle, index) => {
              return (
                <TableRow key={"index-" + index}>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {vehicle.vehicleId}
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {vehicle.type}
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {vehicle.vehicleNumber}
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {vehicle.seats}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={closeModal}>
        <IconButton
          style={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
          onClick={closeModal}
        >
          <CloseRounded style={{ color: "black" }} />
        </IconButton>

        <DialogTitle>Add Vehicle</DialogTitle>
        <DialogContent>
          <AddVehicle handleClose={closeModal} refetch={fetchVehicles} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesPage;
