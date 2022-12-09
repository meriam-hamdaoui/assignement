import React, { useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { CgPassword } from "react-icons/cg";
import { changePasswordAPI, passwordForgotenAPI } from "../api/CRUD";
import { isAuth } from "components/helpers/authantication";
import { useLocation } from "react-router-dom";

const styleUpdate = { background: "none", border: "none" };

const styleForget = {
  marginLeft: "15rem",
  marginTop: "1rem",
  color: "white",
  ...styleUpdate,
};

const Password = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const currentLocation = useLocation().pathname;

  const { user, token } = isAuth("user", "token");

  const handelSave = async () => {
    if (currentLocation === "/login") {
      await passwordForgotenAPI({
        email: email,
        password: password,
      });
    } else {
      await changePasswordAPI(user.id, password, token);
    }
  };

  return (
    <>
      <Button
        style={currentLocation === "/login" ? styleForget : styleUpdate}
        onClick={handleShow}
      >
        {currentLocation === "/login" ? (
          "forget password?"
        ) : (
          <CgPassword
            style={{
              color: "#0e537d",
              width: "20px",
              height: "20px",
            }}
          />
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentLocation === "/login"
              ? "Forget Password"
              : "Update Password"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <>
              {currentLocation === "/login" && (
                <Row>
                  <input
                    autoComplete="no-fill"
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Row>
              )}

              <Row>
                <input
                  autoComplete="no-fill"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
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
                    onClick={() =>
                      setShowPwd((showPwd) => (showPwd ? false : true))
                    }
                  />
                  &nbsp;Show Password
                </label>
              </Row>
            </>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Password;
