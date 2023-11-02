import React from "react";
import "./AdminUserDetails.css";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Menu,
  Button,
  MenuItem,
  Box,
  Card,
  styled,
  Select,
  InputLabel,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import AdminSidebar from "../components/AdminSidebar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Person2Icon from "@mui/icons-material/Person2";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import AdminFooter from "../components/AdminFooter";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function AdminUserDetails() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [userDetails, setUserDetails] = useState({
    directors: [],
    writers: [],
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const response = await axios.get("Admin/api/v1/view-users/director");
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          directors: response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchWriter = async () => {
      try {
        const response = await axios.get("Admin/api/v1/view-users/writer");
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          writers: response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDirector();
    fetchWriter();
  }, []);
  // console.log(userDetails);

  // const blockUser = async (userid) => {
  //   try {
  //     const response = await axios.put(`/Admin/api/v1/block/${userid}`);
  //     console.log(response.data);
  //      if (response.data.blockedUser.blocked) {
  //       toast.success("User  Blocked Successfully", {
  //         position: "top-right",
  //         autoClose: 3000, // Close the toast after 3 seconds
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error blocking the user:", error);
  //   }
  // };

  const [blockedUsers, setBlockedUsers] = useState([]);

  // ...

  const blockUser = async (userid) => {
    try {
      // Check if the user is already blocked
      if (blockedUsers.includes(userid)) {
        // User is already blocked, display a message
        toast.warning("User is already blocked.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // User is not blocked, make the block request
        const response = await axios.put(`/Admin/api/v1/block/${userid}`);
        console.log(response.data);
        if (response.data.blockedUser.blocked) {
          // Update the list of blocked users
          setBlockedUsers([...blockedUsers, userid]);

          // Display a success message
          toast.success("User blocked successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.error("Error blocking the user:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (selectedRole === "Writer") {
      const filteredWriters = userDetails.writers?.userRoleDetails.filter(
        (user) => user.userName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filteredWriters || []);
    } else if (selectedRole === "Director") {
      const filteredDirectors = userDetails.directors?.userRoleDetails.filter(
        (user) => user.userName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filteredDirectors || []);
    } else {
      setFilteredUsers([]);
    }
  };
  // console.log(filteredUsers);
  // console.log(userDetails.writers);
  return (
    <div>
      <Grid container spacing={2} gap={"5vw"}>
        <Grid item lg={3}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={8}>
          <Container sx={{ marginTop: "9vw" }}>
            <Typography id="AdminUserDetails_Heading">User Details</Typography>
            <Typography id="AdminUserDetails_SubHeading">
              View all the users on the site.
            </Typography>
            <Grid container spacing={1} marginTop={"4vw"}>
              <Grid item lg={9}>
                <TextField
                  id="AdminUserDetails_SearchField"
                  label=""
                  placeholder="Search for Users"
                  fullWidth
                  sx={{ backgroundColor: "#D9D9D9" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon style={{ fontSize: "37px" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
              </Grid>
              <Grid item lg={3}>
                <FormControl fullWidth>
                  <InputLabel className="AdminUserDetails_dropdowntext">
                    Select
                  </InputLabel>
                  <Select
                    id="AdminUserDetails_DropDown"
                    value={selectedRole || ""}
                    label="Role"
                    onChange={(event) => setSelectedRole(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <IconButton>
                          <Person2Icon />
                        </IconButton>
                      ),
                    }}
                  >
                    <MenuItem
                      value="Director"
                      className="AdminUserDetails_dropdowntext"
                    >
                      Director
                    </MenuItem>
                    <MenuItem
                      value="Writer"
                      className="AdminUserDetails_dropdowntext"
                    >
                      Writer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                backgroundColor: "#E4E4E4",
                height: "5vh",
                marginTop: "5vw",
                marginLeft: "3px",
                marginRight: "-3px",
              }}
            ></Box>
            <Box id="AdminUserDetails_customerMain">
              <Typography id="AdminUserDetails_customerMainHeader">
                Customer List
              </Typography>
            </Box>
            <img
              src="./Images/admintriangle.png"
              alt=""
              style={{ width: "2%", marginLeft: "-1vw" }}
            />
            <Grid
              container
              direction={"row"}
              sx={{
                backgroundColor: "#E4E4E4",
                marginTop: "-6vw",
                marginLeft: "3px",
              }}
            >
              {selectedRole === "Director" && (
                <Grid item lg={12} marginTop={"3vw"} marginLeft={"3px"}>
                  {Array.isArray(userDetails.directors.userRoleDetails) &&
                    (searchQuery === ""
                      ? userDetails.directors.userRoleDetails.map(
                          (user, index) => (
                            <Box
                              className="adminUserhover-container"
                              key={index}
                            >
                              <Grid
                                container
                                spacing={2}
                                gap={"1vw"}
                                padding={"1vw"}
                              >
                                <Grid
                                  item
                                  lg={3}
                                  id="AdminUserDetails_directorimg"
                                >
                                  <img
                                    src={user.imageUrl}
                                    alt=""
                                    style={{ width: "35%" }}
                                  />
                                </Grid>
                                <Grid item lg={5}>
                                  <Box paddingLeft={"1vw"}>
                                    <Typography className="AdminUserDetails_directorName">
                                      {user.userName}
                                    </Typography>
                                    <Typography className="AdminUserDetails_directorRole">
                                      {user.role}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  lg={3}
                                  className="adminUsericon-button-container"
                                >
                                  <Box paddingTop={"2vw"}>
                                    <IconButton
                                      value={user.id}
                                      onClick={() => blockUser(user.userid)}
                                    >
                                      <CancelPresentationSharpIcon />
                                      <span className="AdminUserDetails_BlockDetails">
                                        Block User
                                      </span>
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          )
                        )
                      : filteredUsers.map((user, index) => (
                          <Box className="adminUserhover-container" key={index}>
                            <Grid
                              container
                              spacing={2}
                              gap={"1vw"}
                              padding={"1vw"}
                            >
                              <Grid
                                item
                                lg={3}
                                id="AdminUserDetails_directorimg"
                              >
                                <img
                                  src={user.imageUrl}
                                  alt=""
                                  style={{ width: "35%" }}
                                />
                              </Grid>
                              <Grid item lg={5}>
                                <Box paddingLeft={"1vw"}>
                                  <Typography className="AdminUserDetails_directorName">
                                    {user.userName}
                                  </Typography>
                                  <Typography className="AdminUserDetails_directorRole">
                                    {user.role}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                lg={3}
                                className="adminUsericon-button-container"
                              >
                                <Box paddingTop={"2vw"}>
                                  <IconButton
                                    value={user.id}
                                    onClick={() => blockUser(user.userid)}
                                  >
                                    <CancelPresentationSharpIcon />
                                    <span className="AdminUserDetails_BlockDetails">
                                      Block User
                                    </span>
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        )))}
                </Grid>
              )}
              {selectedRole === "Writer" && (
                <Grid item lg={12} marginTop={"3vw"} marginLeft={"3px"}>
                  {Array.isArray(userDetails.writers.userRoleDetails) &&
                    (searchQuery === ""
                      ? userDetails.writers.userRoleDetails.map(
                          (user, index) => (
                            <Box
                              className="adminUserhover-container"
                              key={index}
                            >
                              <Grid
                                container
                                spacing={2}
                                gap={"1vw"}
                                padding={"1vw"}
                              >
                                <Grid
                                  item
                                  lg={3}
                                  id="AdminUserDetails_writerimg"
                                >
                                  <img
                                    src={user.imageUrl}
                                    alt=""
                                    style={{ width: "35%" }}
                                  />
                                </Grid>
                                <Grid item lg={5}>
                                  <Box paddingLeft={"1vw"}>
                                    <Typography className="AdminUserDetails_directorName">
                                      {user.userName}
                                    </Typography>
                                    <Typography className="AdminUserDetails_directorRole">
                                      {user.role}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  lg={3}
                                  className="adminUsericon-button-container"
                                >
                                  <Box paddingTop={"2vw"}>
                                    <IconButton
                                      value={user.id}
                                      onClick={() => {
                                        blockUser(user.userid);
                                      }}
                                    >
                                      <CancelPresentationSharpIcon />
                                      <span className="AdminUserDetails_BlockDetails">
                                        Block User
                                      </span>
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          )
                        )
                      : filteredUsers.map((user, index) => (
                          <Box className="adminUserhover-container" key={index}>
                            <Grid
                              container
                              spacing={2}
                              gap={"1vw"}
                              padding={"1vw"}
                            >
                              <Grid item lg={3} id="AdminUserDetails_writerimg">
                                <img
                                  src={user.imageUrl}
                                  alt=""
                                  style={{ width: "35%" }}
                                />
                              </Grid>
                              <Grid item lg={5}>
                                <Box paddingLeft={"1vw"}>
                                  <Typography className="AdminUserDetails_directorName">
                                    {user.userName}
                                  </Typography>
                                  <Typography className="AdminUserDetails_directorRole">
                                    {user.role}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                lg={3}
                                className="adminUsericon-button-container"
                              >
                                <Box paddingTop={"2vw"}>
                                  <IconButton
                                    value={user.id}
                                    onClick={() => {
                                      blockUser(user.userid);
                                    }}
                                  >
                                    <CancelPresentationSharpIcon />
                                    <span className="AdminUserDetails_BlockDetails">
                                      Block User
                                    </span>
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        )))}
                </Grid>
              )}
              {/* <Grid
                item
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3vw",
                }}
              >
                <Button
                  fullWidth
                  id="AdminUserDetails_viewDetailsbtn"
                  variant="contained"
                >
                  View Details
                </Button>
              </Grid> */}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}
export default AdminUserDetails;
