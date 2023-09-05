import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
      
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearMessage(state,action){
      return {
        ...state,
        message: null,
      }
    },
    forgotPasswordRequest(state, action){
      return {
          ...state,
          loading: true,
          message:null
      }
  },
  forgotPasswordSuccess(state, action){
      return {
          ...state,
          loading: false,
          message: action.payload.message
      }
  },
  forgotPasswordFail(state, action){
      return {
          ...state,
          error: action.payload

  }
},
resetPasswordRequest(state, action){
  return {
      ...state,
      loading: true,
  }
},
resetPasswordSuccess(state, action){
  return {
      ...state,
      loading: false,
      isAuthenticated:true,
      user: action.payload.user
  }
},
resetPasswordFail(state, action){
  return {
      ...state,
      loading: false,
      error:  action.payload
  }
},
registerRequest(state, action){
  return {
      ...state,
      loading: true,
  }
},
registerSuccess(state, action){
  return {

      loading: false,
      isAuthenticated: true,
      user: action.payload.user
  }
},
registerFail(state, action){
  return {
      ...state,
      loading: false,
      error:  action.payload
  }
},
logoutSuccess(state, action){
  return {
      
      loading: false,
      isAuthenticated: false,
  }
},
logoutFail(state, action){
  return {
      ...state,
      error:  action.payload,
      loading: false,
  }
},
addToUserFavSuccess(state, action){
  return {
    ...state,
      user:action.payload.user
  }
},
removeFromUserFavSuccess(state, action){
  return {
    ...state,
      user:action.payload.user
  }
},
contactFormSendRequest(state, action){
  return {
      ...state,
      loading: true,
  }
},
contactFormSendSuccess(state, action){
  return {
      ...state,
      message:action.payload.message,
      loading: false,
  }
},
contactFormSendFail(state, action){
  return {
      ...state,
      error:  action.payload,
      loading: false,
  }
},
updatePasswordRequest(state, action) {
  return {
    ...state,
    loading: true,
  }
},
updatePasswordSuccess(state, action) {
  return {
    ...state,
    loading: false,
    isAuthenticated: false,
    message: action.payload.message
  }
},
updatePasswordFail(state, action) {
  return {
    ...state,
    loading: false,
    error: action.payload
  }
 },

  }
});
const { actions, reducer } = authSlice;
export const { loginRequest, loginSuccess, loginFail, clearError,forgotPasswordRequest,clearMessage,
  forgotPasswordSuccess,
  forgotPasswordFail,resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,  registerFail,
  registerRequest,
  registerSuccess,logoutSuccess,
  logoutFail ,addToUserFavSuccess,removeFromUserFavSuccess,
  contactFormSendRequest,contactFormSendSuccess,contactFormSendFail,
  updatePasswordRequest,updatePasswordSuccess,updatePasswordFail} = actions;
export default reducer;