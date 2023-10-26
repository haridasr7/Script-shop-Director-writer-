import {
  scriptsRequest, 
  scriptsSuccess,
  scriptsFail,
  scriptRequest,scriptSuccess,scriptFail,
  pdfRequest,pdfSuccess,pdfFail,
  scriptsForTabRequest,scriptsForTabSuccess,scriptForTabFail,
  followRequest,followSuccess,followFail,clearMessage,clearError,
  unfollowRequest,unfollowSuccess,unfollowFail,
  addToFavRequest,addToFavSuccess,addToFavFail,
  scriptPaymentRequest,scriptPaymentSuccess,scriptPaymentFail,
  clearUpdated,favoriteScriptRequest,favoriteScriptSuccess,favoriteScriptFail,
  removeFromFavRequest,removeFromFavSuccess,removeFromFavFail,
  writerProfileRequest, writerProfileSuccess, writerProfileFail,
  purchasedScriptsRequest,purchasedScriptsSuccess,purchasedScriptsFail,
  directorGetProfileRequest,directorGetProfileSuccess,directorGetProfileFail,
  directorProfileRequest, directorProfileSuccess, directorProfileFail,
writerPaymentRequest,
writerPaymentSuccess,
writerPaymentFail,
  
} from '../slices/scriptsSlice'

import {
addToUserFavSuccess,removeFromUserFavSuccess
} from '../slices/authSlice'

import axios from "axios";

export const getAllScripts = (scriptType,genre,currentPage) => async(dispatch) => {
  




  try {
      dispatch(scriptsRequest());

      if(genre === 'all' || genre === ''){
       

          const response  = await axios.get(`/api/v1/director/scripts/${scriptType}/all?page=${currentPage}&limit=12`);//scripttype to params, page and limit in query
       
          const scripts = await Promise.all(
              response.data.scripts.map(async (item) => {
                let fileUrl
                
                if(item.imageFile){
                  try{
                    const response1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                      responseType: 'blob',
                    });
                     fileUrl = URL.createObjectURL(response1.data);

                  }
                  catch (error){
                    console.log(error)

                  }
                  
      
                }
               
        
                return {
                  ...item,
                  fileUrl,
                };
              })
            );
          const data ={
             scripts,
             currentPage:response.data.currentPage,
             totalPages:response.data.totalPages,
             success:true

          }
          dispatch(scriptsSuccess(data));

      }
      else{
        
          const response  = await axios.get(`/api/v1/director/scripts/${scriptType}/${genre}/all?page=${currentPage}&limit=12`);
        
          const scripts = await Promise.all(
              response.data.scripts.map(async (item) => {
                let fileUrl
                
                if(item.imageFile){
                  const response1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                    responseType: 'blob',
                  });
                   fileUrl = URL.createObjectURL(response1.data);
      
                }
               
        
                return {
                  ...item,
                  fileUrl,
                };
              })
            );
          const data ={
             scripts,
             currentPage:response.data.currentPage,
             totalPages:response.data.totalPages,
             success:true

          }
          dispatch(scriptsSuccess(data));
         

      }

     
     
      
  } catch (error) {
      
    
    if (error.response.data.error) {
      dispatch(scriptsFail(error.response.data.error))
  } else if ((error.response.data.message)) {
      dispatch(scriptsFail(error.response.data.message))
  }
      
  }
}


export const getSelectedScript = (scriptId,userId) => async(dispatch) => {




try {
    dispatch(scriptRequest());

    const response = await axios.get(`/api/v1/scripts/${scriptId}`)
    
   
    const script = response.data
      const response1 = await axios.get(`/api/v1/getImage/${script.imageId}`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response1.data);
      
    


    

        const response2  = await axios.get(`/api/v1/getallscripts/${script.writerId._id}`);
        
        const scripts = await Promise.all(
            response2.data.map(async (item) => {
              let fileUrl
              
              if(item.imageFile){
                const response1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                  responseType: 'blob',
                });
                 fileUrl = URL.createObjectURL(response1.data);
    
              }
             
      
              return {
                ...item,
                fileUrl,
              };
            })
          );

          const response3 = await axios.get(`/api/v1/getPdf/${script.scriptId}`, {
            responseType: 'blob', // Set the responseType to 'blob' to receive a Blob response
          });
      
          // Check if the server responded with the correct content type
          const contentType = response3.headers['content-type'];
          if (contentType !== 'application/pdf') {
            throw new Error('Invalid content type. Expected "application/pdf".');
          }
      
          // Create a Blob URL from the response data
          const pdf = URL.createObjectURL(response3.data);
         
          let response4=null, writerProfile=null,profilePicUrl=null,followers=null,isUserAFollower=false;
          try{

             response4  = await axios.get(`/api/v1/myprofile/${script.writerId._id}`);
             writerProfile = response4.data.profile;
             followers = response4.data.profile.followers;
             isUserAFollower = followers.some((followerId) => followerId === userId);
             if(response4.data.profile.profilePic){
              const response1 = await axios.get(`/api/v1/getProfileImage/${response4.data.profile.profilePic}`, {
                responseType: 'blob',
              });
              profilePicUrl = URL.createObjectURL(response1.data);
            
  
            }
          }
          catch (error){
              console.log(error)


          }

          const response5 = await axios.get(`/api/v1/users/${userId}/favorites`);
          const user = response5.data.user

          

          let favorites=null,isScriptAFavorite=false;
          try{

            favorites = user.favoriteScripts;
            
            isScriptAFavorite = favorites.some((favorite) => favorite === scriptId);



          } catch (error){
            console.log(error)


        }

        let paids=null,isScriptAPaid=false;
        try{

          paids = script.purchaseBy;
         
          isScriptAPaid = paids.some((paid) => paid === userId);



        } catch (error){
          console.log(error)


      }


        
        console.log(isScriptAPaid)

          
          
             
            
  
            

        const data ={
           script,
           imageUrl,
           scripts,
           pdf,
           writerProfile,
           profilePicUrl,
           isFollower:isUserAFollower,
           isFavorite:isScriptAFavorite,
           isPaid:isScriptAPaid

        }
        dispatch(scriptSuccess(data));

    
    

   
   
    
} catch (error) {
  console.log(error)
   
   if (error.response.data.error) {
          dispatch(scriptFail(error.response.data.error))
      } else if ((error.response.data.message)) {
          dispatch(scriptFail(error.response.data.message))
      }
    
}
}

export const getPdf = (id) => async (dispatch) => {




try {
  dispatch(pdfRequest());

  const response = await axios.get(`/api/v1/getPdf/${id}`, {
    responseType: 'blob', // Set the responseType to 'blob' to receive a Blob response
  });

  // Check if the server responded with the correct content type
  const contentType = response.headers['content-type'];
  if (contentType !== 'application/pdf') {
    throw new Error('Invalid content type. Expected "application/pdf".');
  }

  // Create a Blob URL from the response data
  const pdf = URL.createObjectURL(response.data);

  
  dispatch(pdfSuccess(pdf));
} catch (error) {
 
  if (error.response.data.error) {
    dispatch(pdfFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(pdfFail(error.response.data.message))
}
  
}
};

export const getScriptsForTab = (selectedType,selectedGenre) => async(dispatch) => {




let genre;
if(selectedGenre === ''){
genre = "all"
}
else{
genre = selectedGenre
}

let responseA,scripts;




try {
    dispatch(scriptsForTabRequest());


    if(genre === "all"){
      responseA  = await axios.get(`/api/v1/director/scripts/${selectedType}/all?page=${1}&limit=12`);
        
       scripts = await Promise.all(
          responseA.data.scripts.map(async (item) => {
            let fileUrl
            
            if(item.imageFile){
              const responseA1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                responseType: 'blob',
              });
               fileUrl = URL.createObjectURL(responseA1.data);
  
            }
           
    
            return {
              ...item,
              fileUrl,
            };
          })
        );

    }
    else{
      responseA  = await axios.get(`/api/v1/director/scripts/${selectedType}/${genre}/all?page=${1}&limit=12`);
        
       scripts = await Promise.all(
          responseA.data.scripts.map(async (item) => {
            let fileUrl
            
            if(item.imageFile){
              const responseA1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                responseType: 'blob',
              });
               fileUrl = URL.createObjectURL(responseA1.data);
  
            }
           
    
            return {
              ...item,
              fileUrl,
            };
          })
        );

    }
  

  
      
        const response1  = await axios.get(`/api/v1/director/scripts/${selectedType}/action/all?page=${1}&limit=12`);
       
        const actionScripts = await Promise.all(
            response1.data.scripts.map(async (item) => {
              let fileUrl
              
              if(item.imageFile){
                const response2 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                  responseType: 'blob',
                });
                 fileUrl = URL.createObjectURL(response2.data);
    
              }
             
      
              return {
                ...item,
                fileUrl,
              };
            })
          );

          const response3  = await axios.get(`/api/v1/director/scripts/${selectedType}/adventure/all?page=${1}&limit=12`);
       
        const adventureScripts = await Promise.all(
            response3.data.scripts.map(async (item) => {
              let fileUrl
              
              if(item.imageFile){
                const response4 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                  responseType: 'blob',
                });
                 fileUrl = URL.createObjectURL(response4.data);
    
              }
             
      
              return {
                ...item,
                fileUrl,
              };
            })
          );


          const response5  = await axios.get(`/api/v1/director/scripts/${selectedType}/thriller/all?page=${1}&limit=12`);
          
          const thrillerScripts = await Promise.all(
              response5.data.scripts.map(async (item) => {
                let fileUrl
                
                if(item.imageFile){
                  const response6 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                    responseType: 'blob',
                  });
                   fileUrl = URL.createObjectURL(response6.data);
      
                }
               
        
                return {
                  ...item,
                  fileUrl,
                };
              })
            );


            const response7  = await axios.get(`/api/v1/director/scripts/${selectedType}/drama/all?page=${1}&limit=12`);
        
          const dramaScripts = await Promise.all(
              response7.data.scripts.map(async (item) => {
                let fileUrl
                
                if(item.imageFile){
                  const response8 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                    responseType: 'blob',
                  });
                   fileUrl = URL.createObjectURL(response8.data);
      
                }
               
        
                return {
                  ...item,
                  fileUrl,
                };
              })
            );
        

            const response9  = await axios.get(`/api/v1/director/scripts/${selectedType}/crime/all?page=${1}&limit=12`);
         
          const crimeScripts = await Promise.all(
              response9.data.scripts.map(async (item) => {
                let fileUrl
                
                if(item.imageFile){
                  const response10 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
                    responseType: 'blob',
                  });
                   fileUrl = URL.createObjectURL(response10.data);
      
                }
               
        
                return {
                  ...item,
                  fileUrl,
                };
              })
            );
        
        
        const data ={
          scripts,
          actionScripts,
          adventureScripts,
          thrillerScripts,
          dramaScripts,
          crimeScripts

        }
        dispatch(scriptsForTabSuccess(data));
       

    

   
   
    
} catch (error) {
    console.log(error)
  
  if (error.response.data.error) {
    dispatch(scriptForTabFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(scriptForTabFail(error.response.data.message))
}
    
}
}

export const followWriter = (profileId,writerId) => async(dispatch) => {

console.log(profileId,writerId)

try{

  dispatch(followRequest())

  // const responseA  = await axios.get(`/api/v1/myprofile/${writerId}`);

  // const followers = responseA.data.profile.followers
  // console.log(followers)
  
  // const isUserAFollower = followers.some((followerId) => followerId === userId);


  const response = await axios.post(`/api/v1/profiles/${profileId}/follow/${writerId}`)
  console.log(response.data)

  const data={
    message: response.data.message,
    isFollower: true
  }
  dispatch(followSuccess(data))

}
catch(error){

  console.log(error)
  if (error.response.data.error) {
    dispatch(followFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(followFail(error.response.data.message))
}

}



}
export const clearSuccessMessage = (dispatch) => {
dispatch(clearMessage());
};

export const clearloadingError = (dispatch) => {
dispatch(clearError());
};

export const unFollowWriter = (profileId,writerId) => async(dispatch) => {

console.log(profileId,writerId)

try{

  dispatch(unfollowRequest())

  // const responseA  = await axios.get(`/api/v1/myprofile/${writerId}`);

  // const followers = responseA.data.profile.followers
  // console.log(followers)
  
  // const isUserAFollower = followers.some((followerId) => followerId === userId);


  const response = await axios.post(`/api/v1/profiles/${profileId}/unfollow/${writerId}`)
  console.log(response.data)

  const data={
    message: response.data.message,
    isFollower: null
  }
  dispatch(unfollowSuccess(data))

}
catch(error){

  console.log(error)
  if (error.response.data.error) {
    dispatch(unfollowFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(unfollowFail(error.response.data.message))
}

}



}

export const addToFavorite = (directorId,scriptId) => async(dispatch) => {

console.log(directorId,scriptId)

try{

  dispatch(addToFavRequest())

  // const responseA  = await axios.get(`/api/v1/myprofile/${writerId}`);

  // const followers = responseA.data.profile.followers
  // console.log(followers)
  
  // const isUserAFollower = followers.some((followerId) => followerId === userId);


  const response = await axios.post(`/api/v1/users/${directorId}/scripts/${scriptId}/favorites`)
  console.log(response.data)

  const data = {
    isFavorite :true,
    message:response.data.message
  }
  dispatch(addToUserFavSuccess(response.data)) 
  dispatch(addToFavSuccess(data))


}
catch(error){

  console.log(error)
  if (error.response.data.error) {
    dispatch(addToFavFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(addToFavFail(error.response.data.message))
}

}



}

export const clearIsUpdated = (dispatch) => {
dispatch(clearUpdated());
};

export const  scriptBuy=(userId,scriptId,amount)=>async (dispatch) => {

try {
  dispatch(scriptPaymentRequest())
  
    const order = await axios.post(`/api/v1/payment/process/${userId}`, {
      amount: amount*100, // Replace with the appropriate amount
      paymentMethod: 'ONLINE', // Always set to 'ONLINE' for Razorpay
      // ... (other payment details as needed for your backend)
    });
    // console.log(order.data)
    if (order.data && order.data.id) {
      // Initialize Razorpay and open the payment dialog
      const options = {
        key: 'rzp_test_ayJezilwRTEPYG', // Replace with your Razorpay key
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.id,
        handler: function (response) {
          // Handle successful payment (verify with your backend)
          verifyRazorpayPayment(order.data.order_id,order.data.amount,'ONLINE',userId,scriptId,dispatch);
        },
        prefill: {
          // Pre-fill customer details if needed
          name: 'Dipinlal',
          email: 'tkdipinlal@gmail.com',
          contact: '1234567890',
        },
        modal: {
          ondismiss: function () {
            // Handle payment cancellation
            dispatch(scriptPaymentFail("Payment Cancelled"))
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      // Handle error from backend
      
      dispatch(scriptPaymentFail("Error creating Razorpay order"))
      
    }
 
    
} catch (error) {

  
 
    dispatch(scriptPaymentFail("Error initiating payment. Please try again"))

}

}

function verifyRazorpayPayment(order_id,amount,paymentMethod,userId,scriptId,dispatch) {
axios
  .post(`/api/v1/payment/verification/${userId}/${scriptId}`, { order_id,amount,paymentMethod })
  .then((response) => {
    if (response.data.status) {
      // Payment was successful, navigate to the success page
      const data = {
        isPaid:true,
        message:"Payment Successful"
      }
      dispatch(scriptPaymentSuccess(data))
    } else {
      // Payment failed, show an alert
     dispatch(scriptPaymentFail("Please contact support team"))
    }
  })
  .catch((error) => {
    // Handle error
    console.error('Error verifying payment:', error);
    dispatch(scriptPaymentFail("Please contact support teams"))
  });
}

export const getFavoriteScripts =(directorId) => async (dispatch) => {

try {
  dispatch(favoriteScriptRequest())

  const response = await axios.get(`/api/v1/users/${directorId}/favorites`);
  const user = response.data.user



  if(user.favoriteScripts){

    const favoriteScripts = await Promise.all(
      user.favoriteScripts.map(async (scriptId) => {
        let fileUrl

        const response1 = await axios.get(`/api/v1/scripts/${scriptId}`)

        const script = response1.data
       
        
        if(script.imageId){
          const response2 = await axios.get(`/api/v1/getImage/${script.imageId}`, {
            responseType: 'blob',
          });
           fileUrl = URL.createObjectURL(response2.data);

        }
       

        return {
          script,
          fileUrl,
        };
      })
    );
    const favLength = favoriteScripts.length
    const data = {
      favoriteScripts:favoriteScripts,
      NumberOfFavorites:favLength
    }

    dispatch(favoriteScriptSuccess(data))

  }
  else{
    const data = {
      favoriteScripts:null
    }

    dispatch(favoriteScriptSuccess(data))


  }


      
      

  
} catch (error) {
  console.log(error)
  if (error.response.data.error) {
    dispatch(favoriteScriptFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(favoriteScriptFail(error.response.data.message))
}
  
}


}

export const removeScriptFromFav =(directorId,scriptId)=> async (dispatch) =>{

try {
  dispatch(removeFromFavRequest())

  const response = await axios.post(`/api/v1/removeFromFavorites/${directorId}/${scriptId}`);

  const data= {
    message:response.data.message
  }
  dispatch(removeFromUserFavSuccess(response.data))
  dispatch(removeFromFavSuccess(data))

  
} catch (error) {
  console.log(error)
  if (error.response.data.error) {
    dispatch(removeFromFavFail(error.response.data.error))
} else if ((error.response.data.message)) {
    dispatch(removeFromFavFail(error.response.data.message))
}
  
}
}

export const addDirectorProfile =
(formData, directorId) => async (dispatch) => {
  try {
    dispatch(directorProfileRequest());
  
const config = {
          headers: {
              'Content-type': 'multipart/form-data'
          }
      }
    const {data } = await axios.put(
      `/api/v1/directorprofile?directorId=${directorId}`,
      formData,
      config
    );
    console.log(data);
    dispatch(directorProfileSuccess(data));
  } catch (error) {
    console.log(error);
    if (error.response.data.error) {
      dispatch(directorProfileFail(error.response.data.error));
    } else if (error.response.data.message) {
      dispatch(directorProfileFail(error.response.data.message));
    }
  }
};

//add writer profile
export const addWriterProfile = (formData, writerId) => async (dispatch) => {
  try {
    dispatch(writerProfileRequest());

    const config = {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    };

    const { data } = await axios.put(
      `/api/v1/myprofile?writerId=${writerId}`,
      formData,
      config
    );
    console.log(data);
    dispatch(writerProfileSuccess(data));
  } catch (error) {
    console.log(error);
    if (error.response.data.error) {
      dispatch(writerProfileFail(error.response.data.error));
    } else if (error.response.data.message) {
      dispatch(writerProfileFail(error.response.data.message));
    }
  }
};


export const getDirectorProfile = (directorId) => async (dispatch) => {
  try {
    console.log(directorId);
    dispatch(directorGetProfileRequest());
    const { data } = await axios.get(`/api/v1/directorprofile/${directorId}`);
    console.log("data"+data);
    const response1 = await axios.get(
      `/api/v1/getProfileImageForDirector/${data.profile.profilePic}`,
      {
        responseType: "blob",
      }
    );
    let profilePicUrl = URL.createObjectURL(response1.data);
    const profileData = {
      profile: data.profile,
      profilePic: profilePicUrl,
    };
    dispatch(directorGetProfileSuccess(profileData));
  } catch (error) {
    console.log(error);
    if (error.response.data.error) {
      dispatch(directorGetProfileFail(error.response.data.error));
    } else if (error.response.data.message) {
      dispatch(directorGetProfileFail(error.response.data.message));
      
    }
  }
  };

  export const writerDetails = (writerId) => async (dispatch) => {
    try {
      dispatch(writerProfileRequest());
  
      const { data } = await axios.get(`/api/v1/myprofile/${writerId}`);
      if (data && data.profile && data.profile.profilePic) {
        const response1 = await axios.get(`/api/v1/getProfileImage/${data.profile.profilePic}`, {
          responseType: 'blob',
        });
        let profilePicUrl = URL.createObjectURL(response1.data);
        const profileData = {
          profile: data.profile,
          profilePic: profilePicUrl,
        };
        dispatch(writerProfileSuccess(profileData));
      } else {
        dispatch(writerProfileFail('Profile data is missing or incomplete'));
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(writerProfileFail(error.response.data.error));
      } else {
        dispatch(writerProfileFail('An error occurred while fetching writer details'));
      }
    }
  };
  
export const getPurchasedScripts = (directorId) => async(dispatch) =>{

try {
dispatch(purchasedScriptsRequest())

const response = await axios.get(`/api/v1/${directorId}/purchased-scripts`);

console.log(response)

if(response.data.length >0 ){
  const purchasedScripts = await Promise.all(
    response.data.map(async (item) => {
      let fileUrl
      
      if(item.imageFile){
        try{
          const response1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
            responseType: 'blob',
          });
           fileUrl = URL.createObjectURL(response1.data);

        }
        catch (error){
          console.log(error)

        }
        

      }
     

      return {
        ...item,
        fileUrl,
      };
    })
  );
  



 dispatch(purchasedScriptsSuccess(purchasedScripts))

}
else{
  dispatch(purchasedScriptsSuccess(null))
}



} catch (error) {
console.log(error);
if (error.response.data.error) {
  dispatch(purchasedScriptsFail(error.response.data.error));
} else if (error.response.data.message) {
  dispatch(purchasedScriptsFail(error.response.data.message));
}

}

}

////writerpayment/////


export const writerPay = (writerId, movieName, amount) => async (dispatch) => {
try {
  dispatch(writerPaymentRequest());

  const order = await axios.post(`/api/v1/payment/writer`, {
    writerId,
    movieName, // Include any other necessary data
    amount: amount ,// Amount in paise (Indian currency)
    paymentMethod: 'ONLINE', // Always set to 'ONLINE' for Razorpay
    
  });
console.log(order.data)
  if (order.data && order.data.id) {
    // Initialize Razorpay and open the payment dialog
    const options = {
      key: 'rzp_test_ayJezilwRTEPYG', // Replace with your Razorpay key
      amount: order.data.amount,
      currency: order.data.currency,
      order_id: order.data.id,
      handler: function (response) {
        // Handle successful payment (verify with your backend)
        verifyWriterRazorpayPayment(order.data.order_id, order.data.amount, 'ONLINE', writerId, movieName, dispatch);
      },
      prefill: {
        // Pre-fill customer details if needed
        name: 'Dipinlal',
        email: 'tkdipinlal@gmail.com',
        contact: '1234567890',
      },
      modal: {
        ondismiss: function () {
          // Handle payment cancellation
          dispatch(writerPaymentFail("Payment Cancelled"));
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } else {
    // Handle error from backend
    dispatch(writerPaymentFail("Error creating Razorpay order"));
  }
} catch (error) {
  dispatch(writerPaymentFail("Error initiating payment. Please try again"));
}
};

// Function to verify writer Razorpay payment
function verifyWriterRazorpayPayment(order_id, amount, paymentMethod, writerId, movieName, dispatch,formData) {
axios
  .post(`/api/v1/payment/writer/verification`, { order_id, amount, paymentMethod, writerId, movieName })
  .then((response) => {
    if (response.data.success) {
      // Payment was successful, handle accordingly (e.g., navigate to a success page)
      const data = {
        isPaid: true,
        message: "Payment Successful"
      };
      dispatch(writerPaymentSuccess(data));

      console.log(data)
    } else {
      // Payment failed, show an alert or handle as needed
      dispatch(writerPaymentFail("Please contact support team"));
    }
  })
  .catch((error) => {
    // Handle error
    console.error('Error verifying writer payment:', error);
    dispatch(writerPaymentFail("Please contact support team"));
  });
}

