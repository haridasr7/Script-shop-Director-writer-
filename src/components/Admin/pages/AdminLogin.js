import React from "react";
import "./AdminLogin.css";
import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

function AdminLogin() {
  const [password, setPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setPassword((prevShowPassword) => !prevShowPassword);
  };

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
              Login to your Account.
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
            <Typography id="admminlogin_signin"> Login</Typography>
            <Box>
              <form action="">
                <TextField
                  id="adminlogin_signinUname"
                  fullWidth
                  label="User Name or Email"
                  type="username or Email "
                  margin="normal"
                />

                <TextField
                  id="adminlogin_signinPwd"
                  label="Password"
                  type={password ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment id="adminlogin_passwordStyle">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {password ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  id="adminlogin_signinButton"
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </form>
              <Link id="adminlogin_signinForgot">Forgot Password</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminLogin;
