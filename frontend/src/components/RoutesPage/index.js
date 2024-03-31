import { useState, useEffect } from "react";
import { AddRounded, ArrowRightAltRounded, CloseRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  GET_ALL_STOPS_ROUTE,
  ADD_ROUTE_ROUTE,
  GET_ALL_ROUTES_ROUTE,
} from "../../constants";

const AddRoutes = ({ handleClose, refetch }) => {
  const [allStops, setAllStops] = useState(null);
  const [routeStops, setRouteStops] = useState([null]);
  const [routeName, setRouteName] = useState("");
  const [durations, setDurations] = useState([0]);

  useEffect(() => {
    axios
      .get(GET_ALL_STOPS_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        setAllStops(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    console.log({ routeStops, durations });
  }, [routeStops]);

  const handleSubmit = () => {
    const routeData = { stops: [], name: routeName };
    for (let i = 0; i < routeStops.length - 1; i++) {
      routeData.stops.push({ stop: routeStops[i], duration: durations[i] });
    }

    axios
      .post(ADD_ROUTE_ROUTE, routeData, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        refetch();

        handleClose();
      })
      .catch((err) => {
        console.log({ err });
        alert(err.message);

        handleClose();
      });
  };

  return (
    <div>
      {routeStops.map((stop, index) => {
        return (
          <div key={"stop-" + index} style={{ width: "300px" }}>
            <TextField
              style={{ width: "100%" }}
              select
              placeholder="Pick Stop"
              helperText="Choose Stop"
              variant="filled"
              value={stop ?? ""}
              onChange={(event) => {
                let currStops = [...routeStops];
                if (index === currStops.length - 1) {
                  currStops.pop();
                  currStops = [...currStops, event.target.value, null];

                  let currDurations = [...durations];
                  currDurations.pop();
                  currDurations = [...currDurations, 0, 0];

                  setDurations(currDurations);
                } else {
                  currStops[index] = event.target.value;
                }

                setRouteStops(currStops);
              }}
              children={allStops?.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            />

            {index < routeStops.length - 1 && (
              <div style={{ display: "flex", alignItems: "center" }}>
                Time from previous stop (min)
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={durations[index]}
                  variant="filled"
                  style={{ width: "50px", marginLeft: "1rem", marginBottom: "1rem" }}
                  disabled={index === 0}
                  onChange={(e) => {
                    const currDurations = [...durations];
                    currDurations[index] = e.target.value;
                    setDurations(currDurations);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <TextField
        style={{ marginTop: "1rem" }}
        placeholder="BHR - SIF"
        helperText="Route Name"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
      />

      <Button style={{ marginTop: "1rem" }} onClick={handleSubmit}>
        &nbsp;Add Route&nbsp;
      </Button>
    </div>
  );
};

const RoutesPage = () => {
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState(null);

  const handleClose = () => setOpen(false);

  const fetchAllRoutes = () => {
    axios
      .get(GET_ALL_ROUTES_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        setRoutes(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchAllRoutes();
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        ROUTES PAGE
      </Typography>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setOpen(true)}>
          <AddRounded />
          &nbsp;Add Route&nbsp;&nbsp;
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <IconButton
          style={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
          onClick={handleClose}
        >
          <CloseRounded style={{ color: "black" }} />
        </IconButton>

        <DialogTitle>Add Route</DialogTitle>
        <DialogContent>
          <AddRoutes handleClose={handleClose} refetch={fetchAllRoutes} />
        </DialogContent>
      </Dialog>

      <div>
        {routes?.map((route, index) => {
          return (
            <Paper
              key={"route-" + index}
              style={{ padding: "0.5rem 1rem", margin: "1rem auto 0 auto", width: "90%" }}
            >
              <Typography style={{ fontSize: "2rem", fontWeight: 600 }}>
                {route.name}
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  overflow: "auto",
                  marginTop: "0.5rem",
                }}
              >
                {route.stops.map(({ stop }, index2) => {
                  return (
                    <>
                      <Typography key={`stop-${index}-${index2}`}>{stop.name}</Typography>
                      {index2 != route.stops.length - 1 && <ArrowRightAltRounded />}
                    </>
                  );
                })}
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default RoutesPage;
