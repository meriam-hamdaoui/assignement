import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { CgPassword } from "react-icons/cg";
import { changePasswordAPI } from "../api/CRUD";
import { isAuth } from "components/helpers/authantication";

const Password = ({ password }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newPassword, setNewPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const { user, token } = isAuth("user", "token");
  console.log("token", token);
  console.log("user", user);

  const handelSave = async () => {
    await changePasswordAPI(id, newPassword, token)
      .then((response) => alert(response.data.message))
      .catch((error) => console.error(error.response.data.message));
  };

  return (
    <>
      <Button
        style={{ background: "none", border: "none" }}
        onClick={handleShow}
      >
        <CgPassword
          style={{
            color: "#0e537d",
            width: "20px",
            height: "20px",
          }}
        />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
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
              </Col>
            </Row>
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
