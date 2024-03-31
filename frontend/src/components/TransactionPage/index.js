import { Avatar, Chip, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, GET_ALL_TRANSACTIONS_ROUTE } from "../../constants";
import { useNavigate } from "react-router-dom";

import LoadingPage from "../LoadingPage";
import { AccountBalanceWalletRounded, WalletOutlined } from "@mui/icons-material";

const showDate = (timestamp) => {
  const date = new Date(timestamp).toString();

  const pieces = date.split(" ");

  return `${pieces[1]} ${pieces[2]}, ${pieces[3]} at ${pieces[4]}`;
};

const TransactionPage = () => {
  const transactionId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get(`${GET_ALL_TRANSACTIONS_ROUTE}/${transactionId}`, { withCredentials: true })
      .then((res) => {
        console.log({ res });

        setTransaction(res.data);
      })
      .catch((err) => {
        console.log({ err });

        navigate("/404");
      });
  }, []);

  return (
    <div
      style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column" }}
    >
      <Typography variant="h6" align="left" style={{ marginBottom: "2rem" }}>
        TRANSACTION
      </Typography>

      {transaction ? (
        <Paper style={{ padding: "2rem" }}>
          <Typography align="left">{transaction._id}</Typography>

          <Typography variant="h3">{transaction.amount}</Typography>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {!transaction?.ride && (
              <Chip
                label="Wallet"
                style={{ fontSize: "1.2rem", padding: "10px" }}
                icon={<AccountBalanceWalletRounded />}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <img
              crossOrigin="use-credentials"
              style={{
                borderRadius: "50%",
                height: "2rem",
                width: "2rem",
                objectFit: "cover",
              }}
              src={`${BASE_URL}/api/v1/file/${transaction.user.photo}`}
            />
            &nbsp;&nbsp;{transaction.user.name}
          </div>

          <div style={{ marginTop: "2rem" }}>{showDate(transaction.timestamp)}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              fontSize: "2rem",
            }}
          >
            <div>STATUS:&nbsp;</div>
            <div
              style={{
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
            </div>
          </div>
        </Paper>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LoadingPage width="100px" height="100px" />
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
