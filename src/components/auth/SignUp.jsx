import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../JS/userReducer";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(
      register({
        username,
        email,
        password,
      })
    );
  };

  return (
    <div className="signup">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input
          type="text"
          name="username"
          placeholder="User name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn_auth" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
