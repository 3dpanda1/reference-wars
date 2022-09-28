import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countActions } from '../../store/count-Slice';
import { listWordsActions } from '../../store/listWords-slice';
import BaseInputTextArea from './BaseInputTextArea';
import OverlaySpanTextArea from './OverlaySpanTextArea';

// props:{
//   data:
//   cleanWords:
//   onSave:
// }

let arrayData = [];
const InputWithOverlay = React.forwardRef((props, ref) => {
  //let count = 0;
  const [inputArray, setInputArray] = useState([]);

  const options = useSelector(state => state.options);
  const words = useSelector(state => state.list.words);
  const dispatch = useDispatch();

  let used = [];

  useEffect(() => {
    changeMessageHandlerV3(inputArray);
  }, [options]);


  const markReference2 = (indexAlbum, indexSong) => {
    console.log(words[indexAlbum].songs[indexSong].word,
      words[indexAlbum].songs[indexSong].used)
    if (options.onlyOnce && used.some(a=> (a[0]=== indexAlbum && a[1]===indexSong))) 
      return false;
    used.push([indexAlbum, indexSong]);
    console.log(used);
    console.log('onlyOnce', options.onlyOnce)
    dispatch(countActions.incrementCount());
    return true;
  };

  const splitByIndividualWord = (argArrayData, ref, n,m) => {
    
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
          marked: markReference2(n,m),
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
    //let {words, count:countCompar, options2} = props.data;
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
    /*if (count !== countCompar)
      props.onSave(words, count);*/
  };

  return (
    <div className="wrapper">
      <BaseInputTextArea ref = {ref} onEditMessage={changeMessageHandlerV3} />
      <OverlaySpanTextArea text={arrayData} />
    </div>
  );
})

export default InputWithOverlay;
