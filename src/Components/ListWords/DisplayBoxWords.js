import React, { useRef, useEffect } from 'react';
import DisplayListWords from './DisplayListWords';
import { PlusSquare} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { listWordsActions } from '../../store/listWords-slice';

// props: {
//   words: 
//   onModifySong:
// }

let semaphore = true;
function DisplayBoxWords(props) {
  const refAlbums = useRef();
  let maxHeight = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeHandler();
  }, []);

  const onChangeHandler = () => {
    if (!refAlbums.current) return false;

    refAlbums.current.style.height = 'auto';
    const albumWidthRatio = refAlbums.current.offsetWidth / 179;
    refAlbums.current.style.height =
      refAlbums.current.offsetHeight / albumWidthRatio + 'px';
    if (refAlbums.current.offsetHeight < maxHeight)
      refAlbums.current.style.height = maxHeight + 'px';
    return true;
  };

  const maxHeightHandler = (curr) => {
    maxHeight = maxHeight < curr ? curr : maxHeight;
  };

  let time = setTimeout(() => {}, 1000);

  const debounceOnChangeHandler = () => {
    if (semaphore) {
      clearTimeout(time);
      semaphore = !onChangeHandler();
      time = setTimeout(() => {
        semaphore = true;
      }, 500);
    }
  };

  window.addEventListener('resize', debounceOnChangeHandler);

  const words = useSelector(state => state.list.words);
  return (
    <>
      <div className="box-albums" ref={refAlbums}>
        {words.map((p, i) => 
          {
          return <DisplayListWords
            key={i + '_' + p.album}
            id = {i + '_' + p.album}
            title={p.album}
            listWords={p.songs}
            loadHeight={maxHeightHandler}
            albumIndex = {i}
            onEditField ={(action, indexSong, newSong) => {
              props.onModifySong(action, i, indexSong, newSong)
            }}
          />
          })}
        <button className = "add-album-button" 
        aria-label = "add a new album"
        onClick={()=>dispatch(listWordsActions.AddAlbum())/*props.onModifySong('ADD_ALBUM', props.words.length)*/}>
        <PlusSquare style={{
            height: '90%',
            width: '90%'
            }}/>
        </button>
      </div>
    </>
  );
}
export default DisplayBoxWords;
