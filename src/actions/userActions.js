import {
  logoutSuccess,
    logoutFail,
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    registerFail,
    registerRequest,
    registerSuccess,
    clearMessage,contactFormSendRequest,contactFormSendSuccess,contactFormSendFail,
    updatePasswordRequest,updatePasswordSuccess,updatePasswordFail,
  } from "../slices/authSlice";
  import { 
    clearScriptState
   } from "../slices/scriptsSlice"
  import axios from "axios";
  export const login = (emailOrUserName, password,role) => async (dispatch) => {
    console.log(emailOrUserName, password,role);
    try {
      dispatch(loginRequest());
      const { data } = await axios.post(`/api/v1/login`, {
        role,
        emailOrUserName,
        password,
      });
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log(error)
        if (error.response.data.error) {
            dispatch(loginFail(error.response.data.error))
        } else if ((error.response.data.message)) {
            dispatch(loginFail(error.response.data.message))
        }
    }
  };
  export const clearAuthError = (dispatch) => {
    dispatch(clearError());
  };
  export const clearauthMessage = (dispatch) => {
    dispatch(clearMessage());
  };
  export const forgotPassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`/api/v1/password/forgot`, formData, config);
        console.log(data)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        
        console.log(error)
        if (error.response.data.error) {
            dispatch(forgotPasswordFail(error.response.data.error))
        } else if ((error.response.data.message)) {
            dispatch(forgotPasswordFail(error.response.data.message))
        }
    
    }
}
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
      dispatch(resetPasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data} =  await axios.post(`/api/v1/password/reset/${token}`, formData, config);
      dispatch(resetPasswordSuccess(data))
  } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        dispatch(resetPasswordFail(error.response.data.error))
    } else if ((error.response.data.message)) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
  }
}

export const register = (userData) => async (dispatch) => {
console.log('userData'+userData)
    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
              },
        }
        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
          dispatch(registerFail(error.response.data.error))
      } else if ((error.response.data.message)) {
          dispatch(registerFail(error.response.data.message))
      }
    }
}
export const logout = async (dispatch) => {
  try {
      await axios.get(`/api/v1/logout`);
      dispatch(logoutSuccess());
      dispatch(clearScriptState());
  } catch (error) {
      dispatch(logoutFail(error));
  }
};

export const sendContactUsForm =(formData) =>async (dispatch) =>{

  try {
    dispatch(contactFormSendRequest())
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const { data} =  await axios.post(`/api/v1/contact`, formData, config);
    console.log(data)
    dispatch(contactFormSendSuccess(data))
} catch (error) {
    
    console.log(error)
    if (error.response.data.error) {
        dispatch(contactFormSendFail(error.response.data.error))
    } else if ((error.response.data.message)) {
        dispatch(contactFormSendFail(error.response.data.message))
    }

}

}

export const updatepassword = (formData,userId) => async (dispatch) => {
  try {
      dispatch(updatePasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data} =  await axios.put(`/api/v1/password/change/${userId}`, formData, config);
      dispatch(updatePasswordSuccess(data))
  } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        dispatch(updatePasswordFail(error.response.data.error))
    } else if ((error.response.data.message)) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
  }
}












  
  
  
  
  
  
  