import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./activateUser.scss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../../api/Axios";
import { useState, useContext } from "react";
import MenuLList from "../../../pages/MenuLList";
import Footer from "../../../pages/Home/Footer";
import { AuthContext } from "../../../context/AuthContext";
const ACTIVATE_USER_URL = "/api/users/activate";
const ActivateUser = () => {
  const navigate = useNavigate();
  const { dispatch, currentUser } = useContext(AuthContext);
  const token = currentUser.token;
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [passError, setPassError] = useState("");
  const currentPinChangeHandler = (e) => {
    setCurrentPin(e.target.value);
  };
  const newPinChangeHandler = (e) => {
    setNewPin(e.target.value);
  };
  const confirmNewPinChangeHandler = (e) => {
    setConfirmNewPin(e.target.value);
  };
  const changePinData = {
    pin: currentPin,
    new_pin: newPin,
    new_pin_confirmation: confirmNewPin,
  };
  const changePinHandler = async (e) => {
    e.preventDefault();
    if (changePinData.new_pin !== changePinData.new_pin_confirmation) {
      setPassError("Those pin  don't match.");
      setErrMessage("");
    }
    try {
      const response = await Axios.post(ACTIVATE_USER_URL, changePinData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.detail === "Operation Completed Successfully") {
        setErrMessage("");
        setPassError("");
        toast.success("Successfuly Activated!");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.error.detail) {
        setErrMessage(error.response.data.error.detail);
        setPassError("");
      }
    }
  };

  return (
    <div className="activatUserContianer">
      <div>
        <MenuLList />
      </div>
      <div className="activateUserBody">
        <Box
          component="form"
          onSubmit={changePinHandler}
          sx={{
            "& > :not(style)": { m: 1, width: "80em" },
          }}
          // noValidate
          autoComplete="off"
        >
          <hr />
          <div className="titlechangePin">Activate Pin Code</div>
          <div>
            <TextField
              id="filled-b1"
              label="Current PIN"
              // variant="filled"
              onChange={currentPinChangeHandler}
              value={currentPin}
              required
              inputProps={{ minLength: 4, maxlength: 4 }}
              type="password"
            />
          </div>
          <p className="errMessage">{errMessage}</p>
          <div>
            <TextField
              id="filled-b2"
              label="New PIN"
              // variant="filled"
              onChange={newPinChangeHandler}
              value={newPin}
              required
              inputProps={{ minLength: 4, maxlength: 4 }}
              type="password"
            />
          </div>
          <div>
            <TextField
              id="filled-b3"
              label="New PIN Confirmation"
              // variant="filled"
              onChange={confirmNewPinChangeHandler}
              value={confirmNewPin}
              required
              inputProps={{ minLength: 4, maxlength: 4 }}
              type="password"
            />
          </div>
          <p className="errMessage">{passError}</p>
          <div className="bntChangePing">
            <button>Activate</button>
          </div>
        </Box>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ActivateUser;
