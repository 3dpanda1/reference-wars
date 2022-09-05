import React, {useState, useMemo} from 'react';
import listWordsDefault from './ListWordsDefault';

const useRefStorage = ()=>{
  const emptyWords = useMemo(()=>(FillWords()), []);
  //const nonMarkedWords = useMemo (()=>ResetMarks(emptyWords), []);
  const savedOptions = useMemo(()=>LoadOptionsFromStorage (),[])
  const [data, editData] = useState(
    {
      words: emptyWords,
      cleanWords: (()=>ResetMarks(emptyWords)),
      count: 0,
      options: (savedOptions? savedOptions :{
        titles: false,
        onlyOnce: false,
      }),
    } /*{words: [{
            album: {word: 'p', used: false}, 
            songs: [{word: 'aa', used: false}]
          }], 
          count: 0
          options: {
            titles: false,
            onlyOnce: false,
          },
        }*/
  );
  
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

  function LoadOptionsFromStorage () {
    let stringData = localStorage.getItem("options");
    if (!stringData)
      return;
    console.log("loading options from storage")
    return JSON.parse(stringData);
  }

  function SaveOptionsToStorage(wordsData) {
    let stringData = JSON.stringify(wordsData);;
    try {
       localStorage.setItem('options', stringData);
    }catch(err){
      console.log(err + "error saving options to storage")
    }
  }

  function FillSubWords (listSubWords){
    return listSubWords.map((p) => ({ word: p, used: false }));
  }

  function FillWords(){
    console.log("loading data");
    let cookieData = LoadWordsFromStorage();
    if(cookieData)
      return cookieData;

    return listWordsDefault.map((p) => ({
      album: { word: p.album, used: false },
      songs: FillSubWords(p.songs),
    }));
  }

  function ResetMarks(tempWords){
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
  
  function editRefStorage(newData, save = false){
    editData(newData);
    if (save){
        editData(temp => {
          const cleanWordsEdited = ResetMarks(temp.words);
          SaveWordsToStorage(cleanWordsEdited);
          SaveOptionsToStorage(temp.options);
          return {...temp, cleanWords:(()=>ResetMarks(temp.words))}
        });
    }
  }
  return [data, editRefStorage];
}

export default useRefStorage;