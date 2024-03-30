import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    dbrown: {
      main: "#51829B",
      contrastText: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          borderRadius: "5rem",
          backgroundColor: "#387ADF",
          color: "white",
          fill: "white",
          textTransform: "none",
          fontFamily: "Open Sans",
          "&:hover": {
            backgroundColor: "#333A73",
            boxShadow:
              "0 0px 16px 0 rgba(0,0,0,0.2),\
              0 4px 10px 0 rgba(0,0,0,0.19)",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          padding: "5px 0px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "10px !important",
        },
        root: {
          padding: "0px !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          backgroundColor: "#F1DBC3",
          color: "#B46206",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F1DBC3", // Hover color for border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F1DBC3", // Border color when focused
          },
        },
        notchedOutline: {
          borderColor: "#F1DBC3",
        },
        input: {
          "&::placeholder": {
            color: "#C69C6D", // Placeholder text color
          },
          color: "inherit", // Ensures the text color is inherited from the root
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        list: {
          paddingTop: 0, // Remove top padding
          paddingBottom: 0, // Remove bottom padding
        },
      },
    },
    // Customizing MenuItem
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem", // Reduce font size
          paddingTop: "4px", // Add top padding to each menu item
          paddingBottom: "4px", // Add bottom padding to each menu item
          // Adjust left and right padding as needed
        },
      },
    },
  },
});

export default theme;
