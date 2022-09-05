import React from 'react';

function OverlaySpanTextArea(props) {
  const processWord = (currWord, index) => {
   //currWord.word = currWord.word.replace(' ','\xa0');
    //console.log(currWord.word, currWord.word.search(/ $/));
    //currWord.word = currWord.word.replace(/ $/,'\xa0');
    
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
