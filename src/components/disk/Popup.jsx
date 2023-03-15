import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input';
import { createDirAction } from '../../actions/file';
const Popup = () => {
  const [dirName, setDirName] = useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  function createHandler() {
    dispatch(createDirAction(currentDir, dirName));
    setDirName('');
    dispatch(setPopupDisplay('none'));
  }
  return (
    <div
      className="popup"
      style={{ display: popupDisplay }}
      onClick={() => dispatch(setPopupDisplay('none'))}
    >
      <div
        className="popup_content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup_header">
          <div className="popup_title">Create new folder</div>
          <button
            className="popup_close"
            onClick={() => dispatch(setPopupDisplay('none'))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Input folder name"
          value={dirName}
          setValue={setDirName}
        ></Input>
        <button className="popup_create" onClick={() => createHandler()}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
