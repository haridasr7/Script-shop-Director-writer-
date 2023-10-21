import axios from 'axios';
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";

function DirectorProfile() {
    const [profilePic, setprofilePic] = useState("");
    const [profilePic1, setprofilePic1] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    error,
    isAuthenticated,
    message,
  } = useSelector((state) => state.scriptsState);
  const { user } = useSelector((state) => state.authState);

  useEffect(() => {
    // Your logic here
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
      setprofilePic(file);
      setprofilePic1(URL.createObjectURL(file));
 
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("businessEmail", businessEmail);
    formData.append("phoneNumber", phoneNumber);
   
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.put(`/api/v1/myprofile?writerId=${user._id}`, formData, config);
      console.log(response.data);
      // Handle the response as needed
  
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
}

export default DirectorProfile;
