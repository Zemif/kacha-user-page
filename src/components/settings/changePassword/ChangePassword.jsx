import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./changePassword.scss";
import Axios from "../../../api/Axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MenuLList from "../../../pages/MenuLList";
import Footer from "../../../pages/Home/Footer";
import { AuthContext } from "../../../context/AuthContext";
const CHANGE_PASSWORD_URL = "/api/users/change_password";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { dispatch, currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  const token = currentUser.token;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [passError, setPassError] = useState();
  const [errMessage, setErrMessage] = useState("");
  const oldPasswordChangeHandler = (e) => {
    setOldPassword(e.target.value);
  };
  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const newPasswordConfirmationChangeHandler = (e) => {
    setNewPasswordConfirmation(e.target.value);
  };
  const changePassword = {
    old_password: oldPassword,
    new_password: newPassword,
    new_password_confirmation: newPasswordConfirmation,
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    if (
      changePassword.new_password !== changePassword.new_password_confirmation
    ) {
      setPassError("Those Passwords don't match.");
      setErrMessage("");
    }
    try {
      const response = await Axios.post(CHANGE_PASSWORD_URL, changePassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.detail === "Operation Completed Successfully") {
        setErrMessage("");
        setPassError("");
        toast.success("You have changed your password successfuly");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
      // console.log(response.data.detail);
      // toast.success("You have changed your password successfuly");
      //dispatch({ type: "LOGOUT" });
      //navigate("/");
    } catch (error) {
      // setErrMessage(error.response.data);
      // if (error.response.data.old_password[0])
      //   setErrMessage(error.response.data.old_password[0]);
      if (error.response.data.error.detail) {
        setErrMessage(error.response.data.error.detail);
        setPassError("");
      }

      // else setErrMessage("");
    }
  };

  return (
    <div className="changePasswoedContianer">
      <div>
        <MenuLList />
      </div>
      <div className="chagnePasswordBody">
        <Box
          component="form"
          onSubmit={changePasswordHandler}
          sx={{
            "& > :not(style)": { m: 1, width: "80em" },
          }}
          // noValidate
          autoComplete="off"
        >
          <hr />
          <div className="titeleChagePassword">Change Password</div>
          <div>
            <TextField
              id="filled-b1"
              label="Old Password"
              // variant="filled"
              onChange={oldPasswordChangeHandler}
              value={oldPassword}
              required
              inputProps={{ minLength: 8, maxlength: 20 }}
              type="password"
            />
          </div>
          <p className="errorMessage"> {errMessage}</p>
          <div>
            <TextField
              id="filled-b2"
              label="New Password"
              onChange={newPasswordChangeHandler}
              value={newPassword}
              required
              inputProps={{ minLength: 8, maxlength: 20 }}
              type="password"
            />
          </div>
          <div>
            <TextField
              id="filled-b3"
              label="New Password Confirmation"
              onChange={newPasswordConfirmationChangeHandler}
              value={newPasswordConfirmation}
              required
              inputProps={{ minLength: 8, maxlength: 20 }}
              type="password"
            />
          </div>
          <p className="errorMessage">{passError}</p>
          <div className="btnChangePassword">
            <button>Confirm</button>
          </div>
        </Box>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ChangePassword;
