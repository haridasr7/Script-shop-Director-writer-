import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Pagination, Paper } from "@mui/material";
import Navbar from "../component/NavbarDirector";
import FooterDirector from "../component/FooterDirector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import "./services.css";
import {
  clearAuthError,
  clearauthMessage,
  sendContactUsForm,
} from "../../../actions/userActions";
import NavbarWriter from "../../writernavbar/NavbarWriter";
import Navbarlanding from "../../navbarlanding/Navbarlanding";
import FooterLanding from "../../navbarlanding/Footerlanding";
import Footerwriter from "../../writernavbar/Footerwriter";
import Carousel from "react-material-ui-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Grid, Typography } from "@mui/material";

function Services() {
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            {user ? (
              user.role[0] === "director" ? (
                <Navbar />
              ) : (
                <NavbarWriter />
              )
            ) : (
              <Navbarlanding />
            )}
          </div>

          <Grid container spacing style={{ paddingTop: "95px" }}>
            <Grid
              item
              lg={5}
              md={5}
              sm={5}
              sx={{ marginTop: { lg: "15vw", md: "13vw", sm: "8vw" } }}
            >
              <div style={{ paddingLeft: "7vw" }}>
                <Typography id="serviceHeader">
                  Our Passion Makes Your’s Success.
                </Typography>
                <Typography id="serviceSubhead">
                  We made the most convenient, practical, time-saving way to
                  share and buy scripts through ScriptShop.Writers can share
                  their scripts with larger audiences and Directors can buy
                  scripts from a vast variety. Easy, Effective, Economical!!
                </Typography>
                {isAuthenticated ? (
                  user.role[0] === "writer" ? (
                    <Link to="/PublishScript">
                      <Button variant="contained" id="serviceGetStart">
                        Get Started
                      </Button>
                    </Link>
                  ) : user.role[0] === "director" ? (
                    <Link to="/Directorhome">
                      <Button variant="contained" id="serviceGetStart">
                        Get Started
                      </Button>
                    </Link>
                  ) : null
                ) : (
                  <Link to="/login">
                    <Button variant="contained" id="serviceGetStart">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7}>
              <img
                src="Images/servicesFirst.png"
                alt=""
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
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
              {" "}
              {isAuthenticated ? (
                user.role[0] === "writer" ? (
                  <Link to="/PublishScript">
                    <Button variant="contained" id="serviceGetStart2">
                      Get Started
                    </Button>
                  </Link>
                ) : user.role[0] === "director" ? (
                  <Link to="/Directorhome">
                    <Button variant="contained" id="serviceGetStart2">
                      Get Started
                    </Button>
                  </Link>
                ) : null
              ) : (
                <Link to="/login">
                  <Button variant="contained" id="serviceGetStart2">
                    Get Started
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>

          <div style={{ textAlign: "center" }}>
            <Typography id="serviceshead2">
              We Provide the Best Services
            </Typography>
          </div>

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: { lg: "3vw", md: "3vw", sm: "3vw", xs: "3vw" },
              marginBottom: { xs: "8vw", lg: "6vw" },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="servicesDirectorHead">
                <Typography id="servicesDirector">Directors</Typography>
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { lg: "2.5vw", md: "2.5vw", sm: "5vw", xs: "6vw" },
              marginTop: "5vw",
            }}
          >
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">Convenience</Typography>
                <Typography id="serviceUsersCardBody">
                  Directors can easily access a variety of scripts on the
                  platform.
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">
                  Diverse Selection
                </Typography>
                <Typography id="serviceUsersCardBody">
                  The platform can offer scripts of various genres, styles, and
                  themes
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">
                  Cost Efficiency
                </Typography>
                <Typography id="serviceUsersCardBody">
                  Purchasing scripts from the platform might be more
                  cost-effective.
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">
                  Talent Discovery
                </Typography>
                <Typography id="serviceUsersCardBody">
                  Directors can discover new and emerging writing talents while
                  fostering creativity
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: { lg: "3vw", md: "3vw", sm: "3vw", xs: "3vw" },
              marginBottom: { xs: "8vw", lg: "6vw" },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4vw",
              }}
            >
              <div className="servicesDirectorHead">
                <Typography id="servicesDirector">Writers</Typography>
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { lg: "2.5vw", md: "2.5vw", sm: "5vw", xs: "6vw" },
              marginTop: "5vw",
              marginBottom: "8vw",
            }}
          >
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">Exposure</Typography>
                <Typography id="serviceUsersCardBody">
                  showcase your work to a larger audience of potential buyers.
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">Income</Typography>
                <Typography id="serviceUsersCardBody">
                  Selling scripts can provide writers with a source of income
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">Networking</Typography>
                <Typography id="serviceUsersCardBody">
                  The platform can facilitate connections between writers and
                  directors
                </Typography>
              </div>
            </Grid>
            <Grid item lg={2.5} md={2.5} sm={5} xs={10}>
              <div className="serviceUsersCard">
                <Typography id="serviceUsersCardHead">Feedback</Typography>
                <Typography id="serviceUsersCardBody">
                  Writers can receive feedback from directors
                </Typography>
              </div>
            </Grid>
          </Grid>

          {user ? (
            user.role[0] === "director" ? (
              <FooterDirector />
            ) : (
              <Footerwriter />
            )
          ) : (
            <FooterLanding />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Services;
