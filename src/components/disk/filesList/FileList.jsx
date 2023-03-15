import React from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './fileList.css';
import File from './file/File';

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);

  if (files.length === 0) {
    return <div className="loader">Files not found</div>;
  }
  if (fileView === 'list') {
    return (
      <div className="fileList">
        <div className="fileList_header">
          <div className="fileList_name">Name</div>
          <div className="fileList_date">Date</div>
          <div className="fileList_size">Size</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={'file'}
              // exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
  if (fileView === 'plate') {
    return (
      <div className="filePlate">
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }
};

export default FileList;
