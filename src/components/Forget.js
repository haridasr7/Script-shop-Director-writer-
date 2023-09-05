import './Forget.js';
import './Forget.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, clearauthMessage } from "../actions/userActions";
import { toast } from "react-toastify";


const Forget = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, user, error, message, isAuthenticated } = useSelector(state => state.authState);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    const formData = new FormData();
    formData.append('email', email);
    dispatch(forgotPassword(formData))
  };
  useEffect(() => {

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return;
    }
    if (message) {
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'success',

        onOpen: () => {
          dispatch(clearauthMessage)
          navigate('/')
        }
      })
      return;
    }
  }, [error, dispatch, message]);


  return (
    <div className='forgetmain'>
      <h4 className='te44'>Welcome ScriptShop.in</h4>
      {'\n'}
      <p className='p11'><b>To reset your password,</b> <br></br> Enter the email address used to log in.
      </p>
      <div>
        <img className='im123' src='./Images/logoin.png' />
        <div className='box12'>
          <h2 className='t12'>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="email" placeholder='Email' className='emaill' value={email} onChange={handleEmailChange} required />
            </label>
            <button className='fbutt' type="submit">Sent</button>
            <br></br>
            <Link to='/Login'><p className='link1'><b></b>Back To Login</p></Link>
          </form>
          {/* <button className='butt2'>Back to Login <link to='/LoginPage'></link></button> */}


        </div>
      </div>
    </div>

  );
};

export default Forget;