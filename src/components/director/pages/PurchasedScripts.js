import React, { Fragment, useEffect, useState, useRef } from "react";
import { Button, Card, Typography, Pagination, Paper } from "@mui/material";
import Navbar from "../component/NavbarDirector";
import FooterDirector from "../component/FooterDirector";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import "./purchasedScripts.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MuiCarousel from "react-material-ui-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  clearIsUpdated,
  clearSuccessMessage,
  clearloadingError,
  getPurchasedScripts,
} from "../../../actions/scriptAction";
function PurchasedScripts() {
  function Item(props) {
    return (
      <Paper>
        <div className="PSS1S2ImgD">
          <img
            className="PSS1Img"
            src={props.item.fileUrl}
            alt="purchasedScript"
          />
        </div>
        <div className="PSS1S2D2">
          <div className="PSS1S2D2S1">
            <Typography id="PSS1S2T1">{props.item.movieName}</Typography>
            <Typography id="PSS1S2T2">
              <i>{`${props.item.synopsis
                .split(" ")
                .slice(0, 20)
                .join(" ")}...`}</i>
            </Typography>
            <Button
              onClick={() => handleReadNow(props.item.scriptFile)}
              id="PSS1S2B1"
            >
              Read Now
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
  function ItemTab(props) {
    return (
      <Paper>
        <div className="PSS1S2ImgDTab">
          <img
            className="PSS1ImgTab"
            src={props.item.fileUrl}
            alt="purchasedScript"
          />
        </div>
        <div className="PSS1S2D2Tab">
          <div className="PSS1S2D2S1Tab">
            <Button
              onClick={() => handleReadNow(props.item.scriptFile)}
              id="PSS1S2B1Tab"
            >
              Read Now
            </Button>
            <Typography id="PSS1S2T1Tab">{props.item.movieName}</Typography>
            <Typography id="PSS1S2T2Tab">
              <i>{`${props.item.synopsis
                .split(" ")
                .slice(0, 20)
                .join(" ")}...`}</i>
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 425 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const responsive1 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  // const pss1s2d2Ref = useRef(null);
  // const [pss1s2d2Height, setPss1s2d2Height] = useState(0);
  // useEffect(() => {
  //     if (pss1s2d2Ref.current) {
  //       // Calculate and set the height
  //       const height = pss1s2d2Ref.current.clientHeight;
  //       setPss1s2d2Height(height+60);
  //     }
  //   }, []);
  const { loading, error, message, scripts, purchasedScripts } = useSelector(
    (state) => state.scriptsState
  );
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      dispatch(getPurchasedScripts(user._id));
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearloadingError);
        },
      });
    }
  }, [error]);
  useEffect(() => {
    if (message) {
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => {
          dispatch(clearSuccessMessage);
        },
      });
    }
  }, [message]);
  const handleReadNow = (scriptId) => {
    navigate(`/readscript/${scriptId}`);
  };
  const handleMore = (scriptId) => {
    navigate(`/readmore/${scriptId}`);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <Navbar />
            <div className="PSMain">
              {purchasedScripts && purchasedScripts.length > 0 ? (
                <div className="PSS1">
                  <div className="PSS1S1">
                    <div className="PSS1S1D1">
                      <Link to={"/Directorhome"} id="PSS1S1Link1">
                        Home
                      </Link>
                      <ArrowForwardIosIcon id="PSS1S1Arrow" />
                      <Typography id="PSS1S1T1">Purchase History</Typography>
                    </div>
                  </div>
                  <div className="PSS1S2">
                    <MuiCarousel
                      className="custom-carousel"
                      indicatorIconButtonProps={{
                        style: {
                          // 1
                          color: "white",
                          border: " 1px #717171 solid",
                          // backgroundColor:'white'    // 3
                        },
                      }}
                      activeIndicatorIconButtonProps={{
                        style: {
                          backgroundColor: "#14ABE4",
                          color: "#14ABE4", // 2
                        },
                      }}
                      indicatorContainerProps={{
                        style: {
                          // marginTop: `-${pss1s2d2Height}px`,
                          // top:'30vw', // 5
                          textAlign: "left",
                          marginLeft: "10%",
                          display: "flex",
                          gap: "1.5vw",
                          // position:'absolute',
                          // zIndex:'2',
                          marginTop: "2vw",
                        },
                      }}
                      animation="slide"
                    >
                      {purchasedScripts.slice(0, 4).map((item, i) => (
                        <Item key={i} item={item} />
                      ))}
                    </MuiCarousel>
                  </div>
                </div>
              ) : (
                <div className="PSNO">
                  {" "}
                  <p>No purchased scripts available.</p>
                </div>
              )}
              <div className="PSS1Tab">
                {purchasedScripts && purchasedScripts.length > 0 ? (
                  <div className="PSS1S2Tab">
                    <MuiCarousel
                      className="custom-carousel"
                      indicatorIconButtonProps={{
                        style: {
                          // 1
                          color: "white",
                          border: " 1px #717171 solid",
                          backgroundColor: "white", // 3
                        },
                      }}
                      activeIndicatorIconButtonProps={{
                        style: {
                          backgroundColor: "#14ABE4",
                          color: "#14ABE4", // 2
                        },
                      }}
                      indicatorContainerProps={{
                        style: {
                          // marginTop: `-${pss1s2d2Height}px`,
                          top: "38vw", // 5
                          textAlign: "left",
                          marginLeft: "10%",
                          display: "flex",
                          gap: "1.5vw",
                          position: "absolute",
                          zIndex: "2",
                          marginTop: "2vw",
                        },
                      }}
                      animation="slide"
                    >
                      {purchasedScripts.slice(0, 4).map((item, i) => (
                        <ItemTab key={i} item={item} />
                      ))}
                    </MuiCarousel>
                  </div>
                ) : (
                  <div className="PSNOTab">
                    {" "}
                    <p>No purchased scripts available.</p>
                  </div>
                )}
              </div>
              {purchasedScripts && purchasedScripts.length > 0 ? (
                <div className="PSS2">
                  <div className="PSS2D1">
                    <Typography id="PSS2T1">Purchased Scripts</Typography>
                    <Link to={"/purchasedAll"} id="PSS2L1">
                      See All
                    </Link>
                  </div>
                  <div className="PSS2D2">
                    <div className="PSS2D2S1">
                      <Carousel
                        className="PSS2Carousel"
                        responsive={responsive}
                      >
                        {purchasedScripts &&
                          purchasedScripts.slice(4, 12).map((item, i) => (
                            <Card key={i} id="PSS2Card">
                              <img
                                className="PSS2CardI"
                                src={item.fileUrl}
                                loading="lazy"
                              />
                              <Typography id="PSS2CT1">{`${item.movieName.substring(
                                0,
                                14
                              )}${
                                item.movieName.length > 14 ? "..." : ""
                              }`}</Typography>
                              <Button
                                onClick={() => handleReadNow(item.scriptFile)}
                                id="PSS2CB1"
                              >
                                Read Now
                              </Button>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              ) : null}
              {scripts && scripts.length > 0 ? (
                <div className="PSS3">
                  <div className="PSS3D1">
                    <Typography id="PSS2T1">Continue Shopping</Typography>
                    <Link to={"/Directorhome"} id="PSS2L1">
                      See All
                    </Link>
                  </div>
                  <div className="PSS3D2">
                    <div className="PSS2D2S1">
                      <Carousel
                        className="PSS2Carousel"
                        responsive={responsive1}
                      >
                        {scripts &&
                          scripts
                            .filter(
                              (script) =>
                                !purchasedScripts ||
                                !purchasedScripts.some(
                                  (purchased) => purchased._id === script._id
                                )
                            )
                            .map((item, i) => (
                              <Card
                                onClick={() => handleMore(item._id)}
                                key={i}
                                id="PSS3Card"
                              >
                                <img className="PSS3CardI" src={item.fileUrl} />
                                <Typography id="PSS2CT1">{`${item.movieName.substring(
                                  0,
                                  14
                                )}${
                                  item.movieName.length > 14 ? "..." : ""
                                }`}</Typography>
                                <Typography id="PSS3CT2">
                                  <i>{`${item.synopsis
                                    .split(" ")
                                    .slice(0, 20)
                                    .join(" ")}...`}</i>
                                </Typography>
                              </Card>
                            ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <FooterDirector />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default PurchasedScripts;
