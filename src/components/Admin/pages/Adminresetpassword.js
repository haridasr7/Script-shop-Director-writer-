import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Person2Icon from "@mui/icons-material/Person2";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setnewPassword] = useState("");
  const [token, setToken] = useState(""); // State for the token input
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      // Send a request to the server to reset the password
      await axios.post("/Admin/api/v1/admin/reset-password", { token, newPassword });
      displaySuccessToast("Password reset successful.");
    } catch (error) {
      console.error("Password Reset error:", error);
      displayErrorToast("Password reset failed. Please try again.");
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
              Reset Password
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
            <Typography id="admminlogin_signin"> Reset Password</Typography>
            <Box>
              <form onSubmit={handleResetPassword}>
                {/* Token input field */}
                <TextField
                  id="reset_password_token"
                  fullWidth
                  label="Token"
                  type="text"
                  margin="normal"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />

                {/* New Password input field */}
                <TextField
                  id="reset_password_new_password"
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />

                <Button
                  id="reset_password_button"
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Reset Password
                </Button>
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

export default ResetPassword;
