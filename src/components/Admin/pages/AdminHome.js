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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHashtag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AdminFooter from "../components/AdminFooter";

function AdminHome() {
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
          <Grid container spacing={3} sx={{ marginTop: "2vw", gap: "3vw" }}>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <div>
                  <FontAwesomeIcon icon={faDollarSign} size="2x" />
                </div>
                <Typography className="adminhomestatPara">
                  Your Revenue
                </Typography>
                <Typography className="adminhomestatnum">$14000</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <FontAwesomeIcon icon={faUser} size="2x" />

                <Typography className="adminhomestatPara">
                  Total Directors
                </Typography>
                <Typography className="adminhomestatnum">1021</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={4} className="adminhomestat">
                <FontAwesomeIcon icon={faUser} size="2x" />

                <Typography className="adminhomestatPara">
                  Total Writers
                </Typography>
                <Typography className="adminhomestatnum">2079</Typography>
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
              <Grid item xs={5}>
                <Paper elevation={5} className="adminhomeusers">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <Box>
                    <Typography className="adminhomeuserName">
                      John Doe
                    </Typography>
                    <Typography className="adminhomeuserRole">
                      Writer
                    </Typography>
                    <Typography className="adminhomeuserContent">
                      Lorem Ipsum dolor sit sit dolor amet consectetur sit
                      adipiscing amet consectetur sit dolor amet{" "}
                    </Typography>
                    <Button
                      className="adminhomeuserMore"
                      variant="contained"
                      sx={{ backgroundColor: "#45b8e9" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper elevation={5} className="adminhomeusers">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <Box>
                    <Typography className="adminhomeuserName">
                      Emmanuelle
                    </Typography>
                    <Typography className="adminhomeuserRole">
                      Director
                    </Typography>
                    <Typography className="adminhomeuserContent">
                      Lorem Ipsum dolor sit sit dolor amet consectetur sit
                      adipiscing amet consectetur sit dolor amet{" "}
                    </Typography>
                    <Button
                      className="adminhomeuserMore"
                      variant="contained"
                      sx={{ backgroundColor: "#45b8e9" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper elevation={5} className="adminhomeusers">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <Box>
                    <Typography className="adminhomeuserName">
                      Emmanuelle
                    </Typography>
                    <Typography className="adminhomeuserRole">
                      Writer
                    </Typography>
                    <Typography className="adminhomeuserContent">
                      Lorem Ipsum dolor sit sit dolor amet consectetur sit
                      adipiscing amet consectetur sit dolor amet{" "}
                    </Typography>
                    <Button
                      className="adminhomeuserMore"
                      variant="contained"
                      sx={{ backgroundColor: "#45b8e9" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper elevation={5} className="adminhomeusers">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <Box>
                    <Typography className="adminhomeuserName">
                      John Doe
                    </Typography>
                    <Typography className="adminhomeuserRole">
                      Director
                    </Typography>
                    <Typography className="adminhomeuserContent">
                      Lorem Ipsum dolor sit sit dolor amet consectetur sit
                      adipiscing amet consectetur sit dolor amet{" "}
                    </Typography>
                    <Button
                      className="adminhomeuserMore"
                      variant="contained"
                      sx={{ backgroundColor: "#45b8e9" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}

export default AdminHome;
