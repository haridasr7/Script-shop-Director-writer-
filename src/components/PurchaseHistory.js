import React from "react";
import "./PurchaseHistory.css";
import NavbarWriter from "./writernavbar/NavbarWriter";
import FooterDirector from "./writernavbar/Footerwriter";

import {
  Grid,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  Box,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#45b8e9",
  },
}));

function PurchaseHistory() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownContent = [
    {
      img: "/images/scriptimg.png",
      scriptName: "The Bridge  across Paradise",
    },
    {
      img: "/images/scriptimg.png",
      scriptName: "Lorem Ipsum",
    },
    {
      img: "/images/scriptimg.png",
      scriptName: "Lorem Ipsum",
    },
    {
      img: "/images/scriptimg.png",
      scriptName: "sandhesham",
    },
  ];
  const directorDetails = [
    {
      photo: "/images/directorimg.png",
      name: "Director’s Name",
      about: "Lorem Ipsum Dolor Sit amet consectetur sit adipis",
      purchaseDate: "May 9 22 ",
      purchasedStatus: "(Purchased On)",
      status: "Script Viewed",
      btn: "More Details",
    },
    {
      photo: "/images/directorimg.png",
      name: "Director’s Name",
      about: "Lorem Ipsum Dolor Sit amet consectetur sit adipis",
      purchaseDate: "May 9 22",
      purchasedStatus: "(Purchased On)",
      status: "Script Viewed",
      btn: "More Details",
    },
    {
      photo: "/images/directorimg.png",
      name: "Director’s Name",
      about: "Lorem Ipsum Dolor Sit amet consectetur sit adipis",
      purchaseDate: "May 9 22 ",
      purchasedStatus: "(Purchased On)",
      status: "Script Viewed",
      btn: "More Details",
    },
    {
      photo: "/images/directorimg.png",
      name: "Director’s Name",
      about: "Lorem Ipsum Dolor Sit amet consectetur sit adipis",
      purchaseDate: "May 9 22 ",
      purchasedStatus: "(Purchased On)",
      status: "Script Viewed",
      btn: "More Details",
    },
    {
      photo: "/images/directorimg.png",
      name: "Director’s Name",
      about: "Lorem Ipsum Dolor Sit amet consectetur sit adipis",
      purchaseDate: "May 9 22 ",
      purchasedStatus: "(Purchased On)",
      status: "Script Viewed",
      btn: "More Details",
    },
  ];

  const BoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    position: "relative",
    backgroundColor: "#E4E4E4",
    borderRadius: " 13.237px",
  };

  const avatarStyle = {
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "-50px",
    borderRadius: "50%",
    border: "4px solid #fff",
  };

  return (
    <div>
      <div className="purchasehistory_header">
        <NavbarWriter />
      </div>
      <Grid container spacing={2} className="purchaseHistory_banner">
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1vw",
            gap: "1vw",
          }}
          lg={7}
          md={7}
          sm={7}
          xs={6}
        >
          <Typography id="purchaseHistory_leftheading">
            Purchase History
          </Typography>
          <Typography id="purchaseHistory_leftsub">
            Scripts that shapes your vision
          </Typography>
          <Typography id="purchaseHistory_leftpara">
            Your purchase history tells a story of the scripts that have
            inspired your cinematic vision.
          </Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={6} sx={{ marginTop: "1vw" }}>
          <div>
            <img
              src="./Images/PurchaseHis.png"
              alt=""
              className="publishHistory_rightimg"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: "#EBE7E7" }}
        id="publishHistory_scriptPublished"
      >
        <Grid item sx={{ textAlign: "center" }} lg={12}>
          <Typography className="publishHistory_purchaseHeading">
            Scripts Published
          </Typography>
          <Typography id="publishHistory_purchasesubhead">
            Explore diverse scripts from talented writers.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "space-evenly",
          backgroundColor: "#EBE7E7",
          marginBottom: "2vw",
        }}
      >
        <Grid item lg={2} md={2} sm={4} xs={4} marginBottom={"6vw"}>
          <img src="./Images/scriptimg.png" alt="" style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={2} md={2} sm={4} xs={4}>
          <img src="./Images/scriptimg.png" alt="" style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={2} md={2} className="hide_image">
          <img src="./Images/scriptimg.png" alt="" style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={2} md={2} sm={0} xs={0} className="hide_image">
          <img src="./Images/scriptimg.png" alt="" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2} sx={{ marginTop: "6vw" }}>
          <Grid item sx={{ textAlign: "center" }} lg={12}>
            <Typography className="publishHistory_purchaseHeading">
              Scripts Purchased
            </Typography>
            <Typography id="publishHistory_purchasesubhead2">
              Record of your artistic choices that have paved the way for your
              unique directional path.
            </Typography>
          </Grid>

          <Container className="purchasehistory_scriptdetails" maxWidth="lg">
            <Typography id="purchaseHistory_purchasedscriptDetails">
              Choose a script from the Drop Down Menu, to see more Details.
            </Typography>
            <Button
              id="purchasehistory_dropdownbtn"
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
            >
              Script Name
            </Button>
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {dropdownContent.map((name, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px solid #D9D9D9",
                  }}
                >
                  <img
                    src={name.img}
                    className="purchaseHistory_dropdownmenuimg"
                    style={{ width: "fitContent" }}
                  />
                  <MenuItem className="purchaseHistory_dropdownmenu">
                    {name.scriptName}
                  </MenuItem>
                </div>
              ))}
            </StyledMenu>
          </Container>
        </Grid>

        <Box className="purchaseHistory_purchaseddirectorDetails">
          <Grid container spacing={2} padding={"3vw"}>
            {directorDetails.map((item, index) => (
              <Grid
                item
                lg={4}
                md={4}
                sm={6}
                key={index}
                id="purchaseHistory_purchaseddirectorcontents"
              >
                <Box style={BoxStyle} id="Forhover">
                  <Avatar
                    alt="User Avatar"
                    src={item.photo}
                    style={avatarStyle}
                  />
                  <CardContent>
                    <Typography id="purchaseHistory_purchaseddirectorName">
                      {item.name}{" "}
                    </Typography>
                    <Typography id="purchaseHistory_purchaseddirectorAbout">
                      {item.about}{" "}
                    </Typography>
                    <Typography id="purchaseHistory_purchasedDate">
                      {item.purchaseDate} &nbsp;{" "}
                      <span id="purchaseHistory_purchasedDatestatus">
                        {item.purchasedStatus}
                      </span>{" "}
                    </Typography>
                    <Typography id="purchaseHistory_purchasedReadStatus">
                      {item.status}{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      id="purchaseHistory_purchasedbtn"
                    >
                      {item.btn}{" "}
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <div className="purchasehistory_footer">
        <FooterDirector />
      </div>
    </div>
  );
}

export default PurchaseHistory;
