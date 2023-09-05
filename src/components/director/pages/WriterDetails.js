import React, { Fragment, useState, useEffect } from "react";
import Loader from "../../Loader";
import "./writerDetails.css";
import Navbar from "../component/NavbarDirector";
import FooterDirector from "../component/FooterDirector";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { writerDetails } from "../../../actions/scriptAction";
import { useDispatch, useSelector } from "react-redux";
function WriterDetail ()  {
      const [selectedPhoto, setSelectedPhoto] = useState(null);
      const [name, setName] = useState("");
      const [bio, setBio] = useState("");
      const [businessMail, setBusinessMail] = useState("");
      const [phone, setPhone] = useState("");
      const [profilePic1, setProfilePic] = useState("");
      const dispatch = useDispatch();
      const { script, loading, writerProfile, profilePic } = useSelector(
        (state) => state.scriptsState
  );
  
  
  useEffect(() => {
    // Fetch the profile details using the writerProfile action
    const fetchProfileDetails = async () => {
      try {
         dispatch(writerDetails(script.writerId._id));
        // console.log(response);
        // const { name, bio, businessMail, phone } = response.data.profile;
       
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []);

  useEffect(() => {
     setName(writerProfile.name);
     setBio(writerProfile.bio);
     setBusinessMail(writerProfile.businessEmail);
    setPhone(writerProfile.phoneNumber);
    if (profilePic) {
      setProfilePic(profilePic)
    }
  }, [writerProfile, profilePic])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <Navbar />
            <div className="WDMain">
              <div className="WDMainSub">
                <div className="WDLeft">
                  <p className="WDLeftp">
                    Complete the profile so that people can know you better..
                  </p>
                  <img
                    className="WDLeftImg"
                    src="./Images/bgg.png"
                    alt="Background"
                  />
                </div>
                <div className="WDRight">
                  <div className="WDRBox">
                    <div className="WDPDiv">
                      {profilePic1 && (
                        <img
                          className="WDPImg"
                          src={profilePic1}
                          alt="Profile Photo"
                          // style={{
                          //   borderRadius: "50%",
                          //   width: "100px",
                          //   height: "100px",
                          // }}
                        />
                      )}
                    </div>

                    <div className="profileinput">
                      <div className="input-group">
                        <PersonOutlineIcon className="icon" />
                        <div className="ipd1">
                          <h4 className="name">Name</h4>
                            <h5 className="realName">{name}</h5> 
                        </div>
                      </div>
                      <div className="input-group">
                        <DescriptionOutlinedIcon className="icon" />
                        <div>
                          <h4 className="name">Bio</h4>
                          <h5 className="realName">{bio}</h5>
                        </div>
                      </div>
                      <div className="input-group">
                        <EmailOutlinedIcon className="icon" />
                        <div>
                          <h4 className="name">Business Email</h4>
                          <h5 className="realName">{businessMail}</h5>
                        </div>
                      </div>
                      <div className="input-group">
                        <LocalPhoneOutlinedIcon className="icon" />
                        <div>
                          <h4 className="name">Phone Number</h4>
                          <h5 className="realName">{phone}</h5>
                        </div>
                      </div>
                     
                    </div>
                 
                    </div>
                    
                </div>
              </div>
            </div>
            <FooterDirector />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default WriterDetail;