import React from 'react';
import { CSSTransition } from 'react-transition-group';
import UploadFile from './UploadFile';
import './uploader.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispath = useDispatch();
  return (
    <CSSTransition
      in={isVisible}
      timeout={1000}
      classNames="uploader"
      mountOnEnter
      unmountOnExit
    >
      <div className="uploader">
        <div className="uploader_header">
          <div className="uploader_title">Loading</div>
          <button
            className="uploader_close"
            onClick={() => dispath(hideUploader())}
          >
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    </CSSTransition>
  );
};

export default Uploader;
