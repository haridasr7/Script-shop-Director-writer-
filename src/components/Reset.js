import './Reset.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate ,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { resetPassword,clearAuthError, logout } from '../actions/userActions';


const Reset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading, error, isAuthenticated } = useSelector(state => state.authState);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmpasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Password:', password);
    console.log('ConfirmPassword:', confirmPassword);
    const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token))
   
    setPassword('');
    setConfirmPassword('');
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast('password reset successfull', {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'success',
        onOpen: () => { dispatch(logout) 
        navigate('/login')}
      })
        }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return;
    }

  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div>
      <div className='body1'>
        <h4 className='te445'>Welcome ScriptShop.in</h4>
        {'\n'}
        <p className='p1112'>To <b>keep your account safe,</b> make sure your password is as follows:<br></br>
        ⚪ Numbers only<br></br>⚪ Is no longer than 5 digits.<br></br>⚪ Is not a member of common passwords
        </p>
        <div>
          <img className='im156' src='./Images/logoin.png' />
          <div className='rbox'>
            <h2 className='t134'>Reset Password</h2>
            <form onSubmit={handleSubmit}>
            <label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password"
          className="Pass11"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {showPassword ? (
          <VisibilityOffIcon className="eye1" onClick={handleTogglePasswordVisibility} />
        ) : (
          <VisibilityIcon className="eye1" onClick={handleTogglePasswordVisibility} />
        )}
      </label>
      <br />
      <label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          className="Pare"
          value={confirmPassword}
          onChange={handleConfirmpasswordChange}
          required
        />
        {showConfirmPassword ? (
          <VisibilityOffIcon className="eye2" onClick={handleToggleConfirmPasswordVisibility} />
        ) : (
          <VisibilityIcon className="eye2" onClick={handleToggleConfirmPasswordVisibility} />
        )}
      </label>
  
 

              <br />
              <button className='rbutt' type="submit">Reset</button>
              <div>
              <Link to='/login'><p className='link1'>Back to Login</p></Link>
                          </div>
            </form>
            <div>
              </div>    
          </div>
        </div>
      </div>
    </div>
      );
};

export default Reset;


