import React from "react";
import "./AdminLogin.css";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

function AdminLogin() {
  return (
    <div>
      <Grid container spacing={2} gap={"3vw"}>
        <Grid item sx={{ marginTop: "9vw", marginLeft: "4vw" }} lg={6} md={6}>
          <Box className="adminloginwelcomeSection">
            <Box className="adminLoginWelcomeBanner">Welcome, Admin !</Box>
            <img
              src={"./images/Rectangle.svg"}
              alt=""
              style={{ marginLeft: "4px" }}
            />
            <Typography id="adminloginwelcomeSubhead">
              Sign in to your Account.
            </Typography>
            <Box>
              <img
                src={"./images/TransparentBackground.png"}
                alt=""
                className="adminloginwelcomeimg"
              />
              <img
                src={"./images/Elipse.png"}
                alt=""
                style={{ width: "26vw", marginLeft: "11vw", marginTop: "2vw" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item sx={{ marginTop: "9vw" }} lg={5} md={5}>
          <Box className="adminlogin_signinSection">
            <Box className="adminlogin_siginIcon">
              <Person2Icon style={{ fontSize: "50px", color: "#A8A8A8" }} />
            </Box>
            <Typography id="admminlogin_signin"> Sign In</Typography>
            <Box>
              <form action="">
                <TextField
                  id="adminlogin_signinUname"
                  fullWidth
                  label="User Name"
                  type="username"
                  margin="normal"
                />

                <TextField
                  id="adminlogin_signinPwd"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <Button
                  id="adminlogin_signinButton"
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </form>
              <Link id="adminlogin_signinForgot">Forgot Password ?</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminLogin;
