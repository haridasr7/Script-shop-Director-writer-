import React from "react";
import "./AdminBlockedUsers.css";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AdminFooter from "../components/AdminFooter";

function AdminBlockedUsers() {
  const userDetails = [
    {
      photo: "Images/mediumshortwomen.png",
      name: "Anna Jones",
      role: "Director",
      mail: "annajones1@xvy.com",
      number: "(417) (819)(1234)",
    },
    {
      photo: "Images/mediumshortwomen.png",
      name: "Anna Jones",
      role: "Director",
      mail: "annajones1@xvy.com",
      number: "(417) (819)(1234)",
    },
    {
      photo: "Images/mediumshortwomen.png",
      name: "Anna Jones",
      role: "Director",
      mail: "annajones1@xvy.com",
      number: "(417) (819)(1234)",
    },
    {
      photo: "Images/mediumshortwomen.png",
      name: "Anna Jones",
      role: "Director",
      mail: "annajones1@xvy.com",
      number: "(417) (819)(1234)",
    },
  ];
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item lg={3}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={9}>
          <img src="./Images/ADminblock.png" alt="" style={{ width: "100%" }} />
          <Typography id="adminBlockedheading">Blocked Users</Typography>
          <Typography id="adminBlockedSubheading">
            Find and restore all the users that has been blocked on this site.{" "}
          </Typography>
          <Grid container spacing={0} id="adminBlockedUserblock">
            <Grid item lg={4}>
              <Typography id="adminBlockedUserblockhead">
                Admin &gt; Blocked Users
              </Typography>
            </Grid>
            <Grid item lg={6} paddingLeft={"6vw"}>
              <TextField
                placeholder="Search Here"
                fullWidth
                id="adminBlockedUsersearchBox"
                InputProps={{ style: { border: "none" } }}
              />
            </Grid>
            <Grid item lg={1} marginLeft={"1vw"}>
              <IconButton
                style={{ backgroundColor: "#45B8E9", borderRadius: "50%" }}
                aria-label="search"
              >
                <SearchIcon
                  style={{ color: "#E4E4E4" }}
                  sx={{ fontSize: "40px" }}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Container sx={{ marginTop: "7vw" }}>
            <Grid container spacing={2} gap={"7vw"}>
              <Grid item lg={3}>
                <Grid container spacing={1}>
                  <Grid item lg={12}>
                    <Typography id="adminBlockedUserChoosesec">
                      {" "}
                      Choose Users
                    </Typography>
                  </Grid>
                  <Grid item lg={12} id="adminBlockedUserChooseWriter">
                    Writer
                  </Grid>
                  <Grid item lg={12} id="adminBlockedUserChooseDirector">
                    Director
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={7}>
                {userDetails.map((content, index) => (
                  <Grid
                    container
                    spacing={0}
                    id="adminBlockedUserdetails"
                    key={index}
                    // marginTop={"3vw"}
                  >
                    <Grid item lg={3}>
                      <img
                        src={content.photo}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item flexDirection={"column"} lg={4}>
                      <Box paddingLeft={"1vw"}>
                        <Typography id="adminBlockedUserName">
                          {content.name}
                        </Typography>
                        <Typography id="adminBlockedUserRole">
                          {content.role}
                        </Typography>
                        <Typography id="adminBlockedUserMail">
                          {content.mail}
                        </Typography>
                        <Typography id="adminBlockedUserNum">
                          {content.number}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={4}>
                      <Box paddingLeft={"2vw"}>
                        <IconButton>
                          <DoneIcon sx={{ color: "#31D037" }} />
                          <span className="adminBlockedUserrestriction">
                            Restore User
                          </span>
                        </IconButton>
                        <IconButton>
                          <CloseIcon sx={{ color: "#E02323" }} />
                          <span className="adminBlockedUserrestriction">
                            Remove User
                          </span>
                        </IconButton>
                        <Button id="adminBlockedUserviewbtn">
                          View Details
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Container>
          <Grid container spacing={2} marginTop={"5vw"}>
            <Grid item lg={12} display={"flex"} justifyContent={"center"}>
              <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#">Previous</a>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">7</a>
                <a href="#">Next</a>
                <a href="#">&raquo;</a>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}
export default AdminBlockedUsers;
