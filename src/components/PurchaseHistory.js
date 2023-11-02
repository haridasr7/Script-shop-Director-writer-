import React, { useEffect, useState } from "react";
import "./PurchaseHistory.css";
import NavbarWriter from "./writernavbar/NavbarWriter";
import FooterDirector from "./writernavbar/Footerwriter";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  CardContent,
  Avatar,
  Box,
  styled,
  Select,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { getPurchasedScripts, purchasedScripts } from "../actions/scriptAction";
import { arrayBufferFileLoader } from "@cyntler/react-doc-viewer";

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

  const [script, setScript] = useState([]);
  const [directorData, setDirectorData] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const [directorImage, setDirectorImage] = useState("");
  useEffect(() => {
    const fetchScript = async () => {
      try {
        const response = await axios.get(`/api/v1/getallscripts/${user._id}`);

        setScript(response.data);
      } catch (error) {
        console.error("Script not found.");
      }
    };
    if (isAuthenticated) {
      fetchScript();
    }
  }, [isAuthenticated, user]);

  const fetchDirectorProfile = async () => {
    const directorId = "65265a4e7deb1c71c0773f55"; // Replace with the actual director ID
    try {
      const response = await axios.get(
        `/api/v1/getProfileImageForDirector/${directorId}`,
        {
          responseType: "arraybuffer",
        }
      );
      const base64Str = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageStr = "data:image/jpeg;base64," + base64Str;
      setDirectorImage(imageStr);
      console.log(imageStr);
    } catch (error) {
      console.error("Failed to fetch the director's profile image.", error);
    }
  };

  useEffect(() => {
    fetchDirectorProfile();
  }, []);

  const handleScriptChange = (selectedMovieName) => {
    // setSelectedScript(selectedMovieName); // Set the script state with the selected movie
    let selectedDirectorData = [];

    for (const item of script) {
      if (item.purchaserUsernames) {
        for (const purchase of item.purchaserUsernames) {
          if (purchase.movieName === selectedMovieName) {
            selectedDirectorData.push(purchase);
            handleClose();
          }
        }
      }
    }

    if (selectedDirectorData.length > 0) {
      setDirectorData(selectedDirectorData);

      console.log(directorData);
      // console.log([selectedDirectorData]);
    } else {
      setDirectorData([]); // If no matching director data is found, you can clear the directorData state.
      // console.log(directorData);
    }
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
              {script.map((name, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px solid #D9D9D9",
                  }}
                >
                  <MenuItem
                    key={name.movieName}
                    className="purchaseHistory_dropdownmenu"
                    onClick={() => handleScriptChange(name.movieName)}
                  >
                    {name.movieName}
                  </MenuItem>
                </div>
              ))}
            </StyledMenu>
          </Container>
        </Grid>

        {directorData.length > 0 ? (
          <Box className="purchaseHistory_purchaseddirectorDetails">
            <Grid
              container
              spacing={1}
              padding={"3vw"}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {directorData.map((director, index) => (
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  id="purchaseHistory_purchaseddirectorcontents"
                  key={index}
                >
                  <Box style={BoxStyle} id="Forhover">
                    <Avatar
                      alt="User Avatar"
                      src={director.profile}
                      style={avatarStyle}
                    />

                    <CardContent>
                      <Typography id="purchaseHistory_purchaseddirectorName">
                        {director.userName}
                      </Typography>
                      <Typography id="purchaseHistory_purchaseddirectorAbout">
                        {director.synopsis}
                      </Typography>
                      <Typography id="purchaseHistory_purchasedDate">
                        {director.Date.split("T")[0]}
                        <span id="purchaseHistory_purchasedDatestatus"></span>{" "}
                      </Typography>
                      <Typography id="purchaseHistory_purchasedReadStatus">
                        {director.status}
                      </Typography>
                      {/* <Button
                        variant="contained"
                        id="purchaseHistory_purchasedbtn"
                      >
                        More Details
                      </Button> */}
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <div></div>
        )}
      </Container>

      <div className="purchasehistory_footer">
        <FooterDirector />
      </div>
    </div>
  );
}

export default PurchaseHistory;
