import { AddRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  GET_ALL_ROUTES_ROUTE,
  GET_ALL_VEHICLES,
  ADD_SCHEDULE_ROUTE,
  GET_SCHEDULE_ROUTE,
} from "../../constants";
import axios from "axios";

const AddSchedule = ({ handleClose, refetch }) => {
  const [startDate, setStartDate] = useState();

  const [schedule, setSchedule] = useState([]);

  const [vehicles, setVehicles] = useState(null);
  const [allRoutes, setAllRoutes] = useState(null);

  const fetchAllRoutes = () => {
    axios
      .get(GET_ALL_ROUTES_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        setAllRoutes(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

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
    fetchAllRoutes();
    fetchVehicles();
  }, []);

  useEffect(() => {
    console.log({ schedule });
  }, [schedule]);

  const handleSubmit = () => {
    let data = { startDate, schedule };

    axios
      .post(ADD_SCHEDULE_ROUTE, data, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        window.location.reload();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Start Date</Typography>
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          console.log(e.target.value);
          setStartDate(e.target.value);
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <TableContainer>
          <Table>
            <TableBody>
              {schedule.map((trip, index) => {
                return (
                  <TableRow>
                    <TableCell style={{ minWidth: "100px" }}>
                      <TextField
                        select
                        value={trip.route}
                        onChange={(e) => {
                          let curr = [...schedule];
                          curr[index].route = e.target.value;
                        }}
                        children={allRoutes?.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      />
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>
                      <TextField
                        select
                        value={trip.vehicle}
                        onChange={(e) => {
                          let curr = [...schedule];
                          curr[index].vehicle = e.target.value;
                        }}
                        children={vehicles?.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.vehicleId}
                          </MenuItem>
                        ))}
                      />
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>
                      <TextField
                        type="time"
                        value={trip.time}
                        onChange={(e) => {
                          let curr = [...schedule];
                          curr[index].time = e.target.value;
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Fab
        size="small"
        style={{ margin: "auto" }}
        onClick={() => setSchedule((curr) => [...curr, {}])}
      >
        <AddRounded />
      </Fab>

      <Button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Confirm
      </Button>
    </div>
  );
};

const SchedulePage = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSchedule = () => {
    axios
      .get(GET_SCHEDULE_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        TRANSPORT SCHEDULE
      </Typography>

      <div>
        <Button onClick={() => setOpen(true)}>
          <AddRounded />
          &nbsp;Add Schedule&nbsp;&nbsp;
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Schedule</DialogTitle>
        <DialogContent>
          <AddSchedule handleClose={handleClose} refetch={fetchSchedule} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
