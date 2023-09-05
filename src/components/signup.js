import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { register,clearAuthError } from '../actions/userActions';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Container } from '@mui/material';
const Signup = () => {
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  const selectHandler = (e) => {
    setRole(e.target.value);
  };
  const handlePaste = (e) => {
    e.preventDefault();
};
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(role, userName, email, password, confirmpassword);
    const formData = new FormData();
    formData.append('role', role);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmpassword);
    console.log(formData.get('role'));
    console.log(formData.get('userName'));
    dispatch(register(formData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast('Registration success', {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'success',
      });
      navigate('/login');
      return;
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };
  return (
    <div style={{ backgroundColor: '#45B8E9 ', height: '100%', paddingBottom: '20%' }}>
      <div>
        <div className="signup-main">
        <Container className='tabview' style={{position:'absolute',marginTop:"5%",color:"white"}}>
        <h1>Welcome Scriptshop.in</h1>
        <h3>Get ready to sail the sea of scripts</h3>
        
        </Container>
          <img className="sign-im1" src="./images/Banner.png" />
          <Container className='mobile' style={{position:'absolute',marginTop:"-2%",color:"white"}}>
          <div className='mobileview'>
        <h1>Welcome Scriptshop.in</h1>
        <h3>We Missed you Please enter your</h3>
        <h5>email address and password to signup....</h5>
        </div>
        </Container>
          <div className="sign-box">
            <h2 className="sign-t1">Sign Up</h2>
            <form onSubmit={submitHandler}>
              <label>
                <select name="role" value={role} className="sign-email" onChange={selectHandler} required>
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="writer">Writer</option>
                  <option value="director">Director</option>
                  <option value="director and writer">Director and Writer</option>
                </select>
              </label>
              <br />
              <br />
              <label>
                <input name="name" type="text" value={userName} placeholder="Username" className="sign-email" onChange={(e) => setUserName(e.target.value)} required />
              </label>
              <br />
              <br />
              <label>
                <input name="email" type="email" value={email} placeholder="Email" className="sign-email" onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <br />
              <br />
              <label>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="sign-email"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onPaste={handlePaste}
                  required
                />
                {showPassword ? (
                  <VisibilityOffIcon className='siconbutton'  onClick={handleTogglePasswordVisibility}  />
                ) : (
                  <VisibilityIcon  className='siconbutton' onClick={handleTogglePasswordVisibility}  />
                )}
              </label>
              <br />
              <br />
              <label>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="sign-email"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  onPaste={handlePaste}
                  value={confirmpassword}
                  required
                />
                {showConfirmPassword ? (
                  <VisibilityOffIcon  className='siconbutton' onClick={handleToggleConfirmPasswordVisibility}  />
                ) : (
                  <VisibilityIcon   className='siconbutton' onClick={handleToggleConfirmPasswordVisibility}  />
                )}
              </label>
              <br />
              <br />
              <button className="signbutt" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;