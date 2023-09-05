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

import "./favoriteScripts.css"
import { clearIsUpdated, clearSuccessMessage, clearloadingError, getFavoriteScripts, removeScriptFromFav} from '../../../actions/scriptAction';



function FavoriteScripts() {

    const [favorites, setFavorites] = useState('')
    const [numOfFav, setNumOfFav] = useState('')
    const [favPerPage, setFavPerPage] = useState(5)
    const [displayedFavorites, setDisplayedFavorites] = useState([]);

    const {loading,error,myFavorite,isUpdated,message,NumberOfFavorites} = useSelector((state)=> state.scriptsState)
    const {user} = useSelector((state)=> state.authState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

      if(user){

        dispatch(getFavoriteScripts(user._id))
      }
      else{
        toast('Please login', {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
         
        })

        navigate('/login')
      }

     
      
    }, [isUpdated,dispatch,user])

    useEffect(()=>{

      if (myFavorite) {
      setFavorites(myFavorite)
      setDisplayedFavorites(myFavorite.slice(0, favPerPage))
      setNumOfFav(NumberOfFavorites)
      }
     

    },[myFavorite])
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

    const handleReadmore = (scriptId) =>{

    

    
      navigate(`/readmore/${scriptId}`);
  
  
  }
  const handleRemove = (scriptId) =>{

    dispatch(removeScriptFromFav(user._id,scriptId))

  }
    
  const loadMoreFavorites = () => {
    setDisplayedFavorites(myFavorite.slice(0, favPerPage + 5)); // Increment by 12
    setFavPerPage(favPerPage + 5);
  };


  return (
    <Fragment>
      {loading ? <Loader/> :
      
      <Fragment>
    <div>
        <Navbar/>
        <div className='FSMain'>
            <div className='FSS1'>
            <div className='FSS1D1' >
              <div className='FSS1D1S1'>
                <div className='FSS1D1S1D1'>
                  <Link to={'/Directorhome'} id='FSS1Link1'>Home</Link>
                  <ArrowForwardIosIcon id='FSS1D1Arrow'/>
                  <Typography id='FSS1D1T1'>My Favorites</Typography>
                </div>
                  <Typography id='FSS1D1T2'>My Favorites</Typography>
                  <Typography id='FSS1D1T3'>Wow! Your choices are Amazing.<br/>
Scripts you’ve marked as favourites can be visited and revisited, ensuring a constant source of 
creative nourishment</Typography>
              
              </div>
              
                    

            </div>
            <div className='FSS1D2'>
              <div className='FSS1D2S1'>
                
                <div className='FSS1D2S1D1'>
                  <div className='FSS1D2S1VL'>

                  </div>
                  <div className='FSS1D2S1D1MainSub'>
                    <Typography id='FSS1D2T1'>My Favorites</Typography>
                    <Typography id='FSS1D2T2'>Reading List({numOfFav})</Typography>

                  </div>



                </div>
                <div className='FSS1D2S1D2'>
                { displayedFavorites && displayedFavorites.length > 0? (<>
                  {displayedFavorites.map((item,index)=>(
                  <Card id='FSCard1' key={index} >
                    <img className='FSCard1I1' src={item.fileUrl} onClick={()=>handleReadmore(item.script._id)}/>
                    <div className='FSCard1D1M'>
                      <Typography id='FSC1T1' onClick={()=>handleReadmore(item.script._id)}>{item.script.movieName}</Typography>
                      <Typography id='FSC1T2'onClick={()=>handleReadmore(item.script._id)}><i>{`${item.script.synopsis
                            .split(" ")
                            .slice(0, 30)
                            .join(" ")}...`}</i></Typography>

                      <div className='FSCard1D1MD1'>

                        <Button  onClick={()=>handleReadmore(item.script._id)} id='FSC1B1'>View</Button>
                        <Button onClick={()=>handleRemove(item.script._id)} id='FSC1B2' >Remove</Button>

                      </div>

                    </div>


                  </Card>
                  ))}

                  </>):<div className='DHMS5NO'> <p>No Favorites available.</p></div>
                }
                 { favorites && favorites.length > favPerPage && (
                    <Button onClick={loadMoreFavorites} id='FSLoadMore'>
                      Load More
                    </Button>
                  )}
                  
                  
                </div>
                </div>

              </div>
            


            </div>

            <div className='FSS2'>
              <div className='FSS2D1'>
                <div className='FSS2D1D1'> 
                <Typography id='FSS2D1T1'>My Favorites</Typography>
                <Typography id='FSS2D1T2'>Wow! Your choices are Amazing.<br/>
Scripts you’ve marked as favourites can be visited and revisited, ensuring a constant source of 
creative nourishment</Typography>


                </div>
                
              </div>
              <div className='FSS2D2'>
                <div className='FSS2D2D1'>
                <Typography id='FSS2D2T1'>Favorites({numOfFav})</Typography>

                </div>
                
                { displayedFavorites && displayedFavorites.length > 0? (<>
                  {displayedFavorites.map((item,index)=>(<>
                    <div key={index}  className={`FSS2D2D2 ${index % 2 === 0 ? 'even-bg' : 'odd-bg'}`}>
                  <Card id='FSCard2' >
                    <img className='FSCard2I1' src={item.fileUrl} onClick={()=>handleReadmore(item.script._id)}/>
                    <div className='FSCard2DM'>
                    <Typography  onClick={()=>handleReadmore(item.script._id)} id='FSC2T1'>{item.script.movieName}</Typography>
                    <div className='FSCard2D1'>
                      <Typography onClick={()=>handleReadmore(item.script._id)} id='FSC2T2'>{item.script.writerName}</Typography>
                    <div className='FSCard2D2'>
                      {/* <Button id='FSC2B1'>View</Button> */}
                      <Button onClick={()=>handleRemove(item.script._id)} id='FSC2B1'>Remove</Button>

                    </div>

                    </div>
                    </div>

                  </Card></div> </>
                  ))}{ favorites && favorites.length > favPerPage && (
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

export default FavoriteScripts