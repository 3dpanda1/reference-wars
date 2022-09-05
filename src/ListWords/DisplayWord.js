import React, { useState, useRef } from 'react';
import { PencilSquare, XSquare, CheckSquare } from 'react-bootstrap-icons';

//props:{
//  className:,
//  keyId:
//  onAction:
//  isTitle:
//  songName:
//}
const DisplayWord = (props) => {

  const refInput = useRef();
  const [fieldEdit, setFieldEdit] = useState('');
  const [editButtons, SetEditButtons] = useState();

  const EditWordHandler = () => {
    const inputVal = refInput.current.value; 
    if (inputVal){
      props.onAction('EDIT_SONG', inputVal);
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
          onClick={() => props.onAction('DELETE_SONG','')}>
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
