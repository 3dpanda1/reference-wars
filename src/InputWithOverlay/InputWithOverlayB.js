import React, { useState, useEffect } from 'react';
import BaseInputTextArea from './BaseInputTextArea';
import OverlaySpanTextArea from './OverlaySpanTextArea';

// props:{
//   data:
//   cleanWords:
//   onSave:
// }

let arrayData = [];
const InputWithOverlay = React.forwardRef((props, ref) => {
  let count = 0;
  const [inputArray, setInputArray] = useState([]);

  useEffect(() => {
    changeMessageHandlerV3(inputArray);
  }, [props.data.options]);

  const markReference = (reference) => {
    if (props.data.options.onlyOnce && reference.used) return false;
    reference.used = true;
    count = count + 1;
    return true;
  };

  const splitByIndividualWord = (argArrayData, ref) => {
    
    let i = -1;
    let cutArray = argArrayData;
    let assembledArray = [];
    let wordRef = ref.word;

    do {
      i = cutArray.toLowerCase().indexOf(wordRef.toLowerCase());
      if (0 <= i) {
        assembledArray.push({
          word: cutArray.slice(0, i),
          marked: false,
        });
        assembledArray.push({
          word: cutArray.slice(i, i + wordRef.length),
          marked: markReference(ref),
        });
        cutArray = cutArray.slice(i + wordRef.length);
      }
    } while (0 <= i);

    if (cutArray)
      assembledArray.push({
        word: cutArray,
        marked: false,
      });
    return assembledArray;
  };

  const changeMessageHandlerV3 = (arrayText) => {
    let {words, count:countCompar, options} = props.data;
    let  allWords = props.cleanWords();
    setInputArray(arrayText);
    arrayData = [{ word: arrayText.join(''), marked: false }];
    let arrayTemp = [];
    for (let wordGroup of allWords) {
      for (let song of wordGroup.songs) {
        arrayTemp = [];
        for (let segment of arrayData) {
          if (segment.marked) arrayTemp.push(segment);
          else
            arrayTemp = arrayTemp.concat(
              splitByIndividualWord(segment.word, song)
            );
        }
        arrayData = arrayTemp;
      }
      if (options.titles) {
        arrayTemp = [];
        for (let segment of arrayData) {
          if (segment.marked) arrayTemp.push(segment);
          else
            arrayTemp = arrayTemp.concat(
              splitByIndividualWord(segment.word, wordGroup.album)
            );
        }
        arrayData = arrayTemp;
      }
    }

    if (count !== countCompar)
      props.onSave(words, count);
  };

  return (
    <div className="wrapper">
      <BaseInputTextArea ref = {ref} onEditMessage={changeMessageHandlerV3} />
      <OverlaySpanTextArea text={arrayData} />
    </div>
  );
})

export default InputWithOverlay;
