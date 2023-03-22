import { logout } from '../reducers/userReducer';

export default (error, dispatch) => {
  if (
    error.response.data.message === 'Auth error: TokenExpiredError: jwt expired'
  ) {
    dispatch(logout());
    alert('Auth error: session expired, please login');
  }
  console.log(error.response?.data?.message);
};
