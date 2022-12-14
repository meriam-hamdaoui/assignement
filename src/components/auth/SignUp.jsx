import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../JS/userReducer";
import { countries } from "components/helpers/constants";
import { registerAPI } from "api/CRUD";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // check if all fields are fullfiled
    if (!firstName || !lastName || !phone || !country || !email || !password) {
      return alert("all fields are required");
      // check validation email
    } else if (email.indexOf("@") === -1 || email.lastIndexOf(".") === -1) {
      return alert("enter a valid email");
    } else {
      await registerAPI({
        firstName,
        lastName,
        country,
        phone,
        email,
        password,
      })
        .then((result) => {
          if (result) {
            const { message, newUser } = result.data;
            alert("please check your email to confirm registration");
            dispatch(register({ ...newUser }));
            window.location.reload(true);
          }
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <div className="signup">
      <form>
        <label className="labelSignUp" htmlFor="chk" aria-hidden="true">
          Sign Up
        </label>

        <input
          autoComplete="no-fill"
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          autoComplete="no-fill"
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          autoComplete="no-fill"
          type="phone"
          name="phone"
          placeholder="Phone Number"
          pattern="^\d{8}$"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          style={{
            background: "rgb(236, 230, 230)",
            width: "60%",
            margin: "20px auto",
          }}
          id="country"
          name="country"
          value={country}
          className="form-control"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option key={1}>Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>

        <input
          autoComplete="no-fill"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          autoComplete="no-fill"
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="chkPwdUP" style={{ marginLeft: "6rem" }}>
          <input
            type="checkbox"
            name="showPwd"
            id="chkPwdUP"
            value={true}
            defaultChecked={false}
            onClick={() => setShowPwd((showPwd) => (showPwd ? false : true))}
          />
          &nbsp;Show Password
        </label>
        <button type="button" className="btn_signup" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
