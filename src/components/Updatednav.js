import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UpdatedNav.css";
import { Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../actions/userActions";
import axios from "axios";

function NavbarWriter() {
  const [isOpenD1, setIsOpenD1] = useState(false);
  const [isOpenD2, setIsOpenD2] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  const handleArrowClick = () => {
    setIsOpenD1(!isOpenD1);
  };
  const location = useLocation();
  // useEffect(() => {
  //   if(!isAuthenticated){
  //     toast("please login", {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //       type: 'error',
  //     })
  //     navigate('/login')
  //   }
  // }, [isAuthenticated])
  const directorHomeLogout = () => {
    dispatch(logout);
    toast("You have been successfully logged out", {
      position: toast.POSITION.BOTTOM_CENTER,
      type: "success",
    });
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside the dropdown container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenD1(false);
      }
    };
    // Attach the event listener when the popup is open
    if (isOpenD1) {
      document.addEventListener("click", handleClickOutside);
    }
    // Clean up the event listener when the component unmounts or the popup is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenD1]);

  // const fetchFollowersCount = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/v1/profiles/${user.profile}/followers/${user._id}/count`
  //     );
  //     setFollowersCount(response.data); // Update followers count in the state
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // Fetch followers count when the component mounts
  // useEffect(() => {
  //   fetchFollowersCount();
  // });
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/profiles/${user.profile}/followers/${user._id}/count`
        ); // Replace the URL with your actual endpoint
        setData(response.data); // Assuming your response data is an array
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };
    fetchFollowers();
  }, []);

  return (
    <div className="navbarMainDiv">
      <nav className="CommonNavbar">
        <div className="Navleft-section">
          {/* <Link
            style={{ textDecoration: "none" }}
            id="DNImageLink"
            to={"/Writerhome"}
          >
            {" "}
            <img
              className="CNavLogo"
              src="./images/navbarLogo.png"
              alt="Logo"
            />
          </Link> */}
        </div>
        <div className="Navcenter-section">
          <Link
            to="/Writerhome"
            className={
              location.pathname === "/Writerhome"
                ? "Navbaractive"
                : "NavbarInactive"
            }
          >
            <Typography id="navbarC3Typo"> Home</Typography>
          </Link>
          <Link
            to="/services"
            className={
              location.pathname === "/services"
                ? "Navbaractive"
                : "NavbarInactive"
            }
          >
            <Typography id="navbarC3Typo1"> Services </Typography>
          </Link>
          <Link
            to="/ContactUs"
            className={
              location.pathname === "/ContactUs"
                ? "Navbaractive"
                : "NavbarInactive"
            }
          >
            <Typography id="navbarC3Typo2"> Contact Us</Typography>
          </Link>
        </div>
        <div className="Navright-section">
          <div className="navDpCircle">
            {profileImage ? (
              <img className="navDpCircleImg" src="./images/dpUnwanted.png" />
            ) : (
              <PersonIcon id="navDpCircleIcon1" className="navDpCircleIcon" />
            )}
          </div>
          <IconButton
            className="arrow-button"
            onClick={(event) => {
              event.stopPropagation();
              handleArrowClick();
            }}
            disableRipple
          >
            {isOpenD1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {isOpenD1 && (
            <div className="navbarCdropdown-menu active" ref={dropdownRef}>
              <hr className="navdropHr"></hr>
              <ul className="navbarCdropdown-menuUL">
                <Link to="/profile" className="navbarCdropdown-menuULLink">
                  <li>
                    <div className="navbarCdropdown-menuLi">
                      <p className="navbarCdropdown-menuTypo">Profile</p>
                      <IconButton>
                        {" "}
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </li>
                </Link>
                <Link
                  to="/updatepassword"
                  className="navbarCdropdown-menuULLink"
                >
                  <li>
                    <div className="navbarCdropdown-menuLi">
                      <p className="navbarCdropdown-menuTypo">
                        Update Password
                      </p>
                      <IconButton>
                        {" "}
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </li>
                </Link>
                <Link to="/chatbot" className="navbarCdropdown-menuULLink">
                  <li>
                    <div className="navbarCdropdown-menuLi">
                      <p className="navbarCdropdown-menuTypo">
                        Customer Support
                      </p>
                      <IconButton>
                        {" "}
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </li>
                </Link>
                <Link
                  to="/privacy&policy"
                  className="navbarCdropdown-menuULLink"
                >
                  <li>
                    <div className="navbarCdropdown-menuLi">
                      <p className="navbarCdropdown-menuTypo">
                        Privacy & Policy
                      </p>
                      <IconButton>
                        {" "}
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </li>
                </Link>
                <Link
                  to="/WPurchaseHistory"
                  className="navbarCdropdown-menuULLink"
                >
                  <li>
                    <div className="navbarCdropdown-menuLi">
                      <p className="navbarCdropdown-menuTypo">
                        Purchase History
                      </p>
                      <IconButton>
                        {" "}
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </li>
                </Link>
                <li>
                  <div
                    onClick={directorHomeLogout}
                    className="navbarCdropdown-menuLi"
                  >
                    <p className="navbarCdropdown-menuTypo">Logout</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </ul>
              <hr className="navdropHr1"></hr>
            </div>
          )}
        </div>
      </nav>
      <div className="navbarFollowers">
        <Button id="navbarFollowerButton">
          {data.followersCount} Followers
        </Button>
        <IconButton
          id="NavbarCMenu"
          sx={{ marginLeft: "auto" }}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpenD1(!isOpenD1);
          }}
        >
          <MenuIcon />
        </IconButton>
        {isOpenD1 && (
          <div className="navbarCdropdown-menu1">
            <div className="navbarCdropdown-menuDiv">
              <Typography className="navbarCdropdown-menuTypo">Menu</Typography>
              <IconButton onClick={() => setIsOpenD1(!isOpenD1)}>
                {" "}
                <CloseIcon />
              </IconButton>
            </div>
            <hr className="navdropHr2"></hr>
            <ul className="navbarCdropdown-menuUL">
              <Link to="/Writerhome" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Home</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/services" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Services</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/ContactUs" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Contact Us</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/profile" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Profile</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/updatepassword" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Update Password</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/chatbot" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Customer Support</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link to="/privacy&policy" className="navbarCdropdown-menuULLink">
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Privacy & Policy</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <Link
                to="/WPurchaseHistory"
                className="navbarCdropdown-menuULLink"
              >
                <li>
                  <div className="navbarCdropdown-menuLi">
                    <p className="navbarCdropdown-menuTypo">Purchase History</p>
                    <IconButton>
                      {" "}
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </div>
                </li>
              </Link>
              <li>
                <div
                  onClick={directorHomeLogout}
                  className="navbarCdropdown-menuLi"
                >
                  <p className="navbarCdropdown-menuTypo">Logout</p>
                  <IconButton>
                    {" "}
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </div>
              </li>
            </ul>
            <hr className="navdropHr1"></hr>
          </div>
        )}
      </div>
    </div>
  );
}
export default NavbarWriter;
