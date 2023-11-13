import React from "react";
import "./footerwriter.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
function FooterDirector() {
  return (
    <div className="FDMainDiv">
      <div className="FDMS1D">
        <div className="FDMS1DS1">
          <img
            className="FDMS1DS1Img"
            src="./images/footerLogo.png"
            alt="footer"
          />
          <Typography id="FDMS1DS1T1">Share. Create. Inspire.</Typography>
        </div>
        <div className="FDMS1DS2">
          <div className="FDMS1DS2Main">
            <div className="FDMS1DS2D1">
              <Typography id="FDMS1DS2T1">Useful Links</Typography>
              <Link to="/Writerhome" id="FDMS1DS2T1Link">
                <Typography id="FDMS1DS2T2">Home</Typography>
              </Link>
              <Link to="/services" id="FDMS1DS2T1Link1">
                <Typography id="FDMS1DS2T3">Services</Typography>
              </Link>
              <Link to="/ContactUs" id="FDMS1DS2T1Link2">
                <Typography id="FDMS1DS2T4">Contact Us</Typography>
              </Link>
            </div>
            <div className="FDMS1DS2D2">
              <Typography id="FDMS1DS2T5">Address</Typography>
              <Typography id="FDMS1DS2T6">Address here</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="social-icons">
        <FacebookIcon />
        <TwitterIcon />
        <YouTubeIcon />
        <InstagramIcon />
        <TelegramIcon />
      </div>
      <div className="FMCopyright">
        <Typography id="FMCopyrightT">
          Copyright @ 2023 Year, Name. All Right Reserved
        </Typography>
      </div>
    </div>
  );
}
export default FooterDirector;
