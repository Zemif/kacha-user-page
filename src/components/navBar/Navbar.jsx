import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import MenuIcon from "@mui/icons-material/Menu";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { useNavigate } from "react-router-dom";
// import kacha from "../../assets/kacha.png";
// import { token } from "../../api/Token";
import Radio from "@mui/material/Radio";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./navbar.scss";
import Axios from "../../api/Axios";
import kacha from "../../assets/kacha.png";
import kachaLogin from "../../assets/kachaLogin.png";
import { AuthContext } from "../../context/AuthContext";
//
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
const LOGIN_URL = "api/login";
const SIGNUP_URL = "/api/register";

//modal

const theme = createTheme();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const { dispatch, currentUser } = useContext(AuthContext);
  // const token = currentUser;
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupCliked, setIsSignupClicked] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  //sign up variable
  const [phone, setPhoneNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [referral_code, setReferralCode] = useState("");
  const [id_type, setIdType] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [id_scan, setIDScan] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [zone, setZone] = useState("");
  const [city, setCity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [house_no, setHouseNumber] = useState("");
  const [specification_location, setSpecificLocation] = useState("");
  const [is_business, setIsBusiness] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isTouched, setTouched] = useState(false);

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    toast.success("sucess");
    setIsSignupClicked(true);
    isCreateAccount(true);
    setTouched(false);
    const enteredCustomerInformation = {
      phone: phone,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      gender: gender,
      dob: null,
      referral_code: "1235",
      id_type: null,
      id_number: "124",
      id_scan: null,
      photo: null,
      address: {
        zone: null,
        city: city,
        woreda: woreda,
        kebele: kebele,
        house_no: house_no,
        specific_location: specification_location,
        is_business: is_business,
      },
    };
    try {
      const response = await Axios.post(
        SIGNUP_URL,
        enteredCustomerInformation,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setIsPhoneValid(true);
      toast.success("You have successfully register!");
      // navigate("/dashboard");
    } catch (error) {
      if (error.response.data.phone[0]) {
        setIsPhoneValid(false);
      }
      toast.error(error);
    }
  };
  //end of sign up

  const userNameOnChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const data = {
    username: userName,
    password: password,
  };
  let user, password_reset_required, pin_reset_required, userStatus, tokenValue;
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // setIsCreateAccount(false)
    console.log(data);
    try {
      const response = await Axios.post(LOGIN_URL, data);

      if (response.statusText === "OK") {
        setOpen(true);
        setUserName("");
        setPassword("");
        toast.success("Login Successfully!");
        console.log("userlist", response);
        // user = response.data.token;
        user = response.data;
        password_reset_required = response.data.user.password_reset_required;
        pin_reset_required = response.data.user.pin_reset_required;
        userStatus = response.data.user.status;
        tokenValue = response.data.token;

        console.log(
          "All Data Login",
          user,
          password_reset_required,
          pin_reset_required,
          userStatus,
          tokenValue
        );
        dispatch({ type: "LOGIN", payload: user });
        if (
          (tokenValue && userStatus === "CREATED") ||
          (tokenValue && userStatus === "Created")
        ) {
          navigate("/activateUser");
        } else if (tokenValue && password_reset_required === true) {
          navigate("/changePassword");
        } else if (tokenValue && pin_reset_required === true) {
          navigate("/changePin");
        } else navigate("/dashbord");
      }
    } catch (error) {
      toast.error("Incorrect username or Password");
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    if (currentUser !== null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // AirTime

  const getStartedHandler = (e) => {
    e.preventDefault();
    setToggleMenu(false);
    navigate("/registerUser");
    // setIsGetStarted(true);
  };

  // modal end

  const createAccountSubmitHandler = (e) => {
    e.preventDefault();
    setIsCreateAccount(true);
  };

  const handleClose = () => setOpen(false);
  const hadnleCloseCreateAccount = () => setIsCreateAccount(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={kacha} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans">
          <div>
            <Button onClick={handleOpen}>Send Money</Button>
          </div>
        </li>
        <li className="p__opensans">
          <Button onClick={handleOpen}>Request Money</Button>
        </li>
        <li className="p__opensans">
          <Button onClick={handleOpen}>Bill Pay</Button>
        </li>
        <li className="p__opensans">
          <Button onClick={handleOpen}>Airtime</Button>
        </li>
        {/* <li className="p__opensans">
          <Button onClick={handleOpen}>Pay</Button>
          <Button onClick={handleOpen}>Login</Button>
          <Button onClick={getStartedHandler}>Get Started</Button>
        </li> */}
        <li className="p__opensans">
          <Button onClick={handleOpen}>Pay</Button>
        </li>
        <li className="p__opensans">
          <Button onClick={handleOpen}>Login</Button>
        </li>
        <li className="p__opensans">
          <Button onClick={getStartedHandler}>Get Started</Button>
        </li>
      </ul>

      <div>
        <ul>
          <li className="p__opensans">
            {/* <Button onClick={handleOpen}>Login</Button>
            <Button onClick={getStartedHandler}>Get Started</Button> */}
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
                    <Button onClick={handleOpen}>Send Money</Button>
                  </div>
                </li>
                <li className="p__opensans">
                  <Button onClick={handleOpen}>Request Money</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={handleOpen}>Bill Pay</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={handleOpen}>Airtime</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={handleOpen}>Pay</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={handleOpen}>Login</Button>
                </li>
                <li className="p__opensans">
                  <Button onClick={getStartedHandler}>GetStarted</Button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>

      {!currentUser && !isCreateAccount && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="loginConterFirst">
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        width: "250px",
                        marginBottom: 6,

                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="kachLoginLogo">
                        <img
                          src={kachaLogin}
                          style={{ width: "70px", height: "60px" }}
                          alt="Kacha"
                        />
                      </div>

                      <Box noValidate sx={{ mt: 1 }}>
                        <form onSubmit={onSubmitHandler}>
                          <div className="loginTitle">Login</div>
                          <div className="userNameTitle">
                            <h6>Email or Phone number</h6>
                          </div>

                          <input
                            type="text"
                            required
                            value={userName}
                            onChange={userNameOnChangeHandler}
                          />

                          <div className="passwordTitle">
                            <h6>Password</h6>
                          </div>

                          <input
                            type="password"
                            // placeholder="************"
                            required
                            value={password}
                            onChange={passwordOnChangeHandler}
                          />

                          <Button
                            className="loginButton"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                          >
                            Confirm
                          </Button>
                          <div className="registerYetTitle">
                            <h6>
                              Not registerd yet?
                              <button onClick={createAccountSubmitHandler}>
                                Register Now
                              </button>
                            </h6>
                          </div>
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
      {!currentUser && isCreateAccount && isSignupCliked && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="loginConterFirst">
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        width: "250px",
                        marginBottom: 6,

                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="kachLoginLogo">
                        <img
                          src={kachaLogin}
                          style={{ width: "70px", height: "60px" }}
                          alt="Kacha"
                        />
                      </div>
                      {/* <Typography component="h1" variant="h5">
                        Sign in
                      </Typography> */}

                      <Box noValidate sx={{ mt: 1 }}>
                        <form onSubmit={onSubmitHandler}>
                          <div className="loginTitle">Login</div>
                          <div className="userNameTitle">
                            <h6>Email or Phone number</h6>
                          </div>

                          <input
                            type="text"
                            required
                            value={userName}
                            onChange={userNameOnChangeHandler}
                          />

                          <div className="passwordTitle">
                            <h6>Password</h6>
                          </div>

                          <input
                            type="password"
                            placeholder="************"
                            required
                            value={password}
                            onChange={passwordOnChangeHandler}
                          />

                          <Button
                            className="loginButton"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                          >
                            Confirm
                          </Button>
                          <div className="registerYetTitle">
                            <h6>
                              Not registerd yet?
                              <button onClick={createAccountSubmitHandler}>
                                Register Now
                              </button>
                            </h6>
                          </div>
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
      {!currentUser && isCreateAccount && !isSignupCliked && (
        <Modal
          open={open}
          onClose={hadnleCloseCreateAccount}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="loginConterFirst">
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        width: "280px",
                        marginBottom: 2,

                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="kachLoginLogo">
                        <img
                          src={kachaLogin}
                          style={{ width: "70px", height: "60px" }}
                          alt="Kacha"
                        />
                      </div>
                      {/* <Typography component="h1" variant="h5">
                        Sign in
                      </Typography> */}

                      <Box noValidate sx={{ mt: 1 }}>
                        <form onSubmit={signUpSubmitHandler}>
                          <div className="createAccountTitle">
                            Create Account
                          </div>
                          <div className="leftAndRightConainer">
                            <div className="leftSideContainer">
                              <div className="userNameTitle">
                                <h6>First Name</h6>
                              </div>

                              <input
                                type="text"
                                required
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>Last Name</h6>
                              </div>
                              <input
                                type="text"
                                required
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>Phone Number</h6>
                              </div>
                              <input
                                type="text"
                                required
                                value={phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>User Name</h6>
                              </div>
                              <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                            </div>

                            <div className="rightSideContainer">
                              <div className="userNameTitle">
                                <h6>Email</h6>
                              </div>
                              <input
                                type="text"
                                required
                                value={middle_name}
                                onChange={(e) => setMiddleName(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>Password</h6>
                              </div>
                              <input
                                type="password"
                                placeholder="************"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>Confrim Password</h6>
                              </div>
                              <input
                                type="password"
                                required
                                placeholder="*************"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                              <div className="userNameTitle">
                                <h6>Gender</h6>
                              </div>
                              <dvi className="btnGender">
                                <span>
                                  <Radio
                                    className="btnMale"
                                    checked={gender === "Male"}
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <p className="maleAndFemale"> Male</p>
                                </span>
                                <span>
                                  <Radio
                                    className="btnFemele"
                                    checked={gender === "Female"}
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <p className="maleAndFemale">Female</p>
                                </span>
                              </dvi>
                            </div>
                          </div>
                          <Button
                            className="confirmButton"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                          >
                            Confirm
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
    </nav>
  );
};

export default Navbar;
