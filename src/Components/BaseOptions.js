import React, {createRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { optionsActions } from '../store/options-slice';

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
        props.onChange({onlyOnce: e.target.checked,
          titles: titlesRef.current.checked});
      break;
      case 2:
        props.onChange({onlyOnce: onlyOnceRef.current.checked,
          titles: e.target.checked});
        break;
        default:
          break;
    }
  }

  const dispatch = useDispatch();

  const updateOnlyOnceHandler = (e) =>{
    dispatch (optionsActions.ToggleOnlyOnce());
    //dispatch (optionsActions.EditOptions ({ onlyOnce: e.target.checked }));
  }

  const updateTitlesHandler = (e) =>{
    dispatch (optionsActions.ToggleCountTitles());
  }

  const optionOnlyOnce  = useSelector(state => state.options.onlyOnce );
  const optionCountTitles  = useSelector(state => state.options.titles );
  return (
    <>
      <label>
        <input type="checkbox"
        name = "onlyOnce"
        checked = {optionOnlyOnce}
        onChange={e => updateOnlyOnceHandler(e)} />
        count each ref only once, doesn't allow repetition
      </label>
      <br />
      <label>
        <input type="checkbox" 
        name = "titles"
        checked = {optionCountTitles}
        onChange={e => updateTitlesHandler(e)} />
        album titles count as references
      </label>
    </>
  );
};
export default BaseOptions;
