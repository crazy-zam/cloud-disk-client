import { NavLink } from 'react-router-dom';
import './navbar.css';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { hideUploader } from '../../reducers/uploadReducer';

import Logo from '../../assets/img/navbar-logo.svg';
import avatarLogo from '../../assets/img/default-avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/">
          <img src={Logo} alt="" className="navbar_logo" />
        </NavLink>

        <div className="navbar_header">DISK CLOUD</div>

        {!isAuth && (
          <div className="navbar_login">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar_registration">
            <NavLink to="/registration">Registration</NavLink>
          </div>
        )}

        {isAuth && (
          <div
            className="navbar_login"
            onClick={() => {
              dispatch(logout());
              dispatch(hideUploader());
            }}
          >
            Logout
          </div>
        )}

        {isAuth && (
          <NavLink to="/profile">
            <img className="navbar_avatar" src={avatar} />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
