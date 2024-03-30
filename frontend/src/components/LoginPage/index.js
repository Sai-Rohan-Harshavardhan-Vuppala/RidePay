import { Button, Grid, Typography } from "@mui/material";

import { useUserContext } from "../../hooks/UserContext";

import logo from "../../assets/images/logo.png";
import { useTheme } from "@emotion/react";

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="22px"
      height="22px"
    >
      <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" />
    </svg>
  );
};

const LoginPage = () => {
  const { login } = useUserContext();

  const theme = useTheme();

  return (
    <Grid
      container
      style={{
        maxWidth: "1200px",
        margin: "auto",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Grid item xs={12} sm={6}>
        <img src={logo} alt="Zui Logo" style={{ width: "50%" }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" style={{ textAlign: "right", marginBottom: "2rem" }}>
          Travel smooth, seamless
          <br /> and at speed
        </Typography>

        <Typography
          variant="h3"
          style={{
            textAlign: "right",
            marginBottom: "4rem",
            color: theme.palette.primary.main,
          }}
        >
          ZUIIIIIIIIIII...............
        </Typography>
        <Button variant="contained" onClick={login}>
          <GoogleIcon /> &nbsp; Sign in with IITBBS email
        </Button>

        <Typography style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
          Only for the students of IIT Bhubaneswar
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
