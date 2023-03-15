import './authorization.css';
import Input from '../../utils/input/Input';
import { useState } from 'react';
import { registration } from '../../actions/user';
const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        onClick={() => {
          registration(email, password);
        }}
      >
        Registration
      </button>
    </div>
  );
};

export default Registration;
