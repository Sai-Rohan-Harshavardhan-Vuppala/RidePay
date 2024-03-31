import React, { useState, useEffect } from "react";
import MediaCard from "../UI/Card/MediaCard";
import {
  Typography,
  Stack,
  Button,
  Grid,
  Box,
  Modal,
  FormControl,
  InputLabel,
  styled,
  InputBase,
  alpha,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LoadingPage from "../LoadingPage";
import addIconImage from "../../assets/images/add_image.png";
import "./index.css";
import { STOP_ROUTE } from "../../constants.js";
import defaultImage from "../../assets/images/stop.jpg";
import { AddRounded, PlaceRounded } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "30px",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    // marginTop: theme.spacing(3),
    marginBottom: "20px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const dummyStopData = [
  {
    name: "MHR",
    latitude: "40.7128", // Example latitude
    longitude: "-74.0060", // Example longitude
    imageUrl:
      "https://www.iitbbs.ac.in/cropeImage.php?h=200&w=250&f=images/photo_gallery/gallery_1435441811.jpg",
  },
  {
    name: "Stop 2",
    latitude: "34.0522", // Example latitude
    longitude: "-118.2437", // Example longitude
  },
  {
    name: "Stop 3",
    latitude: "51.5074", // Example latitude
    longitude: "-0.1278", // Example longitude
  },
];

const StopsPage = () => {
  const [stops, setStops] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newStop, setNewStop] = useState({
    name: "",
    imageUrl: "",
    latitude: "",
    longitude: "",
  });
  const [checked, setChecked] = useState(true);

  const updateNewStopField = (field, value) => {
    const updatedNewStop = { ...newStop };
    updatedNewStop[`${field}`] = value;
    setNewStop(updatedNewStop);
  };

  const onModalSubmit = (event) => {
    const imageUrl = newStop.imageUrl === "" ? defaultImage : newStop.imageUrl;
    const updatedNewStop = { ...newStop, imageUrl: null };
    console.log(updatedNewStop);
    // setNewStop(updatedNewStop);
    setOpenModal(false);
    setLoading(true);
    // console.log(loading);
    // api call to update the stop in database
    console.log(updatedNewStop);
    axios
      .post(STOP_ROUTE, updatedNewStop, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        const newStops = [...stops, newStop];
        setStops(newStops);
        setNewStop({
          name: "",
          imageUrl: "",
          latitude: "",
          longitude: "",
        });
      })
      .catch((err) => {
        console.log({ err });
      });
    setLoading(false);
    // console.log(stops);
  };

  // useEffect(() => {
  //   console.log(stops);
  // }, [stops]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const getAllStops = () => {
    axios
      .get(STOP_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        setStops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getAllStops();
  }, []);

  if (loading) {
    // console.log(loading);
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingPage width="100px" height="100px" />
      </div>
    );
  }

  const stopsContent = stops.map((stop, index) => {
    // console.log(stop);
    const imageUrl =
      stop.hasOwnProperty("imageUrl") && stop.imageUrl !== null && stop.imageUrl != ""
        ? stop.imageUrl
        : null;

    const title = stop.name;
    const content = (
      <Stack
        style={{
          display: "flex",
          flexDirection: "flex-column",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <IconButton
          style={{ position: "absolute", top: -10, right: 0, color: "#f8148a" }}
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${stop.latitude},${stop.longitude}`
            )
          }
        >
          <PlaceRounded />
        </IconButton>
      </Stack>
    );

    const actions = (
      <Button variant="outlined" style={{ height: "25px" }}>
        Edit Stop
      </Button>
    );

    return (
      <MediaCard
        key={index}
        imageUrl={imageUrl}
        title={title}
        content={content}
        actions={actions}
      />
    );
  });

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        VEHICLES
      </Typography>

      <Stack direction="column" spacing={2}>
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <AddRounded />
            &nbsp; Add Stop
          </Button>
        </Grid>

        <Grid container spacing={4} style={{ width: "800px", margin: "auto" }}>
          {stopsContent.map((stopContent) => {
            return (
              <Grid item xs={4}>
                {stopContent}
              </Grid>
            );
          })}
        </Grid>
      </Stack>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Add Stop</DialogTitle>
        <DialogContent>
          <Stack>
            <Typography
              style={{ position: "relative", mt: 5 }}
              shrink
              htmlFor="bootstrap-input"
            >
              Stop Name
            </Typography>
            <TextField
              variant="filled"
              value={newStop.name}
              onChange={(event) => {
                updateNewStopField("name", event.target.value);
              }}
            />
            <Typography
              style={{ position: "relative", mt: 5 }}
              shrink
              htmlFor="bootstrap-input"
            >
              Latitude
            </Typography>
            <TextField
              variant="filled"
              value={newStop.latitude}
              key={2}
              onChange={(event) => {
                updateNewStopField("latitude", event.target.value);
              }}
              id="bootstrap-input"
            />
            <Typography style={{ position: "relative" }} shrink htmlFor="bootstrap-input">
              Longitude
            </Typography>
            <TextField
              variant="filled"
              value={newStop.longitude}
              key={3}
              onChange={(event) => {
                updateNewStopField("longitude", event.target.value);
              }}
              id="bootstrap-input"
            />

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box style={{ height: "80px" }}>
                <InputLabel style={{ position: "relative" }} shrink>
                  Image URL
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ marginLeft: "35px" }}
                        checked={checked}
                        onChange={(event) => {
                          setChecked(event.target.checked);
                        }}
                      />
                    }
                    label="with image URL"
                  />
                </InputLabel>
                {checked && (
                  <TextField
                    variant="filled"
                    key={4}
                    value={newStop?.imageUrl || ""}
                    onChange={(event) => {
                      updateNewStopField("imageUrl", event.target.value);
                    }}
                    id="bootstrap-input"
                  />
                )}
              </Box>

              <Button
                variant="outlined"
                startIcon={<AddLocationAltIcon />}
                onClick={onModalSubmit}
                sx={{ mt: "15px", mb: "0px", height: "40%" }}
              >
                Add Stop
              </Button>
            </Box>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default StopsPage;
