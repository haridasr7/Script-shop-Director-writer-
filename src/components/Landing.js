import React from "react";
import "./Landing.css";
import { logout } from "../actions/userActions";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbarlanding from "./navbarlanding/Navbarlanding";
import FooterLanding from "./navbarlanding/Footerlanding";
const GridContainer = styled("div")({
  flexGrow: 1,
  margin: 0,
  padding: (props) => props.theme.spacing(2),
});
const Card = styled(Paper)({
  borderRadius: 22,
  background: "#F5F5F5",
  boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.10)",
  height: 469,
  padding: (props) => props.theme.spacing(2),
  display: "flex",
  textAlign: "center",
});
const Landing = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout);
  };
  return (
    <div>
      {/* <div className='lfirst' style={{ overflow: "hidden" }}>
                <div style={{ margin: '2%' }} className='header'>
                    <nav className='lnavbar' style={{ display: "flex", alignItems: "center" }}>
                        <div className='mainlogo'>
                            <img src={process.env.PUBLIC_URL + '/images/camera.png'} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                        <div className='llinkss'>
                            <ul className='llinksnav'>
                                <li style={{ color: "#14ABE4" }}>Home</li>
                                <li>Services</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='lbutt'>
                            <Menu className='lmenuicon' ></Menu>
                        </div>
                        <div className='ltwobuttons'>
                            {isAuthenticated ? (
                                <Button class="lcustom-button" variant="contained" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button class="lcustom-button" variant="contained" onClick={() => navigate('/login')}>
                                        Login
                                    </Button>
                                    <Button class="lcustom-button" variant="contained" onClick={() => navigate('/signup')}>
                                        Signup
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div> */}
      <Navbarlanding />
      <Container sx={{ overflowX: "hidden" }}>
        <Grid container spacing={2} style={{ marginTop: "20%" }}>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Container sx={{ overflowX: "hidden", marginTop: { lg: "4vw" } }}>
              <div className="ltwotext">
                <Typography id="LandingHeader1">
                  Publish Your First Script
                </Typography>
                <Typography id="LandingHeader">
                  No more stories unheard
                </Typography>
              </div>
              <div className="onepara">
                <p>
                  This is Absolutely a script sharing platform for Writers and
                  director's. Writers can Showcase your scripts to a global
                  community of directors and the Directors can discover the next
                  blockbuster script! Browse a diverse collection of captivating
                  stories from talented writers. The perfect collaboration
                  awaits!!!
                </p>
              </div>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            sm={6}
            sx={{
              marginTop: { xs: "5vw", sm: "5vw", md: "16px", lg: "0" },
              marginBottom: { xs: "5vw", sm: "5vw", md: "16px", lg: "0" },
            }}
          >
            <img
              src={"/images/landingimage.png"}
              alt="Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={1} style={{ textAlign: { md: "center" } }}>
        <Grid
          item
          lg={4}
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            alignItems: {
              lg: "start",
              md: "center",
              sm: "center",
              xs: "center",
            },
            justifyContent: {
              lg: "start",
              md: "center",
              sm: "center",
              xs: "center",
            },
            marginLeft: { lg: "12vw" },
          }}
        >
          {isAuthenticated ? (
            <Link to="/PublishScript">
              <Button id="lbcustom-button" variant="contained" fullWidth>
                Get Started
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button id="lbcustom-button" variant="contained" fullWidth>
                Get Started
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
      <Container sx={{ marginTop: "4%", overflowX: "hidden" }}>
        <div>
          <Typography id="LandingBenefit">Our Benefits</Typography>
        </div>
        <Container sx={{ marginLeft: "0%", marginTop: "7%" }}>
          <GridContainer>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "9rem",
                }}
              >
                <div style={{ marginBottom: "3rem" }}>
                  <img
                    src="Images/DirectorsImage1.png"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
                <Card
                  className="equal-height-card"
                  style={{
                    height: "auto",
                    textAlign: "left",
                    padding: "2vw",
                    marginBottom: "1rem", // Equal space between image and content
                  }}
                >
                  <div style={{ textAlign: "justify" }}>
                    It allows writers and directors to easily collaborate on
                    film projects, streamlining the scriptwriting process.
                    Directors can scout for fresh talent and unique scripts that
                    might not have been accessible through traditional channels.
                  </div>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "9rem",
                }}
              >
                <div style={{ marginBottom: "3rem" }}>
                  <img
                    src="Images/Landinghead.png"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
                <Card
                  className="equal-height-card"
                  style={{
                    height: "auto",
                    textAlign: "left",
                    alignItems: "center",
                    padding: "2vw",
                    marginBottom: "1rem", // Equal space between image and content
                  }}
                >
                  <div style={{ textAlign: "justify" }}>
                    Analytics tools can provide valuable insights into script
                    engagement, helping writers understand how readers respond
                    to their work. Writers can showcase their scripts to a
                    broader audience, increasing their chances of getting
                    noticed and potentially having their scripts produced.
                  </div>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "9rem",
                }}
              >
                <div style={{ marginBottom: "3rem" }}>
                  <img
                    src="Images/PurchaseHis.png"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>
                <Card
                  className="equal-height-card"
                  style={{
                    height: "auto",
                    textAlign: "left",
                    alignItems: "center",
                    padding: "2vw",
                    marginBottom: "1rem", // Equal space between image and content
                  }}
                >
                  <div style={{ textAlign: "justify" }}>
                    Implementing security features can protect writers'
                    intellectual property and prevent unauthorized use of their
                    work. Users can receive feedback and reviews on their
                    scripts, helping them refine and improve their work.
                  </div>
                </Card>
              </Grid>
            </Grid>
          </GridContainer>
        </Container>
      </Container>
      <br />
      <br />
      <FooterLanding />
    </div>
  );
};
export default Landing;
