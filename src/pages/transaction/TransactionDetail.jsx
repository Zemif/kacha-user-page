import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Footer from "../Home/Footer";
import MenuLList from "../MenuLList";
import "./transactionDetail.scss";

const TransactionDetail = () => {
  const location = useLocation();
  const transactionDetails = location.state.transaction;
  console.log(transactionDetails);

  return (
    <div>
      <div>
        <MenuLList />
        <hr></hr>
      </div>
      <div className="displayDetailContainer">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 508,
              height: 328,
            },
          }}
        >
          <Paper>
            <div className="commonContainer">
              <div className="listContianer">
                <label>No</label>
                {transactionDetails.idBrowser}
              </div>
              <div className="listContianer">
                <label>Amount</label>
                {transactionDetails.amount}
              </div>
              <div className="listContianer">
                <label>Description</label>
                {transactionDetails.description}
              </div>
              <div className="listContianer">
                <label>Fee</label>
                {transactionDetails.fee}
              </div>
              <div className="listContianer">
                <label>ID</label>
                {transactionDetails.id}
              </div>
              <div className="listContianer">
                <label>Payee</label>
                {transactionDetails.payee}
              </div>
              <div className="listContianer">
                <label>Payee Account</label>
                {transactionDetails.payee_account}
              </div>
              <div className="listContianer">
                <label>Payee Name</label>
                {transactionDetails.payee_name}
              </div>
              <div className="listContianer">
                <label>Payee Phone</label>
                {transactionDetails.payee_phone}
              </div>
            </div>
          </Paper>
          <Paper>
            <div className="commonContainer">
              <div className="listContianer">
                <label>Payer</label>
                {transactionDetails.payer}
              </div>
              <div className="listContianer">
                <label>Payer Account</label>
                {transactionDetails.payer_account}
              </div>
              <div className="listContianer">
                <label>Payer Name</label>
                {transactionDetails.payer_name}
              </div>
              <div className="listContianer">
                <label>Payer Phone</label>
                {transactionDetails.payer_phone}
              </div>
              <div className="listContianer">
                <label>Process</label>
                {transactionDetails.process}
              </div>
              <div className="listContianer">
                <label>Status</label>
                {transactionDetails.status}
              </div>
              <div className="listContianer">
                <label>Type</label>
                {transactionDetails.type}
              </div>
              <div className="listContianer">
                <label>Transaction Date</label>
                {transactionDetails.updated_at}
              </div>
            </div>
          </Paper>
        </Box>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default TransactionDetail;
