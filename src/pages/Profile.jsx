import React, { useContext } from "react";

import "./profile.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import profileImage from "./../assets/profile.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
//avator
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthContext } from "../context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuLList from "./MenuLList";
import Footer from "./Home/Footer";

const theme = createTheme();

// start avator

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// const SmallAvatar = styled(Avatar)(({ theme }) => ({
//   width: 22,
//   height: 22,
//   border: `2px solid ${theme.palette.background.paper}`,
// }));
//end avator

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userProfile = currentUser.user;
  const navigate = useNavigate();
  //   console.log("pro", userProfile);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div>
      <div>
        <MenuLList />
      </div>
      <div className="profileContainer">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    {!userProfile.photo ? (
                      <Avatar
                        alt="User"
                        src={profileImage}
                        style={{ width: "180px", height: "150px" }}
                      />
                    ) : (
                      <Avatar
                        alt="User"
                        src={userProfile.photo}
                        style={{ width: "180px", height: "150px" }}
                      />
                    )}
                  </StyledBadge>
                </Stack>
              </div>

              <div className="userProfileName">
                <Typography component="h1" variant="h6">
                  {`${userProfile.first_name} ${userProfile.last_name}`}
                </Typography>
              </div>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {/* <div className="profileListLabel">
                      <label>First Name</label>
                    </div>
                    <div className="profileListLabel">
                      <label>Last Name</label>
                    </div> */}
                    <div className="profileListLabel pl">
                      <label>Phone</label>
                    </div>

                    <div className="profileListLabel pl">
                      <label>Group</label>
                    </div>
                    <div className="profileListLabel pl">
                      <label>Role</label>
                    </div>
                    <div className="profileListLabel pl">
                      <label>Language</label>
                    </div>
                    <div className="profileListLabel pl">
                      <label>Balance</label>
                    </div>

                    <div className="profileListLabel pl">
                      <label>Status</label>
                    </div>
                    <div className="profileListLabel pl">
                      <label>Username</label>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="profileListLabel">{userProfile.phone}</div>
                    <div className="profileListLabel">{userProfile.group}</div>
                    <div className="profileListLabel">{userProfile.role}</div>
                    <div className="profileListLabel">
                      {userProfile.language}
                    </div>
                    <div className="profileListLabel">
                      {userProfile.balance}
                    </div>
                    <div className="profileListLabel">{userProfile.status}</div>
                    <div className="profileListLabel">
                      {userProfile.username}
                    </div>
                  </Grid>
                </Grid>
                <Button
                  onClick={() => navigate("/dashbord")}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  style={{
                    backgroundColor: "#ffea00",
                    color: "black",
                  }}
                >
                  Go Back
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;

// balance: -33120
// first_name: "zzzz"
// group: "BRA"
// language: "am"
// last_name: "dfasdfdsaf"
// password_reset_required: true
// phone: "+251911111111"
// photo: null
// pin_reset_required: true
// role: "MANAGER"
// status: "LOCKED"
// url: "https://dev2.kachapay.net/api/users/5000000265178"
// : "+251911111111"
