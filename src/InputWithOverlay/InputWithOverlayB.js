import React, { useState, useEffect } from 'react';
import BaseInputTextArea from './BaseInputTextArea';
import OverlaySpanTextArea from './OverlaySpanTextArea';

let arrayData = [];
const InputWithOverlay = React.forwardRef((props, ref) => {
  //const [data, setData] = useState([]);
  let count = 0;
  const [inputArray, setInputArray] = useState([]);

  useEffect(() => {
    changeMessageHandlerV3(inputArray);
  }, [props.data.options]);

  /*const startReference = (currWord, words) => {
    let allRefs = startReferences(currWord, words);
    if (allRefs.length === 0) return [['', false]];
    return allRefs[0];
  };

  const startReferences = (currWord, words) => {
    let allRefs = [];
    for (let wordGroup of words) {
      let currRef = [];
      currRef = currRef.concat(
        wordGroup.songs.filter(function (item) {
          return (
            item.word.split(/\b|(?=\W)/g)[0].toLowerCase() ===
            currWord.toLowerCase()
          );
        })
      );
      if (
        props.options.titles &&
        wordGroup.album.word.split(/\b|(?=\W)/g)[0].toLowerCase() ===
          currWord.toLowerCase()
      )
        currRef.push(wordGroup.album);

      allRefs = allRefs.concat(
        currRef.map((ref) => [ref, ref.word.split(/\b|(?=\W)/g).length === 1])
      );
    }

    console.log(allRefs);
    return allRefs;
  };

  const contReference = (accWord, ref) => {
    let accWordlSplit = accWord.toLowerCase().split(/\b|(?=\W)/g);
    let refSplit = ref.word.toLowerCase().split(/\b|(?=\W)/g);
    if (accWordlSplit.length <= refSplit.length) {
      for (let i = 0; i < accWordlSplit.length; i++) {
        if (accWordlSplit[i] !== refSplit[i]) return ['', true];
      }
      console.log('output single: ', [
        ref,
        accWordlSplit.length === refSplit.length,
      ]);
      return [ref, accWordlSplit.length === refSplit.length];
    } else {
      return ['', true];
    }
  };

  const contReferences = (accWord, refs) => {
    let tempRef;
    let tempEnded = true;
    let ret = [];
    for (let ref of refs) {
      console.log('ref:', ref);
      [tempRef, tempEnded] = contReference(accWord, ref[0]);
      if (tempRef) {
        if (tempEnded) {
          console.log('output: ', [tempRef, tempEnded]);
          return [[tempRef, tempEnded]];
        } else {
          ret.push([tempRef, tempEnded]);
        }
      }
    }
    return ret;
  };


  const changeMessageHandler = (arrayText) => {
    setInputArray(arrayText);
    let accWord = '';
    let ref;
    let ended = true;
    arrayData = arrayText.map((currWord) => {
      if (ended) accWord = '';

      if (!ref) {
        [ref, ended] = startReference(currWord, props.words);
        console.log('firs ref: ' + ref.word);
        accWord = currWord;
      } else {
        accWord += currWord;
        [ref, ended] = contReference(accWord, ref);
      }

      if (ref && ended) {
        return { marked: markReference(ref), word: accWord };
      } else if (ref && !ended) {
        return { marked: false, word: '' };
      } else {
        return { marked: false, word: accWord };
      }
    });
    props.onSave(props.words, count);
    //setData(arrayData)
  };

  const changeMessageHandlerV2 = (arrayText) => {
    setInputArray(arrayText);
    let accWord = '';
    let refs = [];
    let ended = true;
    arrayData = arrayText.map((currWord) => {
      if (ended) accWord = '';

      if (refs.length === 0 || !refs[0][0]) {
        refs = startReferences(currWord, props.words);
        console.log(refs);
        accWord = currWord;
      } else {
        accWord += currWord;
        console.log(refs);
        refs = contReferences(accWord, refs);
      }

      let endRef = refs.find((ref) => {
        return ref[1] && ref[0];
      });
      console.log('endref', endRef);
      ended = true;
      if (endRef) {
        return { marked: markReference(endRef[0]), word: accWord };
      } else if (0 < refs.length) {
        ended = false;
        return { marked: false, word: '' };
      } else {
        return { marked: false, word: accWord };
      }
    });
    props.onSave(props.words, count);
    //setData(arrayData)
  };*/


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

    //console.log(arrayTemp);
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
