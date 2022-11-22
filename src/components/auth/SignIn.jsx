import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/userReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const userList = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const find = userList.find((user) => user.email === email);

  const handleSubmit = () => {
    if (find) {
      console.log("find user", find);
      if (find.password === password) {
        dispatch(
          login({
            isAuth: true,
            email,
            password,
          })
        );
        navigate("/admin", { replace: true });
      }
      if (find.password !== password) {
        alert("password is incorrect");
      }
    } else {
      alert("this user doesn't exist, proceed to signup");
    }
  };

  return (
    <div className="login">
      <form>
        <label className="labelSignIn" aria-hidden="true" htmlFor="chk">
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
          type={showPwd ? "text" : "password"}
          name="pswd"
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

        <button type="button" className="btn_auth" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p style={{ color: "white", margin: "20%" }}>
        not a user? <label htmlFor="chk">create account</label>
      </p>
    </div>
  );
};

export default SignIn;
