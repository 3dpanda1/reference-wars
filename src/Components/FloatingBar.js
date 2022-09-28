import React from 'react';
import { useSelector } from 'react-redux';
import countSlice from '../store/count-Slice';
import ButtonCopy from './ButtonCopy';

//props:{
//getRef: get the ref to the text to copy
//refCount: number of refs found in the text
//}
const FloatingBar = (props) => {
  const refCount = useSelector(state=>state.count.refs);
  return (
    <div className="floating-bar">
      <div className="card-right">
        <div className="count-title">References: </div>
        <div className="count-title-short">Refs: </div>
        <div className="count-number" aria-label = {refCount + " refs until now"}>{refCount}</div>
      </div>
      <ButtonCopy className="button-right" data={props.getRef()}>
        copy it
      </ButtonCopy>
      <div className="card-top">
        <div className="card-left"> the War of Refs:</div>
      </div>
    </div>
  );
};

export default FloatingBar;
