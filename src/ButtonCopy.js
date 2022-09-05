import React, { useState } from 'react';

//props = {data: functionWithRef}
const ButtonCopy = (props) => {
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy
  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(props.data.current.value);
      setCopySuccess('Copied!');
    } catch (err) {
      try {
        props.data.current.select();
        document.execCommand('copy');
        err.target.focus();
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    }

    let time = setTimeout(() => {
      setCopySuccess('');
      clearTimeout(time);
    }, 2000);
  };

  return (
    <div className={props.className}>
      <button aria-label = "button copy" className="button-copy" onClick={() => copyToClipBoard()}>
        {props.children}
      </button>
      <div>{copySuccess}</div>
    </div>
  );
};

export default ButtonCopy;
