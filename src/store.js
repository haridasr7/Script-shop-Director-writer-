import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./slices/authSlice";
import scriptsReducer from "./slices/scriptsSlice"
import  writerReducer from "./slices/writerslice"

const reducer = combineReducers({
  authState: authReducer,
  scriptsState: scriptsReducer,
  writerState: writerReducer
});
const store = configureStore({
  reducer,
  middleware: [thunk],
});
export default store;