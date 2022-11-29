import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, setUsers } from "../../JS/userReducer";
import { countries } from "components/helpers/constants";
import { registerAPI, REACT_APP_URL } from "api/CRUD";
import axios from "axios";

const SignUp = () => {
  const userList = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();

  const fetchUserAPI = async () => {
    const { data } = await axios.get(`${REACT_APP_URL}/users`);

    console.log(data);
  };

  useEffect(() => {
    fetchUserAPI().catch((error) => console.error("error", error));
    // const fetchData = async () => {
    //   const data = await fetchUserAPI();
    //   const dataJson = await data.json();
    //   console.log("dataJson: " + dataJson);
    //   return dataJson;
    // };
    // const result = fetchData().catch((error) => console.error("error", error));
    // console.log("result: " + result);
  }, []);

  const handleSubmit = async () => {
    // await fetchUserAPI()
    //   .then(async (response) => {
    //     console.log("response", response);
    //     dispatch(setUsers([...response]));
    //     console.log("userList", userList);
    //     // if (findUser) {
    //     //   alert("this email already used");
    //     // } else {
    //     //   if (
    //     //     !firstName ||
    //     //     !lastName ||
    //     //     !phone ||
    //     //     !country ||
    //     //     !email ||
    //     //     !password
    //     //   ) {
    //     //     alert("all fields are required");
    //     //   } else if (email.findIndexOf("@") === -1) {
    //     //     alert("enter a valid email");
    //     //   }
    //     //   if (findUser.password !== password) {
    //     //     alert("password incorrect");
    //     //   } else if (
    //     //     findUser.email !== email &&
    //     //     findUser.password === password
    //     //   ) {
    //     //     const value = {
    //     //       firstName: firstName,
    //     //       lastName: lastName,
    //     //       phone: phone,
    //     //       country: country,
    //     //       email: email,
    //     //       password: password,
    //     //     };
    //     //     await registerAPI(value).then((response) => {
    //     //       if (response) {
    //     //         // dispatch(register(response));
    //     //         console.log("response registerApi: " + response);
    //     //       }
    //     //     });
    //     //   }
    //     // }
    //   })
    //   .catch((error) => console.error("error", error));
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

        <label htmlFor="chkPwd" style={{ marginLeft: "6rem" }}>
          <input
            type="checkbox"
            name="showPwd"
            id="chkPwd"
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
