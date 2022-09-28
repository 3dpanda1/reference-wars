import React, { useRef, useEffect } from 'react';
import './DisplayListWords';
import DisplayWord from './DisplayWord';
import ListButtons from './ListButtons';

//props:{
//  onEditField:,
//  listWords,
//}

function DisplayListWords(props) {
  const refAlbumBox = useRef();
  useEffect(() => {
    props.loadHeight(refAlbumBox.current.offsetHeight);
  });

  function StyleEachWord(p, i) {
    let key = (i < 0 ? 'title' : i) + '_' + p.word;

    const EditSong = (action, newSong) => {
      props.onEditField(action, i, newSong);
    };

    const EditTitle = (action, newSong) =>
      props.onEditField('EDIT_TITLE', i, newSong);

    return (
      <DisplayWord
        className={p.used ? ' used' : ''}
        key={key+ '_display'}
        keyId={key}
        onAction={i < 0 ? EditTitle : EditSong}
        isTitle={i < 0}
        name = {p.word}
      >
        {p.word}
      </DisplayWord>
    );
  }

  function MapEachList(subList) {
    const ret = subList.map((p, i) => StyleEachWord(p, i));
    return ret;
  }

  const StyleTitle = (p) => {
    return StyleEachWord(p, -1);
  };

  return (
    <div className="album" key={props.id+'_container'} ref={refAlbumBox}>
      <div className="album-title"> {StyleTitle(props.title)} </div>
      <div className="album-songs"> {MapEachList(props.listWords)} </div>

      <ListButtons
        albumName = {props.title.word}
        onAction={(action, newSong) =>
          props.onEditField(action, -1, newSong)
        }
      />
    </div>
  );
}

export default DisplayListWords;
