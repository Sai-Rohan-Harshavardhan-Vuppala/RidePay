import React, { useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import OutlinedCard from "../UI/Card/OutlinedCard";
import { Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VEHICLE_ROUTE } from "../../constants";

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

const AddVehiclePage = () => {
  const navigate = useNavigate();
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

  const onSubmit = (event) => {
    console.log(vehicleDetails);
    axios
      .post(VEHICLE_ROUTE, vehicleDetails, { withCredentials: true })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
    navigate("/");
    event.preventDefault();
  };

  const content = (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} style={{ backgroundColor: "white" }}>
        <TextField
          id="outlined-basic"
          label="Vehicle ID"
          variant="filled"
          value={vehicleDetails.vehicleId}
          style={{ background: "white", color: "white", fontSize: "0.1rem" }}
          onChange={(event) => {
            updateField("vehicleId", event.target.value);
          }}
        />
        <TextField
          id="standard-number"
          label="Vehicle Number"
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
          label="Vehicle type"
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
          label="Seats"
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
          label="Model"
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
        label="Driver Number"
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
        Add vehicle
      </Button>
    </Stack>
  );
  return <OutlinedCard content={content} actions={actions} />;
};
export default AddVehiclePage;
