import {createSlice} from '@reduxjs/toolkit';

function LoadOptionsFromStorage () {
  let stringData = localStorage.getItem("options");
  if (!stringData)
    return;
  console.log("loading options from storage")
  return JSON.parse(stringData);
}



const LoadOptions = () => {
  const savedOptions = LoadOptionsFromStorage ();
  return savedOptions ? savedOptions : {
    titles: false,
    onlyOnce: false,
  };
};

function SaveOptionsToStorage(wordsData) {
  let stringData = JSON.stringify(wordsData);;
  try {
   localStorage.setItem('options', stringData);
  }catch(err){
    console.log(err + "error saving options to storage")
  }
}

const optionsSlice = createSlice({
  name: 'options', 
  initialState: LoadOptions(),
  reducers: {
    EditOptions (state, action){ 
      const newOption = action.payload;
      state = {...state, ...newOption}
      SaveOptionsToStorage (state);
    },
    ToggleOnlyOnce(state){
      state.onlyOnce = !state.onlyOnce;
      SaveOptionsToStorage (state);
    },
    ToggleCountTitles(state){
      state.titles = !state.titles;
      SaveOptionsToStorage (state);
    }
  }
  });

export const optionsActions = optionsSlice.actions;
export default optionsSlice;