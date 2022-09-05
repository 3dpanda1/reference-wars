import React, { useState, useRef } from 'react';
import { PlusSquare, XSquare, CheckSquare } from 'react-bootstrap-icons';

// props:{
//   action:
//   albumName:
// }

const ListButtons = (props) => {
  const refInput = useRef();
  const [fieldNew, setFieldNew] = useState('');

  const OnAddWord = () => {
    const inputVal = refInput.current.value; 
    if (inputVal){
      props.onAction('ADD_SONG', inputVal);
    }
    setFieldNew ('');
  }

  const DeleteAlbumHandler = () => {
    props.onAction('DELETE_ALBUM', '');
  }

  const FieldNewHandler = () => {
    setFieldNew(
    <div className= "input-word">
      <input type = "text" ref= {refInput}/>
      <button onClick={OnAddWord}>
        < CheckSquare 
        style={{
          height: '100%',
          width: '100%'
        }}/>
      </button>
    </div>);
  }

  return(
      <div className = "album-controls">
        {fieldNew}
        <button aria-label = {"delete " + props.albumName + " album"}
        onClick={DeleteAlbumHandler}>
          <XSquare style={{
            height: '100%',
            width: '100%'
            }}/>
        </button>
        <button aria-label = {"add a new song to " + props.albumName + " album"}
        onClick={FieldNewHandler}> 
          <PlusSquare 
          style={{
            height: '100%',
            width: '100%'
            }}/> 
        </button>
      </div>);
}

export default ListButtons;