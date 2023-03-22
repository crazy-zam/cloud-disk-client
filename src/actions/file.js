import axios from 'axios';
import { hideLoader, showLoader } from '../reducers/appReducer';
import {
  addFile,
  setFiles,
  deleteFile,
  setPath,
} from '../reducers/fileReducer';
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from '../reducers/uploadReducer';
import { API_URL } from '../config';
import checkError from '../utils/errorCheck';

export function getFilesAction(dirId, sort) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/file`;
      if (dirId && sort) {
        url = url.concat(`?parent=${dirId}&sort=${sort}`);
      } else if (dirId) {
        url = url.concat(`?parent=${dirId}`);
      } else if (sort) {
        url = url.concat(`?sort=${sort}`);
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setFiles(response.data));
    } catch (e) {
      checkError(e, dispatch);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function getPathAction(dirId) {
  return async (dispatch) => {
    try {
      let url = `${API_URL}api/file/path?dirid=${dirId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setPath(response.data[0].path));
    } catch (e) {
      checkError(e, dispatch);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDirAction(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/file`,
        {
          name,
          parent: dirId,
          type: 'dir',
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      dispatch(addFile(response.data));
    } catch (e) {
      checkError(e, dispatch);
    }
  };
}

export function uploadFileAction(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const uploadFile = { name: file.name, progress: 0, id: Date.now() };

      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      const response = await axios.post(`${API_URL}api/file/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.event.lengthComputable
            ? progressEvent.total
            : progressEvent.event.target.getResponseHeader('content-length') ||
              progressEvent.event.target.getResponseHeader(
                'x-decompressed-content-length',
              );

          if (totalLength) {
            uploadFile.progress = Math.round(
              (progressEvent.loaded * 100) / totalLength,
            );
            dispatch(changeUploadFile(uploadFile));
          }
        },
      });
      dispatch(addFile(response.data));
    } catch (e) {
      checkError(e, dispatch);
    }
  };
}

export async function downloadFileAction(file, dispatch) {
  try {
    const response = await fetch(`${API_URL}api/file/download?id=${file._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (e) {
    checkError(e, dispatch);
  }
}

export function deleteFileAction(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/file?id=${file._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(deleteFile(file._id));
    } catch (e) {
      checkError(e, dispatch);
    }
  };
}

export function searchFileAction(search) {
  return async (dispatch) => {
    try {
      console.log(search);
      const response = await axios.get(
        `${API_URL}api/file/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      checkError(e, dispatch);
    } finally {
      dispatch(hideLoader());
    }
  };
}
