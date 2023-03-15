import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploadFile } from '../../../reducers/uploadReducer';
import './uploader.css';

const UploadFile = ({ file }) => {
  const dispath = useDispatch();
  return (
    <div className="upload-file">
      <div className="upload-file_header">
        <div className="upload-file_title">{file.name}</div>
        <button
          className="upload-file_close"
          onClick={() => dispath(removeUploadFile(file.id))}
        >
          X
        </button>
      </div>
      <div className="upload-file_progress-bar">
        <div
          className="upload-file_upload-bar"
          style={{ width: file.progress + '%' }}
        ></div>
        <div className="upload-file_percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
