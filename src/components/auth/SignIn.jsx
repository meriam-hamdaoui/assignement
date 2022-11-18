import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../JS/userReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    dispatch(
      login({
        email,
        password,
      })
    );
    navigate("/admin", { replace: true });
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
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
          name="pswd"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn_auth" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
