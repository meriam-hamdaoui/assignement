import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { CgPassword } from "react-icons/cg";
import { changePasswordAPI, passwordForgoten } from "../api/CRUD";
import { isAuth } from "components/helpers/authantication";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteStorage } from "../components/helpers/authantication";

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

  const [newPassword, setNewPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const currentLocation = useLocation().pathname;

  const { user, token } = isAuth("user", "token");

  const navigate = useNavigate();

  const handelSave = async () => {
    if (currentLocation !== "/login" && token) {
      await changePasswordAPI(user.id, newPassword, token);

      // .then((response) => {
      //   // alert(response.data.message);
      //   // deleteStorage("user", "token");
      //   // navigate("/login", { replace: true });
      // });
      // .catch((error) => console.error(error.response.data.message));
    }
    if (currentLocation === "/login") {
      await passwordForgoten(newPassword).then((response) => {
        alert(response.data.message);
      });
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
              ? "Change Password"
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
                    name="password"
                    placeholder="Email"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Row>
              )}

              <Row>
                <input
                  autoComplete="no-fill"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
