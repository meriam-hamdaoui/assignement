import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI, REACT_APP_URL } from "../../api/CRUD";

const SignIn = () => {
  const userList = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserAPI = async () => {
    const { data } = await axios.get(`${REACT_APP_URL}/users`);
    dispatch(setUsers([...data]));
  };

  // console.log("userList", userList);

  useEffect(() => {
    fetchUserAPI().catch((error) => console.error("error", error));
  }, []);

  const handleSubmit = async () => {
    const userExist = userList.find((user) => user.email === email);

    if (!email || !password) {
      alert("all fields are required");
      return;
    } else if (email.indexOf("@") === -1) {
      alert("enter a valid email");
      return;
    }
    if (
      userExist &&
      (userExist.email !== email || userExist.password !== password)
    ) {
      alert("there is no such user with those cridentials");
      return;
    }

    // await axios
    //   .post(
    //     "http://localhost:5000/users",
    //     { email, password }
    //     // { headers: { "Access-Control-Allow-Origin": "*" } }
    //   )
    //   .then((response) => {
    //     // console.log("response", response);
    //     if (response) {
    //       const { user, token } = response.data;
    //       localStorage.setItem(
    //         "loggedIn",
    //         JSON.stringify({
    //           user: user,
    //           token: token,
    //         })
    //       );
    //       dispatch(login({ email, password }));
    //       setError("");
    //       navigate("/profile", { replace: true });
    //       setEmail("");
    //       setPassword("");
    //     }
    //   })
    //   .catch((error) => {
    //     if (error) {
    //       setError(error.response.data.message);
    //     }
    //   });
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

        <button type="button" className="btn_auth" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p style={{ color: "white", marginTop: "10%", marginLeft: "27%" }}>
        not a user? <label htmlFor="chk">create account</label>
      </p>
    </div>
  );
};

export default SignIn;
