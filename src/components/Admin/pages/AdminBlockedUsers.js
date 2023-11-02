import React, { useState } from "react";
import "./AdminBlockedUsers.css";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AdminFooter from "../components/AdminFooter";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminBlockedUsers() {
  const [blockedDetails, setBlockedDetails] = useState({
    writer: [],
    director: [],
  });
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const blockedUsers = async () => {
      try {
        const response = await axios.get(`/Admin/api/v1/getblockeduser`);
        const blockedData = response.data.blockedUsers;

        // console.log("Blocked Data:", blockedData);

        const writerBlockedUsers = blockedData.filter(
          (user) => user.Role === "writer"
        );
        const directorBlockedUsers = blockedData.filter(
          (user) => user.Role === "director"
        );
        setBlockedDetails({
          writer: writerBlockedUsers,
          director: directorBlockedUsers,
        });

        // setBlockedDetails(response.data);
        // console.log(response.data);
        // console.log("Writer Blocked Users:", writerBlockedUsers);
        // console.log("Director Blocked Users:", directorBlockedUsers);
      } catch (error) {
        console.error("blocked users not found.");
      }
    };
    blockedUsers();
  }, []);
  // console.log(blockedDetails);

  const [restoreText, setRestoretext] = useState("Restore User");

  const unblockUser = async (userId) => {
    try {
      const response = await axios.put(`/Admin/api/v1/unblock/${userId}`);
      console.log(response.data);
      if (response.data) {
        toast.success("User Restored Successfully", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error unblocking the user:", error);
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await axios.delete(`/Admin/api/v1/remove/${userId}`);
      if (response.data) {
        toast.success("User Removed Successfully", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error removing the user:", error);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const [blockedFilters, setBlockedFilters] = useState([]);

  const handleBlockedSearch = (event) => {
    const inputs = event.target.value;
    setSearchInput(inputs);

    if (selectedOption === "writer") {
      const searchBlockedWriters = blockedDetails.writer.filter((user) =>
        user.userName.toLowerCase().includes(inputs.toLowerCase())
      );
      setBlockedFilters(searchBlockedWriters || []);
    } else if (selectedOption === "director") {
      const searchBlockedDirectors = blockedDetails.director.filter((user) =>
        user.userName.toLowerCase().includes(inputs.toLowerCase())
      );
      setBlockedFilters(searchBlockedDirectors || []);
    } else {
      setBlockedFilters([]);
    }
  };

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
                placeholder="Search Username"
                fullWidth
                id="adminBlockedUsersearchBox"
                InputProps={{ style: { border: "none" } }}
                onChange={handleBlockedSearch}
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
                    <Button
                      id="adminBlockedUserChooseWriterbtn"
                      onClick={() => setSelectedOption("writer")}
                    >
                      Writer
                    </Button>
                  </Grid>
                  <Grid item lg={12} id="adminBlockedUserChooseDirector">
                    <Button
                      id="adminBlockedUserChooseDirectorbtn"
                      onClick={() => setSelectedOption("director")}
                    >
                      Director
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {selectedOption === "writer" && (
                <Grid item lg={7}>
                  {searchInput === ""
                    ? blockedDetails.writer.map((content, index) => (
                        <Grid
                          container
                          spacing={0}
                          id="adminBlockedUserdetails"
                          key={index}
                          // marginTop={"3vw"}
                        >
                          <Grid item lg={3}>
                            <img
                              src={content.imageUrl}
                              alt=""
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item flexDirection={"column"} lg={4}>
                            <Box paddingLeft={"1vw"}>
                              <Typography id="adminBlockedUserName">
                                {content.userName}
                              </Typography>
                              <Typography id="adminBlockedUserRole">
                                {content.Role}
                              </Typography>
                              <Typography id="adminBlockedUserMail">
                                {content.email}
                              </Typography>
                              <Typography id="adminBlockedUserNum">
                                {content.contactNumber}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item lg={4}>
                            <Box paddingLeft={"2vw"}>
                              <IconButton
                                onClick={() => unblockUser(content.userid)}
                              >
                                <DoneIcon sx={{ color: "#31D037" }} />
                                <span className="adminBlockedUserrestriction">
                                  Restore User
                                </span>
                              </IconButton>
                              <IconButton
                                onClick={() => removeUser(content.userid)}
                              >
                                <CloseIcon sx={{ color: "#E02323" }} />
                                <span className="adminBlockedUserrestriction">
                                  Remove User
                                </span>
                              </IconButton>
                              {/* <Button id="adminBlockedUserviewbtn">
                            View Details
                          </Button> */}
                            </Box>
                          </Grid>
                        </Grid>
                      ))
                    : blockedFilters.map((content, index) => (
                        <Grid
                          container
                          spacing={0}
                          id="adminBlockedUserdetails"
                          key={index}
                          // marginTop={"3vw"}
                        >
                          <Grid item lg={3}>
                            <img
                              src={content.imageUrl}
                              alt=""
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item flexDirection={"column"} lg={4}>
                            <Box paddingLeft={"1vw"}>
                              <Typography id="adminBlockedUserName">
                                {content.userName}
                              </Typography>
                              <Typography id="adminBlockedUserRole">
                                {content.Role}
                              </Typography>
                              <Typography id="adminBlockedUserMail">
                                {content.email}
                              </Typography>
                              <Typography id="adminBlockedUserNum">
                                {content.contactNumber}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item lg={4}>
                            <Box paddingLeft={"2vw"}>
                              <IconButton
                                onClick={() => unblockUser(content.userid)}
                              >
                                <DoneIcon sx={{ color: "#31D037" }} />
                                <span className="adminBlockedUserrestriction">
                                  Restore User
                                </span>
                              </IconButton>
                              <IconButton
                                onClick={() => removeUser(content.userid)}
                              >
                                <CloseIcon sx={{ color: "#E02323" }} />
                                <span className="adminBlockedUserrestriction">
                                  Remove User
                                </span>
                              </IconButton>
                              {/* <Button id="adminBlockedUserviewbtn">
                            View Details
                          </Button> */}
                            </Box>
                          </Grid>
                        </Grid>
                      ))}
                </Grid>
              )}
              {selectedOption === "director" && (
                <Grid item lg={7}>
                  {searchInput === ""
                    ? blockedDetails.director.map((content, index) => (
                        <Grid
                          container
                          spacing={0}
                          id="adminBlockedUserdetails"
                          key={index}
                          // marginTop={"3vw"}
                        >
                          <Grid item lg={3}>
                            <img
                              src={content.imageUrl}
                              alt=""
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item flexDirection={"column"} lg={4}>
                            <Box paddingLeft={"1vw"}>
                              <Typography id="adminBlockedUserName">
                                {content.userName}
                              </Typography>
                              <Typography id="adminBlockedUserRole">
                                {content.Role}
                              </Typography>
                              <Typography id="adminBlockedUserMail">
                                {content.email}
                              </Typography>
                              <Typography id="adminBlockedUserNum">
                                {content.contactNumber}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item lg={4}>
                            <Box paddingLeft={"2vw"}>
                              <IconButton
                                onClick={() => unblockUser(content.userid)}
                              >
                                <DoneIcon sx={{ color: "#31D037" }} />
                                <span className="adminBlockedUserrestriction">
                                  Restore User
                                </span>
                              </IconButton>
                              <IconButton
                                onClick={() => removeUser(content.userid)}
                              >
                                <CloseIcon sx={{ color: "#E02323" }} />
                                <span className="adminBlockedUserrestriction">
                                  Remove User
                                </span>
                              </IconButton>
                              {/* <Button id="adminBlockedUserviewbtn">
                            View Details
                          </Button> */}
                            </Box>
                          </Grid>
                        </Grid>
                      ))
                    : blockedFilters.map((content, index) => (
                        <Grid
                          container
                          spacing={0}
                          id="adminBlockedUserdetails"
                          key={index}
                          // marginTop={"3vw"}
                        >
                          <Grid item lg={3}>
                            <img
                              src={content.imageUrl}
                              alt=""
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item flexDirection={"column"} lg={4}>
                            <Box paddingLeft={"1vw"}>
                              <Typography id="adminBlockedUserName">
                                {content.userName}
                              </Typography>
                              <Typography id="adminBlockedUserRole">
                                {content.Role}
                              </Typography>
                              <Typography id="adminBlockedUserMail">
                                {content.email}
                              </Typography>
                              <Typography id="adminBlockedUserNum">
                                {content.contactNumber}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item lg={4}>
                            <Box paddingLeft={"2vw"}>
                              <IconButton
                                onClick={() => unblockUser(content.userid)}
                              >
                                <DoneIcon sx={{ color: "#31D037" }} />
                                <span className="adminBlockedUserrestriction">
                                  Restore User
                                </span>
                              </IconButton>
                              <IconButton
                                onClick={() => removeUser(content.userid)}
                              >
                                <CloseIcon sx={{ color: "#E02323" }} />
                                <span className="adminBlockedUserrestriction">
                                  Remove User
                                </span>
                              </IconButton>
                              {/* <Button id="adminBlockedUserviewbtn">
                            View Details
                          </Button> */}
                            </Box>
                          </Grid>
                        </Grid>
                      ))}
                </Grid>
              )}
            </Grid>
          </Container>

          {/* <Grid container spacing={2} marginTop={"5vw"}>
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
          </Grid> */}
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}
export default AdminBlockedUsers;
