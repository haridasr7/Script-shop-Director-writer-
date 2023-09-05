import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Typography,Pagination ,Paper} from '@mui/material'
import Navbar from '../component/NavbarDirector'
import FooterDirector from '../component/FooterDirector';
import {useDispatch, useSelector, } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader';
import { toast } from "react-toastify";
import './services.css'
import { clearAuthError, clearauthMessage, sendContactUsForm } from '../../../actions/userActions';
import NavbarWriter from '../../writernavbar/NavbarWriter';
import Navbarlanding from '../../navbarlanding/Navbarlanding';
import FooterLanding from '../../navbarlanding/Footerlanding';
import Footerwriter from '../../writernavbar/Footerwriter'
import Carousel   from 'react-material-ui-carousel'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Services() {

    const {loading,error,message,user} = useSelector((state)=> state.authState)
    const navigate = useNavigate()

   

  return (
    <Fragment>
    {loading ? <Loader/> :
    
    <Fragment>
  <div>
  {user ? (user.role[0] === 'director' ? <Navbar /> : <NavbarWriter />) : ( <Navbarlanding />)}

  <div className='servicesMain'>
    <div className='SMS1'>
        <div className='SMS1D1'>
        <div className='SMS1Left'>
            <div className='SMS1LM'>
            <div className='SMS1LD1'>

                <Typography id='SMS1T1'>Our Services</Typography>
                <Typography id='SMS1T2'>Your Stories, Our Services <br/>Perfect Together</Typography>

            </div>
            <div className='SMS1LD2'>
                <Button onClick={() => navigate("/Directorhome")} id='SMS1B1'>Visit Store</Button>
                <Button onClick={() => navigate("/signup")} id='SMS1B1'>Sign Up</Button>
                

            </div>

            </div>
           

        </div>
        <div className='SMS1Right'>
           <img className='SMS1RightImg' src='./images/services1.png' alt='service'/>

           

        </div>
        </div>

    </div>
    <div className='SMS2'>
        <div className='SMS2D1'>
            <Typography id='SMS2T1'>Benefits</Typography>

        </div>
        <div className='SMS2D2'>
            <div className='SMS2D2L'>
            <Typography id='SMS2T2'>Director</Typography>
            <Typography id='SMS2T3'>Unlock cinematic excellence at your fingertips with our script shop website, where directors discover a treasure trove of scripts to bring their vision to life</Typography>
            </div>
            <div className='SMS2D2R'>
            <Typography id='SMS2T2'>Script Writers</Typography>
            <Typography id='SMS2T3'>Empower your storytelling journey with our script shop website, where writers thrive by showcasing their creations to a world of filmmakers</Typography>
            </div>

        </div>

    </div>

    <div className='SMS3'>
        <div className='SMS3S1'>
        <div className='SMS3L'>
            <Card id='SMS3LCard'>
                <Typography id='SMS3T1'>Script Writers</Typography>
                <img className='SMS3Image' src='./images/services2.png' alt='services'/>

            </Card>

        </div>
        <div className='SMS3R'>
            <Typography id='SMS3T2'>Script Hosting and Sharing</Typography>
            <Typography id='SMS3T2'>Feedback and Collaboration</Typography>
            <Typography id='SMS3T2'>Networking</Typography>
            <Typography id='SMS3T2'>Copyright Protection</Typography>
            <Typography id='SMS3T2'>Monetisation</Typography>
            <Typography id='SMS3T2'>Version Control</Typography>
            <Button onClick={() => navigate("/signup")}  id='SMS1B2'>Sign Up</Button>
 
        </div>

        </div>

    </div>
    <div className='SMS4'>
    <Carousel   className="custom-carousel" 
                 indicatorIconButtonProps={{
                    style: {
                            // 1
                        color: 'white',border :' 1px #717171 solid'  ,
                        
                        // backgroundColor:'white'    // 3
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: '#14ABE4',
                        color:'#14ABE4', // 2
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        // marginTop: `-${pss1s2d2Height}px`,
                        // top:'30vw', // 5
                       
                       
                        display:"flex",
                        justifyContent: "center",
                        gap:'1.5vw',
                        // position:'absolute',
                        // zIndex:'2',
                        marginTop:"2.5vw"
                    

                                        
                    }
            
                }}
               
                    animation='slide'
                   
                    navButtonsAlwaysVisible
                    navButtonsProps= {{style: {
                        backgroundColor:"white"
                    }}}
                    NextIcon={<KeyboardArrowRightIcon id='Sckr' />}
                    PrevIcon={<KeyboardArrowLeftIcon  id='Sckr'/>}
                   
                    >
                      
                       <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Script Hosting and Sharing</Typography>
                            <Typography id='SMS4T2'>Provide a platform for writers to upload, store, and share their scripts securely with a user-friendly interface</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Feedback and Collaboration</Typography>
                            <Typography id='SMS4T2'>Enable writers to receive feedback from directors or industry professionals</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Networking</Typography>
                            <Typography id='SMS4T2'>Create a community where writers can connect with other writers, potential collaborators, and industry experts</Typography>
                        </div><div className='SMS4Card'>
                            <Typography id='SMS4T1'>Copyright Protection</Typography>
                            <Typography id='SMS4T2'>Scripts available on the script shop website are safeguarded against unauthorized copying, distribution, or usage</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Monetisation</Typography>
                            <Typography id='SMS4T2'>Generating revenue for scriptwriters when directors select and purchase their scripts from the platform</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Version Control</Typography>
                            <Typography id='SMS4T2'> Scriptwriters can make edits to their scripts and delete outdated scripts to maintain content quality and relevance</Typography>
                        </div>

                     
               
                
               
               
                </Carousel >

    </div>

    <div className='SMS3'>
        <div className='SMS3S1'>
        <div className='SMS3L'>
            <Card id='SMS3LCard'>
                <Typography id='SMS3T1'>Directors</Typography>
                <img className='SMS3Image' src='./images/services2.png' alt='services'/>

            </Card>

        </div>
        <div className='SMS3R'>
            <Typography id='SMS3T2'>Script Marketplace</Typography>
            <Typography id='SMS3T2'>Licensing and Agreements</Typography>
            <Typography id='SMS3T2'>Collaboration</Typography>
            <Typography id='SMS3T2'>Follow Writers</Typography>
            <Typography id='SMS3T2'>Search and Filtering</Typography>
            
            <Button onClick={() => navigate("/signup")} id='SMS1B2'>Sign Up</Button>
 
        </div>

        </div>

    </div>
    <div className='SMS4'>
    <Carousel   className="custom-carousel" 
                 indicatorIconButtonProps={{
                    style: {
                            // 1
                        color: 'white',border :' 1px #717171 solid'  ,
                        
                        // backgroundColor:'white'    // 3
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: '#14ABE4',
                        color:'#14ABE4', // 2
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        // marginTop: `-${pss1s2d2Height}px`,
                        // top:'30vw', // 5
                       
                       
                        display:"flex",
                        justifyContent: "center",
                        gap:'1.5vw',
                        // position:'absolute',
                        // zIndex:'2',
                        marginTop:"2.5vw"
                    

                                        
                    }
            
                }}
               
                    animation='slide'
                   
                    navButtonsAlwaysVisible
                    navButtonsProps= {{style: {
                        backgroundColor:"white"
                    }}}
                    NextIcon={<KeyboardArrowRightIcon id='Sckr' />}
                    PrevIcon={<KeyboardArrowLeftIcon  id='Sckr'/>}
                   
                    >
                      
                       <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Script Marketplace</Typography>
                            <Typography id='SMS4T2'>The Script Marketplace offers a curated selection of scripts available for purchase</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Licensing and Agreements</Typography>
                            <Typography id='SMS4T2'>Licensing and Agreements outline the terms and permissions for using purchased scripts</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Collaboration</Typography>
                            <Typography id='SMS4T2'>Collaboration enables interaction and creative teamwork among scriptwriters and directors</Typography>
                        </div><div className='SMS4Card'>
                            <Typography id='SMS4T1'>Follow Writers</Typography>
                            <Typography id='SMS4T2'>It allows directors to track and receive updates from their preferred scriptwriters</Typography>
                        </div>
                        <div className='SMS4Card'>
                            <Typography id='SMS4T1'>Search and Filtering</Typography>
                            <Typography id='SMS4T2'>Search and Filtering assist directors in quickly locating specific scripts based on their preferences and criteria</Typography>
                        </div>
                        

                     
               
                
               
               
                </Carousel >

    </div>

  </div>



  {user ? (user.role[0] === 'director' ?<FooterDirector/>: <Footerwriter/>) : ( <FooterLanding />)}
        
    </div>
    </Fragment>}
    </Fragment>
  )
}

export default Services