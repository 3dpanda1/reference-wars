import React, { useState, useRef } from 'react';
import { PencilSquare, XSquare, CheckSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { listWordsActions } from '../../store/listWords-slice';

//props:{
//  className:,
//  keyId:
//  onAction:
//  isTitle:
//  songName:
//}
const DisplayWord = (props) => {
  const dispatch = useDispatch();
  const refInput = useRef();
  const [fieldEdit, setFieldEdit] = useState('');
  const [editButtons, SetEditButtons] = useState();

  const EditWordHandler = () => {
    const inputVal = refInput.current.value; 
    if (inputVal){
      if(props.songIndex<0){
        dispatch(listWordsActions.EditTitleAlbum({
          indexAlbum: props.albumIndex, 
          albumTitle: inputVal
        }));
      }else{
        dispatch(listWordsActions.EditTitleSong({
          indexAlbum: props.albumIndex, 
          indexSong: props.songIndex, 
          songTitle: inputVal
        }));
      }
      //props.onAction('EDIT_SONG', inputVal);
    }
    setFieldEdit ('');
  }

  const FieldEditHandler = () => {
    setFieldEdit(
    <div className= "input-word" >
      <input type = "text" ref= {refInput}/>
      <button onClick={EditWordHandler}>
        <CheckSquare 
        style={{
          height: '100%',
          width: '100%'
        }}/>
      </button>
    </div>);
  }

  const onHoverHandler = () => {
    SetEditButtons(
      <>
        {!props.isTitle && (
          <button aria-label = {"delete song " + props.name}
          onClick={() => dispatch(listWordsActions.DeleteSong({
            indexAlbum: props.albumIndex, 
            indexSong: props.songIndex
          }))}>
            <XSquare/>
          </button>
        )}
        <button 
        aria-label = {props.isTitle?("edit title " + props.name) : ("edit song " +props.name )}
        onClick={FieldEditHandler}>
          <PencilSquare />
        </button>
      </>
    );
  };

  if(fieldEdit){
    return fieldEdit;
  }
  else{
    return (
      <div
        key={props.keyId+"_wordContainer"}
        className={"word-container " + props.className}
        onMouseOver={onHoverHandler}
        onMouseLeave={() => SetEditButtons('')}
      >
        <span className={"word"}>
          {props.children}
        </span>
        <span>{editButtons}</span>
      </div>
    );
  };
};

export default DisplayWord;
