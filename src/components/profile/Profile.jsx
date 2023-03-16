import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, uploadAvatar, deleteUser } from '../../actions/user';
import avatarLogo from '../../assets/img/default-avatar.svg';
import { API_URL } from '../../config';
import sizeFormat from '../../utils/sizeFormat';

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
        <img src={avatar} alt="" className="profile-data-avatar" />
        <div className="profile-data-avatar_btns">
          <button onClick={() => dispatch(deleteUser())}>Delete User</button>
          <button onClick={() => dispatch(deleteAvatar())}>
            Delete Avatar
          </button>
          <input
            accept="image/*"
            onChange={(e) => uploadHandler(e)}
            type="file"
            placeholder="Upload avatar"
          />
        </div>
        <div className="profile-data-email">E-mail</div>
        <div className="profile-data-email">{currentUser.email}</div>
        <div className="profile-data-totalSpace">Total space</div>
        <div className="profile-data-totalSpace">
          {sizeFormat(currentUser.diskSpace)}
        </div>
        <div className="profile-data-usedSpace">Used space</div>
        <div className="profile-data-usedSpace">
          {sizeFormat(currentUser.usedSpace)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
