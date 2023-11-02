import React, { Fragment, useEffect, useState } from "react";
import "./readMore.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import Loader from "../../Loader";
import Navbar from "../component/NavbarDirector";
import { Button, Typography, Card } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import IconButton from "@mui/material/IconButton";
import FooterDirector from "../component/FooterDirector";
import {
  addToFavorite,
  clearSuccessMessage,
  clearloadingError,
  followWriter,
  getPdf,
  getSelectedScript,
  scriptBuy,
  unFollowWriter,
} from "../../../actions/scriptAction";
import PDFViewer from "../component/PDFViewer";
import { toast } from "react-toastify";
import { clearAuthError } from "../../../actions/userActions";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { saveAs } from "file-saver";
import Carousel from "react-multi-carousel";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ReadMore() {
  const [isPurchased, setisPurchased] = useState("");
  const [writeProfileImage, setWriterProfileImage] = useState("");
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [follower, setfollower] = useState("");
  const [favorite, setfavorite] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const amount = 10000;

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    scripts,
    error,
    script,
    otherScripts,
    imageFile,
    pdfFile,
    writerProfile,
    profilePic,
    message,
    isFollower,
    isFavorite,
    isPaid,
  } = useSelector((state) => state.scriptsState);
  const { user } = useSelector((state) => state.authState);
  const { scriptId } = useParams();

  useEffect(() => {
    if (user) {
      if (scriptId) {
        dispatch(getSelectedScript(scriptId, user._id));
      } else if (script) {
        dispatch(getSelectedScript(script._id, user._id));
      }
    } else {
      toast("please login", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
      });
      navigate("/login");
    }
  }, [scriptId]);

  useEffect(() => {
    setisPurchased(isPaid);
  }, [isPaid]);

  useEffect(() => {
    setfollower(isFollower);
  }, [isFollower]);

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

  useEffect(() => {
    setPdfUrl(pdfFile);
  }, [pdfFile]);
  useEffect(() => {
    setWriterProfileImage(profilePic);
  }, [profilePic]);

  useEffect(() => {
    setfavorite(isFavorite);
  }, [isFavorite]);

  const handleReadmore = (scriptId) => {
    navigate(`/readmore/${scriptId}`);
    const viewersCount = async (scriptId) => {
      try {
        const response = await axios.put(
          `/api/v1/increment-viewer-count/${scriptId}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    viewersCount(scriptId);
  };

  // ... (rest of your code)

  const handleReadnow = (scriptId) => {
    navigate("/readnow");
    const viewStatus = async () => {
      try {
        const response = await axios.put(
          `/api/v1/updateread/${scriptId}/${user._id}`
        );
        // console.log(scriptId, user._id);
      } catch (error) {
        console.log(error);
      }
    };
    viewStatus(scriptId);
  };

  const handleDownloadPDF = () => {
    saveAs(pdfUrl, "downloaded_file.pdf");
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleFollowRequest = () => {
    if (writerProfile) {
      dispatch(followWriter(writerProfile._id, writerProfile.writerId));
    } else {
      toast("profile not Found", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
      });
    }
  };
  const handleUnfollowRequest = () => {
    if (writerProfile) {
      dispatch(unFollowWriter(writerProfile._id, writerProfile.writerId));
    } else {
      toast("profile not Found", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
      });
    }
  };

  const handleAddToFav = () => {
    dispatch(addToFavorite(user._id, script._id));
  };

  const handleRazorpayPayment = () => {
    dispatch(scriptBuy(user._id, script._id, amount));
  };

  const handleFavpage = () => {
    navigate("/myfavorites");
  };
  const handleWriterDetails = () => {
    if (writerProfile) {
      navigate("/writerdetails");
    } else {
      toast("profile not Found", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
      });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <Navbar />
            <div className="RMMain">
              {script && (
                <div className="RMS1M">
                  <div className="RMS1ML"></div>
                  <div className="RMS1MR">
                    <hr className="RMS1MRHr"></hr>
                    <div className="RMS1MRDM">
                      <div className="RMS1MRDS1">
                        <img
                          className="RMS1MRDS1Img"
                          src={imageFile}
                          alt="scriptimage"
                        />
                        <div className="RMstadium">
                          <div className="RMsemicircle"></div>
                          <div className="RMsemicircle "></div>
                          <div className="RMtext">
                            <IconButton id="RMCI">
                              <CurrencyRupeeIcon id="RMCIcon" />
                              {amount}
                            </IconButton>
                          </div>
                        </div>
                      </div>
                      <div className="RMS1MRDS2">
                        <div className="RMS1MRDSD1">
                          <Typography id="RMS1RT1">
                            {" "}
                            {script.movieName}
                          </Typography>
                          <Typography id="RMS1RTAddedType">
                            {" "}
                            {script.scriptType}
                          </Typography>
                        </div>

                        <div className="RMS1MRDS2TobeR">
                          {" "}
                          <div className="RMS1MRDSD2">
                            <Typography id="RMS1RT2">
                              {" "}
                              Follow the Author
                            </Typography>
                          </div>
                          <div className="RMS1MRDSD3In">
                            <div className="RMS1MRDSD3DL">
                              {writeProfileImage ? (
                                <img
                                  className="RMS1MRDSD3DLImg"
                                  src={writeProfileImage}
                                />
                              ) : (
                                <PersonIcon
                                  id="writerDpCircleIcon1"
                                  className="writerDpCircleIcon"
                                />
                              )}
                              {isPurchased ? (
                                <Typography
                                  onClick={handleWriterDetails}
                                  id="RMS1RT3PS"
                                >
                                  {script.writerName}
                                </Typography>
                              ) : (
                                <Typography id="RMS1RT3">
                                  {script.writerName}
                                </Typography>
                              )}
                            </div>

                            <div className="RMS1MRDSD3DR">
                              {/* {isPurchased?<Button id='RMS1RB1'>Details</Button>:null} */}
                              {follower ? (
                                <Button
                                  onClick={handleUnfollowRequest}
                                  id="RMS1RB2"
                                >
                                  Unfollow
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleFollowRequest}
                                  id="RMS1RB2"
                                >
                                  Follow
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="RMS1MRDSD4">
                          <Typography id="RMS1RT4">Synopsis</Typography>
                          <Typography id="RMS1RT5">
                            <i>{`${script.synopsis
                              .split(" ")
                              .slice(0, 50)
                              .join(" ")}...`}</i>
                          </Typography>
                          <div className="RMS1MRDSD4DS">{/* readmore */}</div>
                        </div>
                        <div className="RMS1MRDSD5">
                          {favorite ? (
                            <Button onClick={handleFavpage} id="RMS1MRDSD5B1">
                              Check in Favorites
                            </Button>
                          ) : (
                            <Button onClick={handleAddToFav} id="RMS1MRDSD5B1">
                              Add To Favorites
                            </Button>
                          )}

                          {isPurchased ? (
                            <>
                              <Button
                                onClick={() => handleReadnow(script._id)}
                                id="RMS1MRDSD5B2"
                              >
                                Read Now
                              </Button>
                              <IconButton onClick={handleDownloadPDF}>
                                <CloudDownloadIcon id="scriptDownloadRM" />
                              </IconButton>
                            </>
                          ) : (
                            <Button
                              onClick={handleRazorpayPayment}
                              id="RMS1MRDSD5B3"
                            >
                              Buy Now
                            </Button>
                          )}
                        </div>
                        {/* <div className='RMS1MRDSD6'>BuyNow</div> */}
                      </div>
                    </div>
                    <div className="RMS1MRDMAdded">
                      <div className="RMS1MRDS1Added">
                        <div className="RMS1MRDSD2">
                          <Typography id="RMS1RT2">
                            {" "}
                            Follow the Author
                          </Typography>
                        </div>
                        <hr className="RMS1MRDSD2hr"></hr>
                        <div className="RMS1MRDSD3">
                          <div className="RMS1MRDSD3DL">
                            {writeProfileImage ? (
                              <img
                                className="RMS1MRDSD3DLImg"
                                src={writeProfileImage}
                              />
                            ) : (
                              <PersonIcon
                                id="writerDpCircleIcon1"
                                className="writerDpCircleIcon"
                              />
                            )}
                            {isPurchased ? (
                              <Typography
                                onClick={handleWriterDetails}
                                id="RMS1RT3PS"
                              >
                                {script.writerName}
                              </Typography>
                            ) : (
                              <Typography id="RMS1RT3">
                                {script.writerName}
                              </Typography>
                            )}
                          </div>

                          <div className="RMS1MRDSD3DR">
                            {isPurchased ? (
                              <Button id="RMS1RB1">Details</Button>
                            ) : null}

                            {follower ? (
                              <Button
                                onClick={handleUnfollowRequest}
                                id="RMS1RB2"
                              >
                                Unfollow
                              </Button>
                            ) : (
                              <Button
                                onClick={handleFollowRequest}
                                id="RMS1RB2"
                              >
                                Follow
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="RMS2M">
                <div className="RMS2ML"></div>
                <div className="RMS2MR">
                  <Typography id="RMS1RT6">More from this Writer</Typography>
                  <hr className="RMS2MRHr"></hr>
                  {otherScripts && otherScripts.length > 0 ? (
                    <>
                      <div className="RMS2MRCM">
                        {otherScripts &&
                          otherScripts.map((item) =>
                            item._id !== script._id ? (
                              <Card key={item._id} id="RMCard">
                                <div className="DHCImage">
                                  {item.fileUrl ? (
                                    <img
                                      className="DHCImageImg"
                                      src={item.fileUrl}
                                      alt="script"
                                    />
                                  ) : (
                                    <IconButton>
                                      <MovieFilterOutlinedIcon id="DHIIcon" />
                                    </IconButton>
                                  )}
                                </div>
                                <div className="DHCardDM">
                                  <div className="DHCardDS1">
                                    <Typography id="DHCardDS1T1">
                                      {item.movieName}
                                    </Typography>
                                    {/* <div className="rating-outer">
                { item.rating ?<div className="rating-inner" style={{width: `${item.rating / 5 * 100}%` }}></div> :
                <div className="rating-inner" style={{width: "0%" }}></div>}
              </div> */}{" "}
                                    {user.favoriteScripts.includes(item._id) ? (
                                      <IconButton>
                                        <FavoriteIcon id="DHFavIconS" />
                                      </IconButton>
                                    ) : (
                                      <IconButton>
                                        <FavoriteIcon id="DHFavIcon" />
                                      </IconButton>
                                    )}
                                  </div>
                                  <div className="DHCardDS2">
                                    <Typography id="DHCardDS1T2">
                                      {item.writerName}
                                    </Typography>
                                  </div>
                                  <div className="DHCardDS3">
                                    <Typography id="DHCardDS1T3"></Typography>
                                    <Typography id="DHCardDS1T4">
                                      <i>{`${item.synopsis
                                        .split(" ")
                                        .slice(0, 30)
                                        .join(" ")}...`}</i>
                                    </Typography>
                                  </div>
                                  <div className="DHCardDS4">
                                    <Button
                                      onClick={() => {
                                        handleReadmore(item._id);
                                      }}
                                      id="DHCardButton"
                                    >
                                      ReadMore
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ) : null
                          )}
                      </div>
                    </>
                  ) : (
                    <div className="DHMS5NO">
                      {" "}
                      <p>No other scripts available.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="RMS3M">
                <div className="RMS2MRCarousel">
                  <div className="DHMS5MD2">
                    {otherScripts && otherScripts.length > 0 ? (
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {otherScripts &&
                          otherScripts.map((item) =>
                            item._id !== script._id ? (
                              <Card
                                key={item._id}
                                id="DHS5Card"
                                onClick={() => {
                                  handleReadmore(item._id);
                                }}
                              >
                                <img
                                  className="DHS5CardI"
                                  src={item.fileUrl}
                                  alt="CardImage"
                                />
                                <div className="DHS5CardT1D">
                                  {item.movieName}
                                </div>
                                <Typography id="DHS5CardT2">$1000</Typography>
                              </Card>
                            ) : null
                          )}
                      </Carousel>
                    ) : (
                      <div className="DHMS5NO">
                        {" "}
                        <p>No other scripts available.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showPDFViewer && <PDFViewer pdfUrl={pdfUrl} />}
            </div>
            <FooterDirector />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ReadMore;
