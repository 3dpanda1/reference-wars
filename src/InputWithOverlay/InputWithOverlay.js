import React, { useState } from 'react';
import BaseInputTextArea from './BaseInputTextArea';

const separators = [',', '.', ' ', ';', '\n'];

function InputWithOverlay(props) {
  const [textOut, setTextOut] = useState('');
  let count = 0;

  const getReference = (currWord, words) => {
    let ref = '';
    for (let wordGroup of words) {
      ref = wordGroup.songs.find(function (item) {
        return item.word === currWord;
      });
      if (ref) {
        return ref;
      }
    }
    return '';
  };

  const markReference = (reference) => {
    reference.used = true;
    count = count + 1;
  };

  function ProcessSeparator(currWord) {
    if (currWord === ' ') {
      return <span>&nbsp;</span>;
    } else if (currWord === '\n') {
      return <br />;
    } else {
      return <span>{currWord}</span>;
    }
  }

  function ProcessWord(currWord, words) {
    let reference = getReference(currWord, words);
    if (!reference) {
      return <span>{currWord}</span>;
    } else {
      markReference(reference);
      return <span className="used-inline">{currWord}</span>;
    }
  }

  function ProcessWholeText(theText, words) {
    const letters = theText.split('');
    let currWord = '';
    let ret = [];
    for (let i = 0; i < letters.length; i++) {
      //TODO: create json with special chars and html
      // [' ']: &nbsp;
      if (-1 < separators.indexOf(letters[i])) {
        if (currWord) {
          ret.push(ProcessWord(currWord, words));
          currWord = '';
        }
        ret.push(ProcessSeparator(letters[i]));
      } else {
        currWord += letters[i];
      }
    }
    if (currWord !== '') ret.push(ProcessWord(currWord, words));
    return ret;
  }

  function ChangeMessage(inputData) {
    setTextOut(ProcessWholeText(inputData, props.words));
    props.onSave(props.words, count);
  }

  const example = 'Start editing to. see some; magic happen :)'.split(
    /\b|(?=\W)/g
  );

  return (
    <div className="wrapper">
      <BaseInputTextArea onChangeMessage={ChangeMessage} />
      <span className="wrapper-text">{textOut}</span>
    </div>
  );
}

export default InputWithOverlay;
