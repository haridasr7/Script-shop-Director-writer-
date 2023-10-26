import { React, useState } from "react";
import "./Header.css";
import Menu from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavbarWriter from "./writernavbar/NavbarWriter";
import backgroundImage from "../imagesrc/OBJECTS.png";
import FooterLanding from "./navbarlanding/Footerlanding";
const RoundImage = styled("img")({
  maxWidth: "100%",
  height: "40px",
  borderRadius: "50%",
});
const buttonStyles = {
  borderRadius: "5px",
  border: "1px solid #14ABE4",
  color: "#14ABE4",
  fontWeight: 700,
  background: "#FFF",
};
const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };
  const dropdownContent = (
    <div
      style={{
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "4px",
        position: "absolute",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          textAlign: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ color: "gray", padding: "8px 0" }}>Profile</li>
        <li style={{ color: "gray", padding: "8px 0" }}>Update Password</li>
        <li style={{ color: "gray", padding: "8px 0" }}>Customer Support</li>
        <li style={{ color: "gray", padding: "8px 0" }}>Privacy & Policy</li>
        <li style={{ color: "gray", padding: "8px 0" }}>Logout</li>
      </ul>
    </div>
  );
  return (
    <div>
      <NavbarWriter />
      <div className="writerhomem">
        <div className="DHMS1M">
          <div className="DHMS1D1">
            <img className="DHMS1D1Img" src={backgroundImage} alt="homeimage" />
          </div>
          <div className="DHMS1D2">
            <div className="DHMS1D2S">
              <Typography id="DHMS1D2ST1">
                Who doesn't like watching movies?
              </Typography>
              <Typography id="DHMS1D2ST2">
                <i>Let's watch your movie together</i>
              </Typography>
              <Typography id="DHMS1D2ST4">
                <i>Publish.Connect.Cooperate</i>
              </Typography>
            </div>
          </div>
        </div>
        <Container>
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Your Dashboard</h3>
          </div>
          <div
            className="maincontainer"
            style={{ display: "flex", marginTop: "5%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={6} lg={4}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/Publishscript")}
                >
                  <Card
                    sx={{
                      width: 298,
                      height: 410,
                      borderRadius: 5,
                      border: "1px solid #14ABE4",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 140 }}
                      image={"/images/1.JPG"}
                      alt="Logo"
                      style={{ maxWidth: "100%", height: "auto" }}
                      title="green iguana"
                    />
                  </Card>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4} sm={6}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/myscript")}
                >
                  <Card
                    sx={{
                      width: 298,
                      height: 410,
                      borderRadius: 5,
                      border: "1px solid #14ABE4",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 140 }}
                      image={"/images/12.JPG"}
                      alt="Logo"
                      style={{ maxWidth: "100%", height: "auto" }}
                      title="green iguana"
                    />
                  </Card>
                </div>
              </Grid>
              <div className="centergrid" style={{ marginTop: "1%" }}>
                <Grid item xs={12} md={6} lg={4} sm={6}>
                  <div
                    className="makesmall"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/Analytics")}
                  >
                    <Card
                      sx={{
                        width: 298,
                        height: 410,
                        borderRadius: 5,
                        border: "1px solid #14ABE4",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 140 }}
                        image={"/images/Capture.JPG"}
                        alt="Logo"
                        style={{ maxWidth: "100%", height: "auto" }}
                        title="green iguana"
                      />
                    </Card>
                  </div>
                </Grid>
              </div>
            </Grid>
          </div>
        </Container>
        <br />
        <FooterLanding />
      </div>
    </div>
  );
};
export default Header;
