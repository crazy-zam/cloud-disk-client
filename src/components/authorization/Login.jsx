import './authorization.css';
import Input from '../../utils/input/Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="authorization">
      <div className="authorization_header">Login</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Enter email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password"
      />
      <button
        className="authorization_btn"
        onClick={() => dispatch(login(email, password))}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
