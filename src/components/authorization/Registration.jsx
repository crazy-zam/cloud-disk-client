import './authorization.css';
import Input from '../../utils/input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../actions/user';
const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="authorization">
      <div className="authorization_header">Registration</div>
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
        onClick={async () => {
          await registration(email, password);
          navigate('/login');
        }}
      >
        Registration
      </button>
    </div>
  );
};

export default Registration;
