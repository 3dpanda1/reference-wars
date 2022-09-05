import React, {createRef} from 'react';
import ReactDom from 'react-dom';

/*props:{
  value:
  onChange:
}
*/

const BaseOptions = (props) => {
  const onlyOnceRef = createRef();
  const titlesRef = createRef();

  const updateOptionsHandler = (e, a) =>{
    switch (a) {
      case 1:
        props.onChange({onlyOnce: onlyOnceRef.current.checked,
          titles: titlesRef.current.checked});
      break;
      case 2:
        props.onChange({onlyOnce: onlyOnceRef.current.checked,
          titles: e.target.checked});
        break;
    }
  }

  return (
    <>
      <label>
        <input type="checkbox"
        ref = {onlyOnceRef}
        checked = {props.value.onlyOnce}
        onChange={e => updateOptionsHandler(e, 1)} />
        count each ref only once, doesnt allow repetition
      </label>
      <br />
      <label>
        <input type="checkbox" 
        ref= {titlesRef}        
        checked = {props.value.titles}
        onChange={e => updateOptionsHandler(e, 2)} />
        album titles count as references
      </label>
    </>
  );
};
export default BaseOptions;
