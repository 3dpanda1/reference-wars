import React, { createRef } from 'react';
import './style.css';
import InputWithOverlay from './Components/InputWithOverlay/InputWithOverlayB';

import useRefStorage from './ReferenceStorage/useRefStorage';
import DisplayBoxWords from './Components/ListWords/DisplayBoxWords';
import FloatingBar from './Components/FloatingBar';
import BaseOptions from './Components/BaseOptions';
import { useSelector } from 'react-redux';

export default function App() {
  const refText = createRef();

  const [data, editData] = useRefStorage( );
  // {words: [{
  //     album: {word: 'p', used: false}, 
  //     songs: [{word: 'aa', used: false}]
  //   }], 
  //   count: 0
  //   options: {
  //     titles: false,
  //     onlyOnce: false,
  //   },
  // }


  function save(a, c) {
    console.log("editing marks")
    editData((temp) => {
      return { ...temp, words: a, count: c };
    });
  }

  function changeOptionsHandler(options) {
    editData((temp) => {
      return { ...temp, options: options };
    }, true);
  }
  
  function NewAlbum(){
    return {
      album: {word: 'New Album', used: false},
      songs: []
    };
  }

  function ModifySongHandler(action, indexAlbum, indexSong = -1, newSong = '') {
    editData((temp) => {
      if (action === 'DELETE_SONG')
        temp.words[indexAlbum].songs.splice(indexSong, 1);
      if (action === 'EDIT_SONG')
        temp.words[indexAlbum].songs.splice(indexSong, 1, {
          word: newSong,
          used: false,
        });
      if (action === 'EDIT_TITLE')
        temp.words[indexAlbum].album = { word: newSong, used: false };
      if(action === 'ADD_SONG')
        temp.words[indexAlbum].songs.push({
          word: newSong,
          used: false,
        });
      if(action === 'DELETE_ALBUM')
        temp.words.splice(indexAlbum, 1);
      if(action === 'ADD_ALBUM')
        temp.words.push(NewAlbum());

      let num = temp.count;
      let newData = {
        words: temp.words,
        count: num,
        options: temp.options,
      };
      return { ...newData };
    }, true);
  }

  function getRefHandler() {
    return refText;
  }


  return (
    <div>
      <FloatingBar getRef={getRefHandler} refCount={data.count} />
      <div className="main">
        texto a ingresar:
        <InputWithOverlay
          ref={refText}
          data = {data}
          cleanWords = {data.cleanWords}
          onSave={save}
        />
        <DisplayBoxWords words={data.words} onModifySong={ModifySongHandler} />
        <br />
        <BaseOptions onChange={changeOptionsHandler} />
      </div>
    </div>
  );
}
