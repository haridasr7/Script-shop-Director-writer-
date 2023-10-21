import "./directorProfile.css";
import React, { Fragment, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Loader from "../../Loader";
import Navbar from "../component/NavbarDirector";
import FooterDirector from "../component/FooterDirector";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { addDirectorProfile, clearSuccessMessage, clearloadingError, getDirectorProfile } from "../../../actions/scriptAction";
import { toast } from "react-toastify";

function DirectorProfile ()  {
  const [profilePic, setprofilePic] = useState("");
    const [profilePic1, setprofilePic1] = useState("");

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    directorProfile,
    profilePhoto,
    error,
    isAuthenticated,
    message,
  } = useSelector((state) => state.scriptsState);
  const { user } = useSelector((state) => state.authState);
 
  useEffect(() => {
   if (user.profile) {
     dispatch(getDirectorProfile(user._id));
   }
 }, [dispatch, user]);

  useEffect(() => {
    if (directorProfile && profilePhoto) {
      setName(directorProfile.name);
      setBio(directorProfile.bio);
      setBusinessEmail(directorProfile.businessEmail);
      setPhoneNumber(directorProfile.phoneNumber);
      setprofilePic(profilePhoto);
            setprofilePic1(profilePhoto);

    }
  }, [directorProfile, profilePhoto]);

  useEffect(() => {
    if (error) {
      toast(error[0], {
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setprofilePic(file)
    setprofilePic1(URL.createObjectURL(file));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("businessEmail", businessEmail);
    formData.append("phoneNumber", phoneNumber);
    console.log(profilePic)
    dispatch(addDirectorProfile(formData, user._id));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) :  
        <Fragment>
          <Navbar />
          <div className="DPMAin">
            <div className="DPMainSub">
              <div className="DPLeft">
                <p className="DPLeftp">
                  Complete the profile so that people can know you better..
                </p>
                <img
                  className="DPLeftImg"
                  src="./Images/bgg.png"
                  alt="Background"
                />
              </div>
              <div className="DPRight">
                <div className="DPRBox">
                  <img
                    className="DPRImg"
                    src={profilePic1}
                  />
                  
                  <input
                    className="DPRAI"
                    type="file"
                      accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  <form onSubmit={handleSubmit} className="DPRInput">
                    <input
                      type="text"
                      placeholder="Name"
                      className="Dname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Bio"
                      className="Dbio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Business Mail"
                      className="Dmail"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                    <input
                      type="phone"
                      placeholder="Phone"
                      className="Dphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button className="DPRbutton" type="submit">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <FooterDirector />
        </Fragment>
      }
    </Fragment>
  );
}


export default DirectorProfile;