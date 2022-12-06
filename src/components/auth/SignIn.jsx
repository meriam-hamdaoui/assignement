import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setUsers } from "../../JS/userReducer";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/CRUD";
import { setUserAuth } from "components/helpers/authantication";
import Password from "views/Password";

const SignIn = () => {
  const userList = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      return alert("all fields are required");
    } else if (email.indexOf("@") === -1) {
      return alert("enter a valid email");
    } else {
      await loginAPI({ email, password })
        .then((response) => {
          if (response) {
            const { message, token, user } = response.data;
            setUserAuth("token", token);
            setUserAuth("user", user);
            dispatch(login({ email: email, password: password }));
            navigate(`/profile/${user.id}`, { replace: true });
          }
        })
        .catch((error) => alert("error", error.response.data.message));
    }
  };

  return (
    <div className="login">
      <form>
        <label className="labelSignIn" aria-hidden="true" htmlFor="chk">
          Login
        </label>
        {error && (
          <small style={{ color: "red", marginLeft: "30%" }}>{error} </small>
        )}
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="chkPwd" style={{ marginLeft: "6rem", color: "white" }}>
          <input
            type="checkbox"
            name="showPwd"
            id="chkPwd"
            onClick={() => setShowPwd((showPwd) => (showPwd ? false : true))}
          />
          &nbsp;Show Password
        </label>
        <div>
          <Password />
        </div>
        <button type="button" className="btn_auth" onClick={handleSubmit}>
          Login
        </button>
      </form>

      <p style={{ color: "white", marginTop: "7%", marginLeft: "18%" }}>
        You don't have an account? <label htmlFor="chk">create account</label>
      </p>
    </div>
  );
};

export default SignIn;
