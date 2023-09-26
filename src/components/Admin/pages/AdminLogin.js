import React, { useState } from "react";
import "./AdminLogin.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import Person2Icon from "@mui/icons-material/Person2";
<<<<<<< HEAD
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
=======
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/Admin/api/v1/admin/login", formData);
      const { token } = response.data;
      navigate("/AdminHome");
      displaySuccessToast(); // Display success toast on successful login
    } catch (error) {
      console.error("Login error:", error);
      displayErrorToast("Login failed. Please check your credentials."); // Display error toast on login failure
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const displaySuccessToast = () => {
    toast.success("Admin is logged in!", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const displayErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000, // Close the toast after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
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
<<<<<<< HEAD
              Login to your Account.
=======
              Log in to your Account.
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
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
<<<<<<< HEAD
            <Typography id="admminlogin_signin"> Login</Typography>
=======
            <Typography id="admminlogin_signin"> Log In</Typography>
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
            <Box>
              <form onSubmit={handleLogin}>
                <TextField
                  id="adminlogin_signinUname"
                  fullWidth
                  label="Username"
                  type="text"
                  margin="normal"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />

                <TextField
                  id="adminlogin_signinPwd"
                  label="Password"
                  type={password ? "text" : "password"}
                  fullWidth
                  margin="normal"
<<<<<<< HEAD
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
=======
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
                />

                <Button
                  id="adminlogin_signinButton"
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </form>
<<<<<<< HEAD
              <Link id="adminlogin_signinForgot">Forgot Password</Link>
=======
              <span
                id="adminlogin_signinForgot"
                onClick={() => navigate("/Adminforget")} 
                style={{ cursor: "pointer" }}
              >
                Forgot Password ?
              </span>
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
