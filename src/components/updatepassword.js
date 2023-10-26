import "./updatepassword.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  resetPassword,
  clearAuthError,
  logout,
  updatepassword,
} from "../actions/userActions";

const Updatepassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const { loading, error, isAuthenticated, user, message } = useSelector(
    (state) => state.authState
  );
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showoldPassword, setShowoldPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);

  const handleToggleoldPasswordVisibility = () => {
    setShowoldPassword((prevShowoldPassword) => !prevShowoldPassword);
  };

  const handleTogglenewPasswordVisibility = () => {
    setShownewPassword((prevShownewPassword) => !prevShownewPassword);
  };

  const handleoldPasswordChange = (e) => {
    setoldPassword(e.target.value);
  };

  const handlenewpasswordChange = (e) => {
    setnewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("oldPassword:", oldPassword);
    console.log("password:", newPassword);
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", newPassword);
    dispatch(updatepassword(formData, user._id));

    setoldPassword("");
    setnewPassword("");
  };
  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
    if (message) {
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => {
          dispatch(logout);
          navigate("/login");
        },
      });
      return;
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div>
      <div className="body1">
        <h4 className="te445">Welcome ScriptShop.in</h4>
        {"\n"}
        <p className="p1112">
          To <b>keep your account safe,</b> make sure your password is as
          follows:<br></br>⚪ Numbers only<br></br>⚪ Is no longer than 5
          digits.<br></br>⚪ Is not a member of common passwords
        </p>
        <div>
          <img className="im156" src="./Images/logoin.png" />
          <div className="rbox">
            <h2 className="t134">Update Password</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type={showoldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  className="Pass112"
                  value={oldPassword}
                  onChange={handleoldPasswordChange}
                  required
                />
                {showoldPassword ? (
                  <VisibilityOffIcon
                    className="eye1"
                    onClick={handleToggleoldPasswordVisibility}
                  />
                ) : (
                  <VisibilityIcon
                    className="eye1"
                    onClick={handleToggleoldPasswordVisibility}
                  />
                )}
              </label>
              <br />
              <label>
                <input
                  type={shownewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="Pare1"
                  value={newPassword}
                  onChange={handlenewpasswordChange}
                  required
                />
                {shownewPassword ? (
                  <VisibilityOffIcon
                    className="eye2"
                    onClick={handleTogglenewPasswordVisibility}
                  />
                ) : (
                  <VisibilityIcon
                    className="eye2"
                    onClick={handleTogglenewPasswordVisibility}
                  />
                )}
              </label>

              <br />
              <button className="rbutt" type="submit">
                Update
              </button>
              <div>
                {user ? (
                  user.role[0] === "director" ? (
                    <Link to="/Directorhome">
                      <p className="link1">Back to Home</p>
                    </Link>
                  ) : (
                    <Link to="/Writerhome">
                      <p className="link1">Back to Home</p>
                    </Link>
                  )
                ) : (
                  <Link to="/">
                    <p className="link1">Back to Home</p>
                  </Link>
                )}
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatepassword;
