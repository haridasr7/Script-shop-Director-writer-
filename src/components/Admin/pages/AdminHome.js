import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminHome.css";
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  Item,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHashtag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AdminFooter from "../components/AdminFooter";
import axios from "axios";

function AdminHome() {
  const [userCounts, setUserCounts] = useState({});
  const [userrecentusers, setUserrecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    axios
      .get("/Admin/api/v1/user-counts")
      .then((response) => {
        // Set the user counts to state
        setUserCounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/Admin/api/v1/recently-joined-in-users")
      .then((response) => {
        // Set the user counts to state
        setUserrecent(response.data.users);
        setLoading(false);
        console.log(userrecentusers);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
        setLoading(false);
      });
  }, []);

  const Handleprofile = () => {
    useEffect(() => {});
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",

          flexDirection: "row",
          gap: "5vw",
        }}
      >
        <Grid item lg={3} md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={8} md={8}>
          <Box id="adminhome_headsection">
            <Typography id="adminhomeheader">Hello, Admin !</Typography>
            <Typography id="adminhomeSubheader">
              This is your Dashboard
            </Typography>
          </Box>

          <hr />
          <Box className="adminhomeContent">
            <Typography className="adminhomeContentheader">
              Quick Stats
            </Typography>
            <Typography className="adminhomeContentsubheader">
              This is your current month’s income and order status.
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ gap: "3vw", marginTop: "1vw" }}>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <div>
                  <FontAwesomeIcon icon={faDollarSign} size="2x" />
                </div>
                <Typography className="adminhomestatPara">
                  Your Revenue
                </Typography>
                <Typography className="adminhomestatnum">
                  ${userCounts.totalRevenue}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <FontAwesomeIcon icon={faUser} size="2x" />

                <Typography className="adminhomestatPara">
                  Total Directors
                </Typography>
                <Typography className="adminhomestatnum">
                  ${userCounts.directorCount}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <FontAwesomeIcon icon={faUser} size="2x" />

                <Typography className="adminhomestatPara">
                  Total Writers
                </Typography>
                <Typography className="adminhomestatnum">
                  ${userCounts.writerCount}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box className="adminhomecustomer">
            <Typography className="adminhomeContentheader">
              New Customers
            </Typography>
            <Typography className="adminhomeContentsubheader">
              These are customers who Signed Up Recently.
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: "2vw", gap: "2vw" }}>
              {userrecentusers.map((content, idx) => (
                <Grid item xs={5} key={idx}>
                  <Paper elevation={5} className="adminhomeusers">
                    <FontAwesomeIcon icon={faUser} size="2x" />

                    <Box>
                      <Typography className="adminhomeuserName">
                        {content.userName}
                      </Typography>
                      <br></br>
                      <Typography className="adminhomeuserName">
                        {content.role[0]}
                      </Typography>
                      <br></br>
                      <Typography className="adminhomeuserName">
                        {content.email}
                      </Typography>
                      <br></br>
                      <Typography className="adminhomeuserName">
                        <b>Joined At:</b> {formatDate(content.createdAt)}
                      </Typography>
                      <br></br>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}

export default AdminHome;
