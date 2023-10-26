import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Person2Icon from "@mui/icons-material/Person2";
import { Link, useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      // Send a request to the server to initiate the password reset
      await axios.post("/Admin/api/v1/admin/forgot-password", { email });
      displaySuccessToast("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Forgot Password error:", error);
      displayErrorToast("Failed to send password reset email.");
    }
  };

  const displaySuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const displayErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
              Forgot Password
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
            <Typography id="admminlogin_signin"> Forgot Password</Typography>
            <Box>
              <form onSubmit={handleForgotPassword}>
                <TextField
                  id="forgot_password_email"
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  id="forgot_password_button"
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Send Reset Email
                </Button>

                <span
                  id="adminlogin_signinForgot"
                  onClick={() => navigate("/AdminLogin")}
                  style={{ cursor: "pointer" }}
                >
                  Login ?
                </span>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
