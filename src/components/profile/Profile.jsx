import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, uploadAvatar, deleteUser } from '../../actions/user';
import avatarLogo from '../../assets/img/default-avatar.svg';
import { API_URL } from '../../config';
import sizeFormat from '../../utils/sizeFormat';
import './profile.css';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  function uploadHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  return (
    <div>
      <div className="profile-data">
        <img src={avatar} alt="" className="profile-data_avatar" />

        <div className="profile-data_email">E-mail</div>
        <div className="profile-data_email">{currentUser.email}</div>

        <div className="profile-data_total">Total space</div>
        <div className="profile-data_total">
          {sizeFormat(currentUser.diskSpace)}
        </div>

        <div className="profile-data_used">Used space</div>
        <div className="profile-data_used">
          {sizeFormat(currentUser.usedSpace)}
        </div>

        <button
          className="profile-data_avatar_delete"
          onClick={() => dispatch(deleteAvatar())}
        >
          Delete Avatar
        </button>
        <div className="profile-data_avatar_upload">
          <label
            htmlFor="avatar_upload-input"
            className="profile-data_avatar_upload-label"
          >
            Upload avatar
          </label>
          <input
            accept="image/*"
            onChange={(e) => uploadHandler(e)}
            type="file"
            id="avatar_upload-input"
            className="profile-data_avatar_upload-input"
          />
        </div>

        <button
          className="profile-data_delete"
          onClick={() => dispatch(deleteUser())}
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default Profile;
