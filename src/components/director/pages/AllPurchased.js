import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Typography,Pagination } from '@mui/material'
import Navbar from '../component/NavbarDirector'
import FooterDirector from '../component/FooterDirector';
import {useDispatch, useSelector, } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader';
import { toast } from "react-toastify";
import './contactUs.css'
import { clearAuthError, clearauthMessage, sendContactUsForm } from '../../../actions/userActions';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './allPurchase.css'

import { clearIsUpdated, clearSuccessMessage, clearloadingError } from '../../../actions/scriptAction';

function AllPurchased() {

    const [purchased, setPurchased] = useState('')
    const [numOfPurchased, setNumOfPurchased] = useState('')
    const [purchasePerPage, setPurchasePerPage] = useState(5)
    const [displayedPurchase, setDisplayedPurchase] = useState([]);

    const {loading,error,message,purchasedScripts} = useSelector((state)=> state.scriptsState)
    const {user} = useSelector((state)=> state.authState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    
      useEffect(() => {

        if(error){
          toast(error, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            onOpen: () => { dispatch(clearloadingError) }
           
          })
         
         
  
        }
        
     
      }, [error])
      useEffect(() => {
     
        if(message){
          toast(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            type: 'success',
            onOpen: () => { dispatch(clearSuccessMessage); dispatch(clearIsUpdated)}
            
          })
         
        }
       
      }, [message])
      useEffect(()=>{

        if (purchasedScripts) {
        setPurchased(purchasedScripts)
        setDisplayedPurchase(purchasedScripts.slice(0, purchasePerPage))
        setNumOfPurchased(purchasedScripts.length)
        }
        else{
            navigate('/purchasehistory')
        }
       
  
      },[purchasedScripts])

      const loadMoreFavorites = () => {
        setDisplayedPurchase(purchased.slice(0, purchasePerPage + 5)); // Increment by 12
        setPurchasePerPage(purchasePerPage + 5);
      };
      const handleReadmore = (scriptId) =>{

    

    
        navigate(`/readmore/${scriptId}`);
    
    
    }

      const handleReadNow= (scriptId) =>{

        navigate(`/readscript/${scriptId}`)
  
      }

  return (
    <Fragment>
    {loading ? <Loader/> :
    
    <Fragment>
  <div>
      <Navbar/>
      <div className='FSMain'>
          <div className='FSS1'>
        
          <div className='FSS1D2'>
            <div className='FSS1D2S1'>
            <div className='FSS1D2S1D1'>
                  <div className='FSS1D2S1VL'>

                  </div>
                  <div className='FSS1D2S1D1MainSub'>
                    <Typography id='FSS1D2T1'>My Purchase</Typography>
                    <Typography id='FSS1D2T2'>Reading List({numOfPurchased})</Typography>

                  </div>



                </div>
              
             
              <div className='FSS1D2S1D2'>
              { displayedPurchase && displayedPurchase.length > 0? (<>
                {displayedPurchase.map((item,index)=>(
                <Card id='FSCard1' key={index} >
                  <img className='FSCard1I1' src={item.fileUrl} onClick={()=>handleReadmore(item._id)}/>
                  <div className='FSCard1D1M'>
                    <Typography id='FSC1T1' onClick={()=>handleReadmore(item._id)}>{item.movieName}</Typography>
                    <Typography id='FSC1T2'onClick={()=>handleReadmore(item._id)}><i>{`${item.synopsis
                          .split(" ")
                          .slice(0, 30)
                          .join(" ")}...`}</i></Typography>

                    <div className='FSCard1D1MD1'>

                      <Button  onClick={()=>handleReadmore(item._id)} id='FSC1B1'>View</Button>
                      <Button onClick={()=>handleReadNow(item.scriptFile)} id='FSC1B2' >Read Now</Button>

                    </div>

                  </div>


                </Card>
                ))}

                </>):<div className='DHMS5NO'> <p>No purchasedScripts available.</p></div>
              }
               { purchased && purchased.length > purchasePerPage && (
                  <Button onClick={loadMoreFavorites} id='FSLoadMore'>
                    Load More
                  </Button>
                )}
                
                
              </div>
              </div>

            </div>
          


          </div>

          <div className='FSS2'>
           
            <div className='FSS2D2'>
            <div className='AllPurchasecountD1'>
                  <div className='AllPurchasecountD1VL'>

                  </div>
                  <div className='FSS1D2S1D1MainSub'>
                    <Typography id='FSS1D2T1'>My Purchase</Typography>
                    <Typography id='FSS1D2T2'>Reading List({numOfPurchased})</Typography>

                  </div>



                </div>
              
              { displayedPurchase && displayedPurchase.length > 0? (<>
                {displayedPurchase.map((item,index)=>(<>
                  <div key={index}  className={`FSS2D2D2 ${index % 2 === 0 ? 'even-bg' : 'odd-bg'}`}>
                <Card id='FSCard2' >
                  <img className='FSCard2I1' src={item.fileUrl} onClick={()=>handleReadmore(item._id)}/>
                  <div className='FSCard2DM'>
                  <Typography  onClick={()=>handleReadmore(item._id)} id='FSC2T1'>{item.movieName}</Typography>
                  <div className='FSCard2D1'>
                    <Typography onClick={()=>handleReadmore(item._id)} id='FSC2T2'>{item.writerName}</Typography>
                  <div className='FSCard2D2'>
                    {/* <Button id='FSC2B1'>View</Button> */}
                    <Button onClick={()=>handleReadNow(item.scriptFile)} id='FSC2B1'>Read Now</Button>

                  </div>

                  </div>
                  </div>

                </Card></div> </>
                ))}{ purchased && purchased.length > purchasePerPage && (
                  <Button onClick={loadMoreFavorites} id='FSLoadMore'>
                    Load More
                  </Button>
                )}
                </>):<div className='DHMS5NO'> <p>No Favorites available.</p></div>
          }
              

              
             

            </div>

          </div>

      </div>
      <FooterDirector/>
  </div>
  </Fragment>}
  </Fragment>
  )
}

export default AllPurchased