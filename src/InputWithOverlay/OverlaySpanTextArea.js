import React from 'react';

// props:{
//   text:
// }

function OverlaySpanTextArea(props) {
  const processWord = (currWord, index) => {
    
    if (!currWord.word) return;
    if (currWord.word === '\n') {
      return <br key = {index}/>;
    }

    let key = index  + currWord.word;
    if (currWord.marked) {
      return <span key ={key} className="text-overlay used-inline">{currWord.word}</span>;
    } else {
      return <span  className="text-overlay" key ={key}>{currWord.word}</span>;
    }
  };

  const convertToHtml = (textArray) => {
    return textArray.map(processWord);
  };

  return <span className="wrapper-text">{convertToHtml(props.text)}</span>;
}

export default OverlaySpanTextArea;
