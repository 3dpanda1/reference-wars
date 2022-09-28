import { configureStore } from "@reduxjs/toolkit";
import optionsSlice from "./options-slice";

const store = configureStore({
    reducer:{options: optionsSlice.reducer}
});

export default store;