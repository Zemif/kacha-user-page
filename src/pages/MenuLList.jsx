import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// import Badge from "@mui/material/Badge";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
//import  stsrt for app bar mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import profileImage from "../../src/assets/profile.jpg";
// import end for app bar mui
import "./menuLList.scss";
import Axios from "./../api/Axios";
import kacha from "./../assets/kacha.png";
import { AuthContext } from "../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
const SEND_MONEY_URL = "api/transfers/send_money";
const AIR_TIME_URL = "api/transfers/airtime";
const PAY_BILL_URL = "/api/transfers/pay";
const REQUEST_MONEY_URL = "/api/users/request_money";
const BILL_PAY_URL = "/api/transfers/bill_pay";

const settings = [
  "Profile",
  "Transaction",
  "ChangePin",
  "ChangePassword",
  "Logout",
];
//bage

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}
//modal
const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const MenuLList = () => {
  const { dispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = currentUser.token;
  const [toggleMenu, setToggleMenu] = React.useState(false);
  // console.log("toekn", token);

  const [settingSelected, setSettingSelected] = useState("");
  const [open, setOpen] = React.useState(false);

  //start app bar
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // setting redirect here
  useEffect(() => {
    // console.log("SElected", settingSelected);
    if (settingSelected === "Profile") {
      setToggleMenu(false);
      navigate("/profile");
    } else if (settingSelected === "Transaction") {
      setToggleMenu(false);
      navigate("/transaction");
    } else if (settingSelected === "Logout") {
      setToggleMenu(false);
      dispatch({ type: "LOGOUT" });
    } else if (settingSelected === "Logout") {
      setToggleMenu(false);
      dispatch({ type: "LOGOUT" });
    } else if (settingSelected === "ChangePin") {
      setToggleMenu(false);
      navigate("/changePin");
    } else if (settingSelected === "ChangePassword") {
      setToggleMenu(false);
      navigate("/changePassword");
    } else {
      console.log("");
    }
  }, [settingSelected]);
  // end of app bar
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [payer, setPayer] = useState("");
  const [reason, setReason] = useState("");
  const [isSendMoney, setIsSendMoney] = useState(false);
  const [isRequestMoney, setisRequestMoney] = useState(false);
  const [isBillPay, setisBillPay] = useState(false);
  const [isAirTime, setIsAirTime] = useState(false);
  const [isPay, setisPay] = useState(false);

  const toOnChangeHandler = (e) => {
    setTo(e.target.value);
  };
  const amountOnChangeHanler = (e) => {
    setAmount(e.target.value);
  };
  const pinOnChangeHandler = (e) => {
    setPin(e.target.value);
  };
  const phoneOnChangeHandler = (e) => {
    setPhone(e.target.value);
  };
  const payerOnChangeHanlder = (e) => {
    setPayer(e.target.value);
  };
  const reasonOnchangeHandler = (e) => {
    setReason(e.target.value);
  };
  //modal start'

  const sendMondyHadler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (token !== null) {
      setOpen(true);
      setIsSendMoney(true);
    } else {
      setOpen(true);
    }
  };

  const sendMoneyData = {
    to: to,
    amount: amount,
    pin: pin,
  };
  const submitSendMondyHadler = async (e) => {
    e.preventDefault();
    console.log("yes");
    try {
      const response = await Axios.post(SEND_MONEY_URL, sendMoneyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.statusText === "OK") {
        if (token !== null) {
          toast.success("Success!");
          setTo("");
          setAmount("");
          setPin("");
          setIsSendMoney(false);
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error("Faild");
      console.log(error);
    }
  };

  // AirTime

  const airTimeHandler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (token !== null) {
      setOpen(true);
      setIsAirTime(true);
    } else {
      setOpen(true);
    }
  };

  const AirTimeData = {
    to: to,
    amount: amount,
    pin: pin,
  };
  const submitAirTimeHadler = async (e) => {
    e.preventDefault();
    console.log("yes");
    try {
      const response = await Axios.post(AIR_TIME_URL, AirTimeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.statusText === "OK") {
        if (token !== null) {
          setTo("");
          setAmount("");
          setPin("");
          toast.success("Success!");
          setIsAirTime(false);
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error("Faild");
      console.log(error);
    }
  };
  // CASH IN
  const cashInHandler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (token !== null) {
      setOpen(true);
      setisRequestMoney(true);
    } else {
      setOpen(true);
    }
  };

  const requestMoneyData = {
    phone: phone,
    amount: amount,
    reason: "",
  };
  const submitRequestMoneyHadler = async (e) => {
    e.preventDefault();
    // console.log("yes");
    try {
      const response = await Axios.post(REQUEST_MONEY_URL, requestMoneyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.statusText === "OK") {
        if (token !== null) {
          setTo("");
          setAmount("");
          setReason("");
          toast.success("Success!");
          setisRequestMoney(false);
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error("Faild");
      console.log(error);
    }
  };
  //Bill pay

  const billPayHandler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (token !== null) {
      setOpen(true);
      setisBillPay(true);
    } else {
      setOpen(true);
    }
  };

  const billPayerData = {
    to: to,
    payer: payer,
    pin: pin,
  };
  const submitBillPayHandler = async (e) => {
    e.preventDefault();
    console.log("yes");
    try {
      const response = await Axios.post(BILL_PAY_URL, billPayerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.statusText === "OK") {
        if (token !== null) {
          setTo("");
          setAmount("");
          setPin("");
          toast.success("Success!");
          setisBillPay(false);
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error("Faild");
      console.log(error);
    }
  };
  // PAY BILL

  const payBillHandler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (token !== null) {
      setOpen(true);
      setisPay(true);
    } else {
      setOpen(true);
    }
  };

  const payBillData = {
    to: to,
    amount: amount,
    pin: pin,
  };
  const submitPayBillHadler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(PAY_BILL_URL, payBillData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.statusText === "OK") {
        if (token !== null) {
          setTo("");
          setAmount("");
          setPin("");
          toast.success("Success!");
          setisPay(false);
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      toast.error("Faild");
      console.log(error);
    }
  };

  const handleCloseSendMoney = () => setIsSendMoney(false);
  const handleCloseRequestMoney = () => setisRequestMoney(false);
  const handleCloseBillPay = () => setisBillPay(false);
  const handleCloseAirTime = () => setIsAirTime(false);
  const handleClosePayBill = () => setisPay(false);

  // modal end

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={kacha} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans">
          <div>
            <Button onClick={sendMondyHadler}>Send Money</Button>
          </div>
        </li>
        <li className="p__opensans">
          <Button onClick={cashInHandler}>Request Money</Button>
        </li>
        <li className="p__opensans">
          <Button onClick={billPayHandler}>Bill Pay</Button>
        </li>

        <li className="p__opensans">
          <Button onClick={airTimeHandler}>Airtime</Button>
        </li>

        <li className="p__opensans">
          <Button onClick={payBillHandler}>Pay</Button>
        </li>

        <li className="p__opensans">
          <AppBar
            position="static"
            style={{
              backgroundColor: "white",
              border: "none",
              marginTop: "-32px",
              borderRadius: "none",
            }}
          >
            <Container
              maxWidth="xl"
              style={{
                backgroundColor: "white",
                width: "0px",
                height: "0px",
              }}
            >
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    className="btn_userNmaeDisplay"
                  >
                    {!currentUser.user.photo ? (
                      <Avatar
                        alt="User"
                        src={profileImage}
                        style={{
                          width: "50px",
                          height: "45px",
                        }}
                      />
                    ) : (
                      <Avatar
                        alt="User"
                        src={currentUser.user.photo}
                        style={{ width: "50px", height: "45px" }}
                      />
                    )}
                  </IconButton>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => setSettingSelected(setting)}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </li>
      </ul>

      <div className="toggleIConStyle">
        <ul>
          <li className="p__opensans">
            <Button onClick={() => setToggleMenu(true)}>
              <MenuIcon className="toggleDisplayHise" />
            </Button>
          </li>

          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <CloseIcon
                fontSize="27px"
                className="overlay__close"
                onClick={() => setToggleMenu(false)}
              />
              <ul className="app__navbar-smallscreen_links">
                <li className="p__opensans">
                  <div>
                    <Button onClick={sendMondyHadler}>Send Money</Button>
                  </div>
                </li>
                <li className="p__opensans">
                  <Button onClick={cashInHandler}>Request Money</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={billPayHandler}>Bill Pay</Button>
                </li>

                <li className="p__opensans">
                  <Button onClick={airTimeHandler}>Airtime</Button>
                </li>

                <li className="p__opensans">
                  <Button onClick={payBillHandler}>Pay</Button>
                </li>

                <li className="p__opensans">
                  <AppBar
                    position="static"
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      marginTop: "-32px",
                      borderRadius: "none",
                    }}
                  >
                    <Container
                      maxWidth="xl"
                      style={{
                        backgroundColor: "white",
                        width: "0px",
                        height: "0px",
                        // marginLeft: "-78px",
                      }}
                    >
                      <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 0 }}>
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                            className="btn_userNmaeDisplay"
                          >
                            {!currentUser.user.photo ? (
                              <Avatar
                                alt="User"
                                src={profileImage}
                                style={{ width: "50px", height: "45px" }}
                              />
                            ) : (
                              <Avatar
                                alt="User"
                                src={currentUser.user.photo}
                                style={{ width: "50px", height: "45px" }}
                              />
                            )}
                            {/* {currentUser.user.username} */}
                          </IconButton>

                          <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                          >
                            {settings.map((setting) => (
                              <MenuItem
                                key={setting}
                                onClick={handleCloseUserMenu}
                              >
                                <Typography
                                  textAlign="center"
                                  onClick={() => setSettingSelected(setting)}
                                >
                                  {setting}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      </Toolbar>
                    </Container>
                  </AppBar>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>

      <div>
        {token && isRequestMoney && (
          <Modal
            open={open}
            onClose={handleCloseRequestMoney}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="menuListContainer">
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 2,
                          display: "flex",
                          width: "290px",
                          marginBottom: 4,

                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="kachLoginLogo">
                          <img
                            src={kacha}
                            style={{ width: "70px", height: "60px" }}
                            alt="Kacha"
                          />
                        </div>
                        <Box noValidate sx={{ mt: 1 }}>
                          <form onSubmit={submitRequestMoneyHadler}>
                            <div className="labelTitle">
                              <h6>Phone</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="phone"
                              type="text"
                              value={phone}
                              onChange={phoneOnChangeHandler}
                              name="Phone"
                              autoComplete="Phone"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Amount</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="amount"
                              label="Amount"
                              type="text"
                              value={amount}
                              onChange={amountOnChangeHanler}
                              name="amount"
                              autoComplete="amount"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Pin</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              value={reason}
                              onChange={reasonOnchangeHandler}
                              name="password"
                              label="Description"
                              type="text"
                              id="password"
                              autoComplete="current-password"
                            />
                            <Button
                              className="loginButton"
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 1 }}
                            >
                              Request Money
                            </Button>
                          </form>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
      <div>
        {token && isBillPay && (
          <Modal
            open={open}
            onClose={handleCloseBillPay}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="menuListContainer">
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 2,
                          display: "flex",
                          width: "290px",
                          marginBottom: 4,

                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="kachLoginLogo">
                          <img
                            src={kacha}
                            style={{ width: "70px", height: "60px" }}
                            alt="Kacha"
                          />
                        </div>
                        <Box noValidate sx={{ mt: 1 }}>
                          <form onSubmit={submitBillPayHandler}>
                            <div className="labelTitle">
                              <h6>Biller Code</h6>
                            </div>
                            <input
                              margin="normal"
                              label="Biller Code"
                              required
                              fullWidth
                              id="biller"
                              type="text"
                              value={to}
                              onChange={toOnChangeHandler}
                              name="biller"
                              autoComplete="email"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Customer ID</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="customer"
                              label="Customer ID"
                              type="text"
                              value={payer}
                              onChange={payerOnChangeHanlder}
                              name="amount"
                              autoComplete="amount"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Pin</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              value={pin}
                              onChange={pinOnChangeHandler}
                              name="password"
                              label="Pin"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                            />

                            <Button
                              className="loginButton"
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 1 }}
                            >
                              Bill Pay
                            </Button>
                          </form>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>

      <div>
        {token && isAirTime && (
          <Modal
            open={open}
            onClose={handleCloseAirTime}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="menuListContainer">
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 2,
                          display: "flex",
                          width: "290px",
                          marginBottom: 4,

                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="kachLoginLogo">
                          <img
                            src={kacha}
                            style={{ width: "70px", height: "60px" }}
                            alt="Kacha"
                          />
                        </div>
                        <Box noValidate sx={{ mt: 1 }}>
                          <form onSubmit={submitAirTimeHadler}>
                            <div className="labelTitle">
                              <h6>Phone</h6>
                            </div>
                            <input
                              margin="normal"
                              label="Phone"
                              required
                              fullWidth
                              id="phone"
                              type="text"
                              value={phone}
                              onChange={phoneOnChangeHandler}
                              name="phone"
                              autoComplete="email"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Amount</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="amount"
                              label="Amount"
                              type="text"
                              value={amount}
                              onChange={amountOnChangeHanler}
                              name="amount"
                              autoComplete="amount"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Pin</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              value={pin}
                              onChange={pinOnChangeHandler}
                              name="password"
                              label="Pin"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                            />

                            <Button
                              className="loginButton"
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 1 }}
                            >
                              TopUp
                            </Button>
                          </form>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>

      <div>
        {token && isSendMoney && (
          <Modal
            open={open}
            onClose={handleCloseSendMoney}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="menuListContainer">
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 2,
                          display: "flex",
                          width: "290px",
                          marginBottom: 4,

                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="kachLoginLogo">
                          <img
                            src={kacha}
                            style={{ width: "70px", height: "60px" }}
                            alt="Kacha"
                          />
                        </div>
                        <Box noValidate sx={{ mt: 1 }}>
                          <form onSubmit={submitSendMondyHadler}>
                            <div className="labelTitle">
                              <h6>To</h6>
                            </div>
                            <input
                              margin="normal"
                              label="To"
                              required
                              fullWidth
                              id="to"
                              type="text"
                              value={to}
                              onChange={toOnChangeHandler}
                              name="to"
                              autoComplete="email"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Amount</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="amount"
                              label="Amount"
                              type="text"
                              value={amount}
                              onChange={amountOnChangeHanler}
                              name="amount"
                              autoComplete="amount"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Pin</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              value={pin}
                              onChange={pinOnChangeHandler}
                              name="password"
                              label="Pin"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                            />

                            <Button
                              className="loginButton"
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 1 }}
                            >
                              Send Money
                            </Button>
                          </form>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>

      <div>
        {token && isPay && (
          <Modal
            open={open}
            onClose={handleClosePayBill}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="menuListContainer">
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 2,
                          display: "flex",
                          width: "290px",
                          marginBottom: 4,

                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="kachLoginLogo">
                          <img
                            src={kacha}
                            style={{ width: "70px", height: "60px" }}
                            alt="Kacha"
                          />
                        </div>
                        <Box noValidate sx={{ mt: 1 }}>
                          <form onSubmit={submitPayBillHadler}>
                            <div className="labelTitle">
                              <h6>Merchant ID</h6>
                            </div>
                            <input
                              margin="normal"
                              label="Merchant ID"
                              required
                              fullWidth
                              id="to"
                              type="text"
                              value={to}
                              onChange={toOnChangeHandler}
                              name="to"
                              autoComplete="to"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Amount</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              id="amount"
                              label="Amount"
                              type="text"
                              value={amount}
                              onChange={amountOnChangeHanler}
                              name="amount"
                              autoComplete="amount"
                              autoFocus
                            />
                            <div className="labelTitle">
                              <h6>Pin</h6>
                            </div>
                            <input
                              margin="normal"
                              required
                              fullWidth
                              value={pin}
                              onChange={pinOnChangeHandler}
                              name="password"
                              label="Pin"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                            />

                            <Button
                              className="loginButton"
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 1 }}
                            >
                              Pay
                            </Button>
                          </form>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </div>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </nav>
  );
};
export default MenuLList;
