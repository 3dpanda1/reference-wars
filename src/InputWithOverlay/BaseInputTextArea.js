import React from 'react';
const BaseInputTextArea = React.forwardRef((props, ref) => {
  
  function StyleTexArea(textAreaRef) {
    textAreaRef.style.height = 'auto';
    if(textAreaRef.scrollHeight<150){
      textAreaRef.style.height = 150 + 'px';
    }else{
      textAreaRef.style.height = textAreaRef.scrollHeight + 'px';
    }
  }

  const ChangeMessajeHandler = (event) => {
    if(props.onChangeMessage)
      props.onChangeMessage(event.target.value);
    else{
      let arr = event.target.value.split(/\b|(?=\W)/g);
      props.onEditMessage(arr);
    }
    StyleTexArea(event.target);  
  };

  return <textarea aria-label = "enter text with references" ref = {ref} value = {props.value} type="text" onChange={ChangeMessajeHandler} />;
})

export default BaseInputTextArea;
