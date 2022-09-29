import { createSlice } from "@reduxjs/toolkit";
import listWordsDefault from "../ReferenceStorage/ListWordsDefault";

function LoadWordsFromStorage () {
  let stringData = localStorage.getItem("songs");
  if (!stringData)
    return;
  console.log("loading data from storage")

  return JSON.parse(stringData);
}

function SaveWordsToStorage(wordsData) {
  let stringData = JSON.stringify(wordsData);
  console.log("saved " + new Blob([stringData]).size + "b in storage");
  try {
    localStorage.setItem('songs', stringData);
  }catch(err){
    console.log(err + "error saving songs to storage")
  }
}

function NewAlbum(){
  return {
    album: 'New Album',
    songs: []
  };
}

const LoadAlbum = (album)=>{
    return {album: {word: album.album, used: false},
            songs: album.songs.map(s => ({word: s/*, used: false*/}))
        }
}

const LoadWords = () => {
  const savedWords = LoadWordsFromStorage ();
  //console.log (savedWords, listWordsDefault)
  let ret = savedWords ? savedWords : listWordsDefault;
  return ret;
};

const listWordsSlice = createSlice
({
  name: 'listWords', 
  initialState: {words: LoadWords()},
  reducers:{
    DeleteSong(state, action){
      const {indexAlbum, indexSong} = action.payload;
      state.words[indexAlbum].songs.splice(indexSong, 1);
      SaveWordsToStorage(state.words);
    },
    EditTitleSong(state, action){
      const {indexAlbum, indexSong, songTitle} = action.payload;
      console.log('indexAlbum',indexAlbum, 'indexSong', indexSong);
      state.words[indexAlbum].songs.splice(indexSong, 1,songTitle);
      SaveWordsToStorage(state.words);
    },
    EditTitleAlbum(state, action){
      const {indexAlbum, albumTitle} = action.payload;
      console.log('indexAlbum',indexAlbum);
      state.words[indexAlbum].album = albumTitle;
      SaveWordsToStorage(state.words);
    },
    AddSong(state, action){
        const {indexAlbum, newSong} = action.payload;
    state.words[indexAlbum].songs.push(newSong);
    SaveWordsToStorage(state.words);
    },
    DeleteAlbum(state, action){
        const {indexAlbum} = action.payload;
      state.words.splice(indexAlbum, 1);
      SaveWordsToStorage(state.words);
    },
    AddAlbum(state, action){
      state.words.push(NewAlbum());
      SaveWordsToStorage(state.words);
    }
  }
})

export const listWordsActions = listWordsSlice.actions;
export default listWordsSlice;