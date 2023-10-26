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
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Person2Icon from "@mui/icons-material/Person2";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import AdminFooter from "../components/AdminFooter";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(3),
    minWidth: 200,
    backgroundColor: "#F4F4F4",
    borderBottom: 1,
  },
}));

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

  const [buttonText, setButtonText] = useState("Block user");

  const blockUser = async (userid) => {
    try {
      const response = await axios.put(`/Admin/api/v1/block/${userid}`);
      console.log(response.data);
      setButtonText("Blocked");
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
                  sx={{ backgroundColor: "#d9d9d9" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon style={{ fontSize: "37px" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={3}>
                <Button
                  id="AdminUserDetails_DropDown"
                  endIcon={<KeyboardArrowDownIcon />}
                  startIcon={
                    <Person2Icon
                      style={{
                        border: "1px solid #FFF",
                        color: "white",
                        fontSize: "35px",
                      }}
                    />
                  }
                  onClick={handleClick}
                  fullWidth
                >
                  Select
                </Button>
                <StyledMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>Director</MenuItem>
                  <MenuItem>Director</MenuItem>
                </StyledMenu>
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
                                        {buttonText}
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
                                      {buttonText}
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
                                        {buttonText}
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
                                      {buttonText}
                                    </span>
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        )))}
                </Grid>
              )}

              <Grid
                item
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3vw",
                }}
              >
                {/* <Button
                  fullWidth
                  id="AdminUserDetails_viewDetailsbtn"
                  variant="contained"
                >
                  View Details
                </Button> */}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <AdminFooter />
    </div>
  );
}

export default AdminUserDetails;
