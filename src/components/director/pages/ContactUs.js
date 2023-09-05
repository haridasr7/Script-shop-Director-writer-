import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Typography,Pagination } from '@mui/material'
import Navbar from '../component/NavbarDirector'
import FooterDirector from '../component/FooterDirector';
import {useDispatch, useSelector, } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader';
import { toast } from "react-toastify";
import './contactUs.css'
import { clearAuthError, clearauthMessage, sendContactUsForm } from '../../../actions/userActions';
import NavbarWriter from '../../writernavbar/NavbarWriter';
import Navbarlanding from '../../navbarlanding/Navbarlanding';
import FooterLanding from '../../navbarlanding/Footerlanding';
import Footerwriter from '../../writernavbar/Footerwriter'


function ContactUs() {

    const [firstName, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    

    const {loading,error,message,user} = useSelector((state)=> state.authState)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(firstName,email,phoneNumber,subject,text);
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('subject', subject);
        formData.append('text', text);
        dispatch(sendContactUsForm(formData))
        
      };

      useEffect(() => {
        if (error) {
            toast(error[0], {
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
              onOpen: () => { dispatch(clearAuthError) }
            });
            return;
          }
      
      }, [error])
      useEffect(() => {
        if (message) {
            toast(message, {
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'success',
              onOpen: () => { dispatch(clearauthMessage) }
            });
            return;
          }
      
      }, [message])
      

  return (
    <Fragment>
      {loading ? <Loader/> :
      
      <Fragment>
    <div>
    {user ? (user.role[0] === 'director' ? <Navbar /> : <NavbarWriter />) : ( <Navbarlanding />)}
        <div className='ContactUsMain'>
            <div className='CSMS1'>
                <div className='CSMS1D1' >
                    <Typography id='CSD1T1'>Contact Us</Typography>

                </div>
                <div className='CSMS1D2'>
                <form className='CSMForm' onSubmit={submitHandler}>
                    <div className='CSMS1D2S'>
                        <Typography id='CSD2T1'>Send us a Message</Typography>
                       
       
                        <input onChange={(e) => setFirstname(e.target.value)} value={firstName} className='CSFInput' type="text" id="firstName" placeholder='Name' name="firstName" required/>
                        
                    
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='CSFInput' type="email" id="email" placeholder='Email Address' name="email" required/>
                        
                    
                        <input onChange={(e) => setPhonenumber(e.target.value)} value={phoneNumber} className='CSFInput' type="tel" id="phone" placeholder='Phone No.' name="phone" required/>
                        
                        <input onChange={(e) => setSubject(e.target.value)} value={subject} className='CSFInput' type="text" id="subject" placeholder='Subject' name="subject" required/>
                        
                    
                        <textarea onChange={(e) => setText(e.target.value)} value={text} className='CSFInput' id="details" placeholder='Your Message' name="details" rows="4" required/>
                        
                        <input className='CSFSubmit' type="submit" value="Submit"/>
                     

                    </div>
                    </form>

                </div>

            </div>

        </div>
        {user ? (user.role[0] === 'director' ?<FooterDirector/>: <Footerwriter/>) : ( <FooterLanding />)}
        
    </div>
    </Fragment>}
    </Fragment>
  )
}

export default ContactUs