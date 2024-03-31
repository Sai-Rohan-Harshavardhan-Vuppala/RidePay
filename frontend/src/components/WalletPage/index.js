import axios from "axios";

import {
  AddRounded,
  CloseRounded,
  CurrencyRupeeRounded,
  LaunchRounded,
  TollRounded,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../hooks/UserContext";
import { useEffect, useState } from "react";

import {
  PAYMENT_LINK_ROUTE,
  GET_ALL_TRANSACTIONS_ROUTE,
  BASE_URL,
} from "../../constants";
import { useNavigate } from "react-router-dom";

const AddToWalletDialog = ({ onClose, open }) => {
  const [value, setValue] = useState(100);

  const handleClose = () => {
    onClose();
  };

  const handlePayment = () => {
    axios
      .post(
        PAYMENT_LINK_ROUTE,
        { orderAmount: value, returnUrl: `${window.location.origin}/transaction` },
        { withCredentials: true }
      )
      .then((res) => {
        console.log({ res });

        const cashfree = window.Cashfree({
          mode: "sandbox",
        });

        const paymentSessionId = res.data.order.payment_session_id;
        console.log({ paymentSessionId });

        cashfree.checkout({ paymentSessionId });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <IconButton
        style={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
        onClick={onClose}
      >
        <CloseRounded style={{ color: "black" }} />
      </IconButton>
      <DialogTitle style={{ marginRight: "4rem" }}>Add money to wallet</DialogTitle>

      <DialogContent>
        <Typography>Amount</Typography>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handlePayment(value)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

const SchedulePage = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = useUserContext();
  const [openAddToWallet, setOpenAddToWallet] = useState(false);
  const [transactions, setTransactions] = useState(null);

  const fetchTransactions = () => {
    axios
      .get(GET_ALL_TRANSACTIONS_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchUser();
    fetchTransactions();
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        WALLET
      </Typography>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.8rem",
              width: "6rem",
              padding: "0.3rem 1rem",
            }}
          >
            <CurrencyRupeeRounded
              style={{ marginRight: "1rem", fontSize: "1.7rem", color: "#59dd59" }}
            />
            {user.wallet.money}
          </Paper>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.8rem",
              width: "6rem",
              padding: "0.3rem 1rem",
            }}
          >
            <TollRounded
              style={{ marginRight: "1rem", fontSize: "1.7rem", color: "#e8e822" }}
            />
            {user.wallet.points}
          </Paper>
        </div>

        <Typography style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Need more money in wallet?
        </Typography>
        <div>
          <Button onClick={() => setOpenAddToWallet(true)}>
            <AddRounded />
            &nbsp;Add&nbsp;&nbsp;
          </Button>
        </div>

        <AddToWalletDialog
          open={openAddToWallet}
          onClose={() => setOpenAddToWallet(false)}
        />

        <div style={{ marginTop: "2rem" }}>
          <TableContainer style={{ overflow: "auto" }}>
            <Table
              style={{
                width: "40rem",
                margin: "auto",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "3rem", border: "none" }}></TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                      width: "10rem",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                      width: "4rem",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid black",
                      fontSize: "1rem",
                      textAlign: "center",
                      width: "4rem",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.map((transaction, index) => {
                  return (
                    <TableRow key={"transaction-" + index}>
                      <TableCell
                        align="center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/transaction/${transaction._id}`)}
                      >
                        <LaunchRounded />
                      </TableCell>
                      <TableCell
                        style={{
                          border: "1px solid black",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {transaction._id}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "1px solid black",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {transaction.amount}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "1rem",
                          border: "1px solid black",
                          textAlign: "center",
                          fontWeight: 600,
                          color:
                            transaction?.status === false
                              ? "red"
                              : transaction?.status === true
                              ? "#43cc43"
                              : "#adad4a",
                        }}
                      >
                        {transaction?.status === false
                          ? "CANCELLED"
                          : transaction?.status === true
                          ? "SUCCESS"
                          : "PENDING"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
