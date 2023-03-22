import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilesAction,
  uploadFileAction,
  searchFileAction,
  getPathAction,
} from '../../actions/file';
import FileList from './filesList/FileList';
import './disk.css';
import { showLoader } from '../../reducers/appReducer';

import Popup from './Popup';
import {
  setCurrentDir,
  setFileView,
  setPath,
  setPopupDisplay,
} from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const path = useSelector((state) => state.files.path);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  window.onpopstate = function (event) {
    if (currentDir && event.state.type === 'dir') {
      backClickHandler();
    }
  };

  useEffect(() => {
    dispatch(getFilesAction(currentDir, sort));
    if (!!currentDir) {
      dispatch(getPathAction(currentDir));
    } else {
      dispatch(setPath(''));
    }
  }, [currentDir, sort]);

  useEffect(() => {
    window.history.replaceState({ ...window.history.state, type: 'dir' }, '');
    window.history.pushState({ ...window.history.state }, '');
    window.history.forward();
  }, [currentDir]);

  function searchHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout != false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFileAction(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFilesAction(currentDir));
    }
  }

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }
  function backClickHandler() {
    const backDir = dirStack.pop();
    dispatch(setCurrentDir(backDir));
  }
  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFileAction(file, currentDir)));
  }
  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }
  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }
  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFileAction(file, currentDir)));
    setDragEnter(false);
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk_btns">
        <button className="disk_btn" onClick={() => backClickHandler()}>
          Back
        </button>
        <button className="disk_btn" onClick={() => showPopupHandler()}>
          Create folder
        </button>
        <div className="disk_upload">
          <label
            htmlFor="disk_upload-input"
            className="disk_btn disk_upload-label"
          >
            Upload file
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk_upload-input"
            className="disk_upload-input"
          />
        </div>

        <input
          value={searchName}
          onChange={(e) => searchHandler(e)}
          className="disk_search"
          type="text"
          placeholder="Enter file name..."
        ></input>
        <div className="disk_select_wrap">
          {`Sort by: `}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="disk_selector"
          >
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="date">Date</option>
            <option value="size">Size</option>
          </select>
        </div>
        <button
          className="disk_plate"
          onClick={() => dispatch(setFileView('plate'))}
        ></button>
        <button
          className="disk_list"
          onClick={() => dispatch(setFileView('list'))}
        ></button>
      </div>

      <div className="disk_path">Path: root\{path}</div>

      {loader ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <FileList />
      )}

      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      onDrop={dropHandler}
    >
      Drag and drop files here
    </div>
  );
};

export default Disk;
