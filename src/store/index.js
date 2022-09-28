import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./count-Slice";
import listWordsSlice from "./listWords-slice";
import optionsSlice from "./options-slice";

const store = configureStore({
    reducer:{
        options: optionsSlice.reducer, 
        list: listWordsSlice.reducer, 
        count: countSlice.reducer
    }
});

export default store;