import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice(
  {
    name: 'counter',
    initialState: {refs: 0, cArray: []},
    reducers:{
      incrementCount(state){
        state.refs++;
      },
      resetCount(state){
        state.refs = 0;
      },
      loadRefs(state, action){
        state.cArray = action.payload;
      },
      resetRefs(state){
        state.cArray = [];
      }
    }
  });

  export const countActions = countSlice.actions;
  export default countSlice;