import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const scriptsSlice = createSlice({
  name: "scripts",
  initialState: {
    loading: false,
    isUpdated:false,
    
  },
  reducers: {
    scriptsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    scriptsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        currentPage:action.payload.currentPage,
        totalPages:action.payload.totalPages,
        scripts: action.payload.scripts,
      };
    },
    scriptsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    scriptRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    scriptSuccess(state, action) {
      const filteredOtherScripts = action.payload.scripts.filter((item) => item.ispaid);
    
      return {
        ...state,
        loading: false,
        script: action.payload.script,
        imageFile: action.payload.imageUrl,
        otherScripts: filteredOtherScripts,
        pdfFile: action.payload.pdf,
        writerProfile: action.payload.writerProfile,
        profilePic: action.payload.profilePicUrl,
        isFollower: action.payload.isFollower,
        isFavorite: action.payload.isFavorite,
        isPaid: action.payload.isPaid,
      };
    },
    scriptFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    pdfRequest(state, action) {
      return {
        ...state,
        loading: true,
        pdfFile:null,
        error: null,
      };
    },
    pdfSuccess(state, action) {
      return {
        ...state,
        loading: false,
        
       pdfFile: action.payload
      };
    },
    pdfFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    scriptsForTabRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    scriptsForTabSuccess(state, action) {
      return {
        ...state,
        loading: false,
        scripts: action.payload.scripts,
        actionScripts: action.payload.actionScripts,
        adventureScripts: action.payload.adventureScripts,
        thrillerScripts: action.payload.thrillerScripts,
        dramaScripts: action.payload.dramaScripts,
        crimeScripts: action.payload.crimeScripts,
            
       
      };
    },
    scriptForTabFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    followRequest(state,action){
      return {
        ...state,
        loading:true,
        error: null,
      }
    },
    followSuccess(state,action){
      return {
        ...state,
        loading:false,
        message:action.payload.message,
        isFollower:action.payload.isFollower

      }
    },
    followFail(state,action){
      return {
        ...state,
        loading:false,
        error:action.payload

      }
    },
    clearMessage(state,action){
      return {
        ...state,
        message:null,
        
      }
    },
    clearUpdated(state,action){
      return {
        ...state,
        isUpdated:null,
        
      }
    },
    clearError(state,action){
      return {
        ...state,
        error:null
      }
    },
    unfollowRequest(state,action){
      return {
        ...state,
        loading:true,
        error: null,
      }
    },
    unfollowSuccess(state,action){
      return {
        ...state,
        loading:false,
        message:action.payload.message,
        isFollower:action.payload.isFollower

      }
    },
    unfollowFail(state,action){
      return {
        ...state,
        loading:false,
        error:action.payload

      }
    },
    addToFavRequest(state,action){
      return {
        ...state,
        loading:true,
        error: null,
      }
    },
    addToFavSuccess(state,action){
      return {
        ...state,
        loading:false,
        message:action.payload.message,
        isFavorite:action.payload.isFavorite
    
      }
    },
    addToFavFail(state,action){
      return {
        ...state,
        loading:false,
        error:action.payload
    
      }
    },
    scriptPaymentRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    scriptPaymentSuccess(state,action){
      return{
        ...state,
        isPaid:action.payload.isPaid,
        message:action.payload.message,
        loading:false
      }
    },
    scriptPaymentFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },

    favoriteScriptRequest(state,action){
      return{
        ...state,
        loading:true,

      }
    },
    favoriteScriptSuccess(state,action){
      return{
        ...state,
        myFavorite:action.payload.favoriteScripts,
        NumberOfFavorites:action.payload.NumberOfFavorites,
        loading:false,
        
      }
    },
    favoriteScriptFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
        
      }
    },
    removeFromFavRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    removeFromFavSuccess(state,action){
      return{
        ...state,
        isUpdated:true,
        message:action.payload.message,
        loading:false
      }
    },
    removeFromFavFail(state,action){
      return{
        ...state,
        error:action.payload,
        loading:false
      }
    },
    writerProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    writerProfileSuccess(state, action) {
      return {
        ...state,
        writerProfile: action.payload.profile,
        profilePhoto: action.payload.profilePic,
        loading: false,
        message: "Profile Updated Successfully",
      };
    },
    writerProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    purchasedScriptsRequest(state,action) {
      return {
        ...state,
        loading:true,
      }
    },
    purchasedScriptsSuccess(state,action) {
      return {
        ...state,
        purchasedScripts:action.payload,
        loading:false,
      }
    },
    purchasedScriptsFail(state,action) {
      return {
        ...state,
        error:action.payload,
        loading:false,
      }
    },
    directorProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    directorProfileSuccess(state, action) {
      return {
        ...state,
        directorProfile: action.payload.profile,
        profilePhoto: action.payload.profilePic,
        loading: false,
        message: "Profile Updated Successfully"
      };
    },
    directorProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    directorGetProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    directorGetProfileSuccess(state, action) {
      return {
        ...state,
        directorProfile: action.payload.profile,
        profilePhoto: action.payload.profilePic,
        loading: false,
      };
    },
    directorGetProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearScriptState(state, action) {
      return {
        scripts: null,
      }
    },
    writerPaymentRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    writerPaymentSuccess(state,action){
      return{
        ...state,
        isPaid:action.payload.isPaid,
        message:action.payload.message,
        loading:false
      }
    },
    writerPaymentFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },

    
    
    
  }
});
const { actions, reducer } = scriptsSlice;
export const { scriptsRequest, scriptsSuccess, scriptsFail,
scriptRequest,scriptSuccess,scriptFail,pdfRequest,pdfSuccess,pdfFail,
scriptsForTabRequest,scriptsForTabSuccess,scriptForTabFail,
followRequest,followSuccess,followFail,
clearMessage,clearError,
unfollowRequest,unfollowSuccess,unfollowFail,
addToFavRequest,addToFavSuccess,addToFavFail ,
scriptPaymentRequest,scriptPaymentSuccess,scriptPaymentFail,
clearUpdated,favoriteScriptRequest,favoriteScriptSuccess,favoriteScriptFail,
removeFromFavRequest,removeFromFavSuccess,removeFromFavFail,
writerProfileRequest, writerProfileSuccess, writerProfileFail,
purchasedScriptsRequest,purchasedScriptsSuccess,purchasedScriptsFail,
directorGetProfileRequest,directorGetProfileSuccess,directorGetProfileFail,
directorProfileRequest, directorProfileSuccess, directorProfileFail,
clearScriptState, writerPaymentRequest, writerPaymentSuccess,writerPaymentFail

 } = actions;
export default reducer;