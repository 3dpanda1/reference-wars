import React, { useRef, useEffect } from 'react';
import DisplayListWords from './DisplayListWords';
import { PlusSquare} from 'react-bootstrap-icons';

// props: {
//   words: 
//   onModifySong:
// }

let semaphore = true;
function DisplayBoxWords(props) {
  const refAlbums = useRef();
  let maxHeight = 0;

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

  return (
    <>
      <div className="box-albums" ref={refAlbums}>
        {props.words.map((p, i) => (
          <DisplayListWords
            key={i + '_' + p.album.words}
            id = {i + '_' + p.album.words}
            title={p.album}
            listWords={p.songs}
            loadHeight={maxHeightHandler}
            onEditField ={(action, indexSong, newSong) => {
              props.onModifySong(action, i, indexSong, newSong)
            }}
          />
        ))}
        <button className = "add-album-button" 
        aria-label = "add a new album"
        onClick={()=>props.onModifySong('ADD_ALBUM', props.words.length)}>
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
