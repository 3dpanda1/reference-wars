import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countActions } from '../../store/count-Slice';
import BaseInputTextArea from './BaseInputTextArea';
import OverlaySpanTextArea from './OverlaySpanTextArea';

// props:{
//   data:
//   cleanWords:
//   onSave:
// }

let separators = [' ', ',', ';', '.', ':', '-', '=', '(', ')', '[', ']', '|', '?', '~', '!', '+', '>', '"', '%', '*', '\n', '\t'];
let arrayData = [];
const InputWithOverlay = React.forwardRef((props, ref) => {
  const [inputArray, setInputArray] = useState([]);

  const options = useSelector(state => state.options);
  const words = useSelector(state => state.list.words);
  const dispatch = useDispatch();

  let used = [];

  useEffect(() => {
    changeMessageHandlerV3(inputArray);
  }, [options, words]);

  const CheckCompleteness = (charStart, charEnd, array)=>{
    let startCheck = charStart<0 || separators.includes(array[charStart]);
    let endCheck = array.length<=charEnd || separators.includes(array[charEnd]);
    return startCheck && endCheck;
  }

  const findIndex = ( cutArray, wordRef)=>{
    let n = 0;
    let i = cutArray.toLowerCase().indexOf(wordRef.toLowerCase());
    let vars = [];
    while(0<=i){
      const index = n+i;
      if(CheckCompleteness(index-1 , index+wordRef.length,cutArray)) 
        return index;
      vars.push();
      n += i + wordRef.length;
      i = cutArray.slice(n).toLowerCase().indexOf(wordRef.toLowerCase());
    }
    return -1;
  }

  const markReference = (indexAlbum, indexSong) => {
    if (options.onlyOnce && used.some(a=> (a[0]=== indexAlbum && a[1]===indexSong))) 
      return false;
    used.push([indexAlbum, indexSong]);
    dispatch(countActions.incrementCount());
    return true;
  };

  const splitByIndividualWord = (argArrayData, ref, n,m) => {
    
    let i = -1;
    let cutArray = argArrayData;
    let assembledArray = [];
    let wordRef = ref;

    do {
      i = findIndex( cutArray, wordRef);
      const endpoint = i + wordRef.length;
      if (0 <= i) {
        assembledArray.push({
          word: cutArray.slice(0, i),
          marked: false,
        });
        assembledArray.push({
          word: cutArray.slice(i, endpoint),
          marked: markReference(n,m),
        });
        cutArray = cutArray.slice(endpoint);
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
    setInputArray(arrayText);
    dispatch(countActions.resetCount())
    used = [];
    let  allWords = words;
    arrayData = [{ word: arrayText.join(''), marked: false }];
    let arrayTemp = [];
    for (let [n, wordGroup] of allWords.entries()) {
      for (let [m, song] of wordGroup.songs.entries()) {
        arrayTemp = [];
        for (let segment of arrayData) {
          if (segment.marked) arrayTemp.push(segment);
          else
            arrayTemp = arrayTemp.concat(
              splitByIndividualWord(segment.word, song, n, m)
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
              splitByIndividualWord(segment.word, wordGroup.album, n, -1)
            );
        }
        arrayData = arrayTemp;
      }
    }
    dispatch(countActions.loadRefs(used));
  };

  return (
    <div className="wrapper">
      <BaseInputTextArea ref = {ref} onEditMessage={changeMessageHandlerV3} />
      <OverlaySpanTextArea text={arrayData} />
    </div>
  );
})

export default InputWithOverlay;
