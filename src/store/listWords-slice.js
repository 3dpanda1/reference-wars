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
    album: {word: 'New Album', used: false},
    songs: []
  };
}
const ResetMarks = (tempWords) => {
    let ret = tempWords.map((p) => {
      p.album.used = false;
      p.songs.map((s) => {
        s.used = false;
        return s;
      });
      return p;
    });
    return ret;
  };

const UnloadAlbum = (album)=>{
    return{album: album.album.word,
            songs: album.songs.map(s=>s.word)
        }
}

const LoadAlbum = (album)=>{
    return {album: {word: album.album, used: false},
            songs: album.songs.map(s => ({word: s, used: false}))
        }
}

const LoadWords = () => {
  const savedWords = LoadWordsFromStorage ();
  //console.log (savedWords, listWordsDefault)
  let ret = savedWords ? savedWords : listWordsDefault;
  console.log (ret.map(LoadAlbum));
  return ret.map(LoadAlbum);
};

const listWordsSlice = createSlice
({
  name: 'listWords', 
  initialState: {words: LoadWords()},
  reducers:{
    DeleteSong(state, action){
      const {indexAlbum, indexSong} = action.payload;
      state.words[indexAlbum].songs.splice(indexSong, 1);
      SaveWordsToStorage(state.words.map(UnloadAlbum));
    },
    EditTitleSong(state, action){
      const {indexAlbum, indexSong, songTitle} = action.payload;
      console.log('indexAlbum',indexAlbum, 'indexSong', indexSong);
      state.words[indexAlbum].songs.splice(indexSong, 1, {
        word: songTitle,
        used: false,
      });
      SaveWordsToStorage(state.words.map(UnloadAlbum));
    },
    EditTitleAlbum(state, action){
      const {indexAlbum, albumTitle} = action.payload;
      console.log('indexAlbum',indexAlbum);
      state.words[indexAlbum].album = { word: albumTitle, used: false };
      SaveWordsToStorage(state.words.map(UnloadAlbum));
    },
    AddSong(state, action){
        const {indexAlbum, newSong} = action.payload;
    state.words[indexAlbum].songs.push({
      word: newSong,
      used: false,
    });
    SaveWordsToStorage(state.words.map(UnloadAlbum));
    },
    DeleteAlbum(state, action){
        const {indexAlbum} = action.payload;
      state.words.splice(indexAlbum, 1);
      SaveWordsToStorage(state.words.map(UnloadAlbum));
    },
    AddAlbum(state, action){
      state.words.push(NewAlbum());
      SaveWordsToStorage(state.words.map(UnloadAlbum));
    },

    MarkWord(state, action){
      
      console.log('marking');
      const {indexAlbum, indexSong} = action.payload;
      console.log('indexAlbum',indexAlbum, 'indexSong', indexSong);
      if(indexSong<0)
        state.words[indexAlbum].album.used = true;
      else 
        state.words[indexAlbum].songs[indexSong].used = true;
    },
    Reset(state){
      console.log('resetting');
      state.words = ResetMarks(state.words);
    }
  }
})

export const listWordsActions = listWordsSlice.actions;
export default listWordsSlice;