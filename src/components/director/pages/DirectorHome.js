import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../component/NavbarDirector";
import "./directorHome.css";
import { Button, Card, Typography, Pagination } from "@mui/material";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import IconButton from "@mui/material/IconButton";
import FooterDirector from "../component/FooterDirector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllScripts, getScriptsForTab } from "../../../actions/scriptAction";
import Loader from "../../Loader";
import Select, { components } from "react-select";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

function DirectorHome() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedType, setSelectedType] = useState("mainStreamFilm");
  const [dhGmodal, setdhGmodal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [siblingCount, setSiblingCount] = useState(1);
  const [paginationSize, setPaginationSize] = useState("medium");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    scripts,
    error,
    totalPages,
    actionScripts,
    adventureScripts,
    thrillerScripts,
    dramaScripts,
    crimeScripts,
  } = useSelector((state) => state.scriptsState);
  const { user } = useSelector((state) => state.authState);

  useEffect(() => {
    if (window.innerWidth > 768) {
      dispatch(getAllScripts(selectedType, selectedGenre, currentPage));
    }
  }, [dispatch, selectedType, selectedGenre, currentPage]);

  const handleStadiumClickModal = () => {
    setdhGmodal(true);
  };
  const handleStadiumClickModalClose = () => {
    setdhGmodal(false);
  };
  const handleStadiumClickType = (typeSelected) => {
    setCurrentPage(1);
    setSelectedType(typeSelected);
  };

  const handleStadiumClick = (genreSelected) => {
    setCurrentPage(1);

    setSelectedGenre(genreSelected);
    setdhGmodal(false);
  };

  const handleReadmore = (scriptId) => {
    console.log("readmorenavigate");
    navigate(`/readmore/${scriptId}`);
    axios
      .put(`/api/v1/increment-viewer-count/${scriptId}`)
      .then((response) => {
        // Print the response
        console.log("Response from incrementing viewer count:", response.data);
      })
      .catch((error) => {
        // Handle any errors if the request fails
        console.error("Error incrementing viewer count:", error);
      });
  };

  const handleselectedTypeTabAndMob = (typeSelected) => {
    setSelectedType(typeSelected);
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
      });
      navigate("/");
    }
  }, [error]);

  //pagination size change
  useEffect(() => {
    function updateSiblingCount() {
      const screenWidth = window.innerWidth;
      // You can adjust the breakpoint and siblingCount values as per your design needs
      if (screenWidth <= 600) {
        setSiblingCount(0); // On smaller devices, set siblingCount to 0 to stack all buttons
        setPaginationSize("small");
      } else {
        setSiblingCount(1); // On larger devices, set siblingCount to 1 for default behavior
        setPaginationSize("medium");
      }
    }

    // Update siblingCount on initial mount and when the window is resized
    updateSiblingCount();
    window.addEventListener("resize", updateSiblingCount);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateSiblingCount);
    };
  }, []);

  const customStyles = {
    menuList: (styles) => ({
      ...styles,
      maxHeight: 200,
      border: "#EEEEEE",
      minWidth: "15vw",
    }),
    indicatorSeparator: () => null,
    placeholder: (base) => ({
      ...base,
      fontFamily: "inter",
      color: "#FFFFFF",
      fontSize: "3vw",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      fontFamily: "inter",
      color: "#FFFFFF",
    }),
    control: (base) => ({
      ...base,
      fontFamily: "inter",
      color: "#FFFFFF",
      border: 0,
      backgroundColor: "transparent",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      fontFamily: "inter",
      backgroundColor: "white",
      minWidth: "15vw",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#B2D4FF" : "transparent", // Remove checkbox background
      color: "#121540",
      fontSize: "3vw",
    }),
  };

  const allOptions = [
    { value: "all", label: "all" },
    { value: "western", label: "western" },
    { value: "short", label: "short" },
    { value: "mystery", label: "mystery" },
    { value: "film-noir", label: "film-noir" },
    { value: "animation", label: "animation" },
    { value: "war", label: "war" },
    { value: "sci-fi", label: "sci-fi" },
    { value: "musical", label: "musical" },
    { value: "fantasy", label: "fantasy" },
    { value: "romance", label: "romance" },
    { value: "family", label: "family" },
    { value: "horror", label: "horror" },
    { value: "comedy", label: "comedy" },
    { value: "action", label: "action" },
    { value: "adventure", label: "adventure" },
    { value: "thriller", label: "thriller" },
    { value: "drama", label: "drama" },
    { value: "crime", label: "crime" },
  ];

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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      // Your code to run when screen size is 768px and below
      dispatch(getScriptsForTab(selectedType, selectedGenre));
    }
  }, [dispatch, selectedType, selectedGenre]);

  const handleSeeAll = (Genre) => {
    let seeAllGenre;
    if (Genre === "") {
      seeAllGenre = "all";
    } else {
      seeAllGenre = Genre;
    }
    const seeAllType = selectedType;

    console.log(seeAllGenre, seeAllType);
    navigate(`/scripts/${seeAllType}/${seeAllGenre}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <Navbar />
            <div className="DHMain">
              <div className="DHMS1M">
                <div className="DHMS1D1">
                  <img
                    className="DHMS1D1Img"
                    src="./images/DirectorsImage1.png"
                    alt="homeimage"
                  />
                </div>
                <div className="DHMS1D2">
                  <div className="DHMS1D2S">
                    <Typography id="DHMS1D2ST1">
                      Go for. Look through. Set up
                    </Typography>
                    <Typography id="DHMS1D2ST2">
                      <i>Pick your ideal script, where your mind goes.</i>
                    </Typography>

                    <Typography id="DHMS1D2ST4">
                      <i>* Discover and own iconic film scripts at our store</i>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="DHMS2M">
                <div className="DHMS2D1">
                  <Typography id="DHS2D1T1"> Store</Typography>
                  <div className="DHMS2D1S1">
                    <div
                      className={
                        selectedType === "mainStreamFilm"
                          ? "TeststadiumActiveBig"
                          : "TeststadiumBig"
                      }
                      onClick={() => handleStadiumClickType("mainStreamFilm")}
                    >
                      <div className="Testsemicircle"></div>
                      <div className="Testsemicircle "></div>
                      <div
                        className={
                          selectedType === "mainStreamFilm"
                            ? "TesttextActive"
                            : "Testtext"
                        }
                      >
                        Main Stream Film
                      </div>
                    </div>
                    <div
                      className={
                        selectedType === "shortFilm"
                          ? "TeststadiumActiveBig"
                          : "TeststadiumBig"
                      }
                      onClick={() => handleStadiumClickType("shortFilm")}
                    >
                      <div className="TestsemicircleBig"></div>
                      <div className="Testsemicircle "></div>
                      <div
                        className={
                          selectedType === "shortFilm"
                            ? "TesttextActive"
                            : "Testtext"
                        }
                      >
                        Short Film
                      </div>
                    </div>
                  </div>

                  <hr className="DHS2D1Hr"></hr>
                  <Typography id="DHS2D1T2">Genres</Typography>
                </div>
                <div className="DHMS2D2">
                  <div
                    className={
                      selectedGenre === "all" || selectedGenre === ""
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("all")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "all" || selectedGenre === ""
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      All
                    </div>
                  </div>
                  <div
                    className={
                      selectedGenre === "crime"
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("crime")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "crime"
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      Crime
                    </div>
                  </div>
                  <div
                    className={
                      selectedGenre === "action"
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("action")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "action"
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      Action
                    </div>
                  </div>
                  <div
                    className={
                      selectedGenre === "adventure"
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("adventure")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "adventure"
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      Adventure
                    </div>
                  </div>
                  <div
                    className={
                      selectedGenre === "thriller"
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("thriller")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "thriller"
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      Thriller
                    </div>
                  </div>
                  <div
                    className={
                      selectedGenre === "drama"
                        ? "TeststadiumActive"
                        : "Teststadium"
                    }
                    onClick={() => handleStadiumClick("drama")}
                  >
                    <div className="Testsemicircle"></div>
                    <div className="Testsemicircle "></div>
                    <div
                      className={
                        selectedGenre === "drama"
                          ? "TesttextActive"
                          : "Testtext"
                      }
                    >
                      Drama
                    </div>
                  </div>
                  <div
                    class={
                      selectedGenre === "" ||
                      selectedGenre === "all" ||
                      selectedGenre === "drama" ||
                      selectedGenre === "crime" ||
                      selectedGenre === "action" ||
                      selectedGenre === "adventure" ||
                      selectedGenre === "thriller"
                        ? "Teststadium"
                        : "TeststadiumActive"
                    }
                    onClick={() => handleStadiumClickModal()}
                  >
                    <div class="Testsemicircle"></div>
                    <div class="Testsemicircle "></div>
                    <div
                      class={
                        selectedGenre === "" ||
                        selectedGenre === "all" ||
                        selectedGenre === "drama" ||
                        selectedGenre === "crime" ||
                        selectedGenre === "action" ||
                        selectedGenre === "adventure" ||
                        selectedGenre === "thriller"
                          ? "Testtext"
                          : "TesttextActive"
                      }
                    >
                      Others +
                    </div>
                  </div>
                </div>
                {dhGmodal && (
                  <div className="DHmodal">
                    <div className="DHoverlay"></div>
                    <div className="modal-contentDH">
                      <div className="DHMS2D2Modal">
                        <div
                          className={
                            selectedGenre === "comedy"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("comedy")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "comedy"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Comedy
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "horror"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("horror")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "horror"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Horror
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "family"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("family")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle"></div>
                          <div
                            className={
                              selectedGenre === "family"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Family
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "romance"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("romance")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "romance"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Romance
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "fantasy"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("fantasy")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "fantasy"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Fantasy
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "musical"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("musical")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "musical"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Musical
                          </div>
                        </div>

                        <div
                          className={
                            selectedGenre === "sci-fi"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("sci-fi")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "sci-fi"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Sci-fi
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "war"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("war")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "war"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            War
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "animation"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("animation")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "animation"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Animation
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "film-noir"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("film-noir")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "film-noir"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Film-noir
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "mystery"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("mystery")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "mystery"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Mystery
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "short"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("short")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "short"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Short
                          </div>
                        </div>
                        <div
                          className={
                            selectedGenre === "western"
                              ? "TeststadiumActive"
                              : "Teststadium"
                          }
                          onClick={() => handleStadiumClick("western")}
                        >
                          <div className="Testsemicircle"></div>
                          <div className="Testsemicircle "></div>
                          <div
                            className={
                              selectedGenre === "western"
                                ? "TesttextActive"
                                : "Testtext"
                            }
                          >
                            Western
                          </div>
                        </div>
                      </div>
                      <div className="DHmodalCloseButtonD">
                        <Button
                          id="DHmodalCloseButton"
                          onClick={() => handleStadiumClickModalClose()}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="DHMS2D3">
                  <Typography>
                    Pick your ideal script, where your mind goes.
                  </Typography>
                </div>
              </div>
              <div className="DHMS3M">
                <div className="DHMS3DM">
                  {scripts &&
                    scripts.map((script) => (
                      <Card id="DHCard" key={script._id}>
                        <div className="DHCImage">
                          {script.fileUrl ? (
                            <img
                              className="DHCImageImg"
                              src={script.fileUrl}
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
                              {script.movieName}
                            </Typography>

                            {/* <div className="rating-outer">
                { script.rating ?<div className="rating-inner" style={{width: `${script.rating / 5 * 100}%` }}></div> :
                <div className="rating-inner" style={{width: "0%" }}></div>}
              </div> */}
                            {user &&
                            user.favoriteScripts.includes(script._id) ? (
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
                              {script.writerName}
                            </Typography>
                          </div>
                          <div className="DHCardDS3">
                            <Typography id="DHCardDS1T3"></Typography>
                            <Typography id="DHCardDS1T4">
                              <i>{`${script.synopsis
                                .split(" ")
                                .slice(0, 30)
                                .join(" ")}...`}</i>
                            </Typography>
                          </div>
                          <div className="DHCardDS4">
                            <Button
                              onClick={() => handleReadmore(script._id)}
                              id="DHCardButton"
                            >
                              Read More
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
              <div className="DHMSTabAndMob">
                <div className="DHMS4M">
                  <Button
                    onClick={() => handleselectedTypeTabAndMob("shortFilm")}
                    id={selectedType === "shortFilm" ? "DHMS4MB1" : "DHMS4MB2"}
                  >
                    Short Film
                  </Button>
                  <Button
                    onClick={() =>
                      handleselectedTypeTabAndMob("mainStreamFilm")
                    }
                    id={
                      selectedType === "mainStreamFilm"
                        ? "DHMS4MB1"
                        : "DHMS4MB2"
                    }
                  >
                    Main Stream Film
                  </Button>

                  <Select
                    id="DHMS4MSelect"
                    styles={customStyles}
                    placeholder={selectedGenre ? selectedGenre : "Genre"}
                    defaultValue={{ label: "Genre", value: "" }}
                    options={allOptions}
                    value={selectedGenre}
                    components={{ Option: components.Option }} // Remove the custom Option component
                    isClearable={true}
                    onChange={(option) => {
                      setSelectedGenre(option?.value || "");
                    }}
                  />
                </div>
                {scripts && scripts.length > 0 ? (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">
                        {selectedGenre ? selectedGenre : "all"}
                      </Typography>{" "}
                      <Typography
                        onClick={() => handleSeeAll(selectedGenre)}
                        id="DHMS5MT2"
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {scripts &&
                          scripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              {script.fileUrl ? (
                                <img
                                  className="DHS5CardI"
                                  src={script.fileUrl}
                                  alt="CardImage"
                                />
                              ) : (
                                <IconButton>
                                  <MovieFilterOutlinedIcon id="DHIIcon2" />
                                </IconButton>
                              )}
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                ) : (
                  <div className="DHMS5NO">
                    {" "}
                    <p>No {selectedGenre} scripts available.</p>
                  </div>
                )}
                {actionScripts && actionScripts.length > 0 && (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">Action</Typography>{" "}
                      <Typography
                        id="DHMS5MT2"
                        onClick={() => handleSeeAll("action")}
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {actionScripts &&
                          actionScripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              <img
                                className="DHS5CardI"
                                src={script.fileUrl}
                                alt="CardImage"
                              />
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {adventureScripts && adventureScripts.length > 0 && (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">Adventure</Typography>{" "}
                      <Typography
                        id="DHMS5MT2"
                        onClick={() => handleSeeAll("adventure")}
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {adventureScripts &&
                          adventureScripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              <img
                                className="DHS5CardI"
                                src={script.fileUrl}
                                alt="CardImage"
                              />
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {thrillerScripts && thrillerScripts.length > 0 && (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">Thriller</Typography>{" "}
                      <Typography
                        id="DHMS5MT2"
                        onClick={() => handleSeeAll("thriller")}
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {thrillerScripts &&
                          thrillerScripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              <img
                                className="DHS5CardI"
                                src={script.fileUrl}
                                alt="CardImage"
                              />
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {dramaScripts && dramaScripts.length > 0 && (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">Drama</Typography>{" "}
                      <Typography
                        id="DHMS5MT2"
                        onClick={() => handleSeeAll("drama")}
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {dramaScripts &&
                          dramaScripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              <img
                                className="DHS5CardI"
                                src={script.fileUrl}
                                alt="CardImage"
                              />
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                )}
                {crimeScripts && crimeScripts.length > 0 && (
                  <div className="DHMS5M">
                    <div className="DHMS5MD1">
                      <Typography id="DHMS5MT1">Crime</Typography>{" "}
                      <Typography
                        id="DHMS5MT2"
                        onClick={() => handleSeeAll("crime")}
                      >
                        See All
                      </Typography>
                    </div>
                    <div className="DHMS5MD2">
                      <Carousel
                        className="DHMS5MD2Carousel"
                        responsive={responsive}
                      >
                        {crimeScripts &&
                          crimeScripts.map((script) => (
                            <Card
                              key={script._id}
                              id="DHS5Card"
                              onClick={() => handleReadmore(script._id)}
                            >
                              <img
                                className="DHS5CardI"
                                src={script.fileUrl}
                                alt="CardImage"
                              />
                              <div className="DHS5CardT1D">
                                {script.movieName}
                              </div>
                              <Typography id="DHS5CardT2">$1000</Typography>
                            </Card>
                          ))}
                      </Carousel>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="DHpagination">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
                size={paginationSize}
                showFirstButton
                showLastButton
                siblingCount={siblingCount}
                boundaryCount={1}
              />
            </div>
            <FooterDirector />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default DirectorHome;
