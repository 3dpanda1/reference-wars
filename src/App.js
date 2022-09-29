import React, { createRef } from 'react';
import './style.css';
import InputWithOverlay from './Components/InputWithOverlay/InputWithOverlayB';

import DisplayBoxWords from './Components/ListWords/DisplayBoxWords';
import FloatingBar from './Components/FloatingBar';
import BaseOptions from './Components/BaseOptions';

export default function App() {
  const refText = createRef();

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

  function getRefHandler() {
    return refText;
  }


  return (
    <div>
      <FloatingBar getRef={getRefHandler} />
      <div className="main">
        <InputWithOverlay
          ref={refText}
        />
        <DisplayBoxWords/>
        <br />
        <BaseOptions/>
      </div>
    </div>
  );
}
