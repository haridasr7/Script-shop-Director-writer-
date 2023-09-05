
import { createSlice } from "@reduxjs/toolkit";

const scriptsSlice = createSlice({
  name: "scripts",
  initialState: {
    loading: false,
    scripts: [],
    error: null,
  },
  reducers: {
    scriptsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    scriptsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        scripts: action.payload,
        error: null,
      };
      
    },
    scriptsFail(state, action) {
      return {
        ...state,
        loading: false,
        scripts: [], 
        error: action.payload,
      };
    },
  },
});

export const { scriptsRequest, scriptsSuccess, scriptsFail } = scriptsSlice.actions;

export default scriptsSlice.reducer;