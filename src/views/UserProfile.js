import React, { useState, useEffect } from "react";
import { isAuth, setUserAuth } from "components/helpers/authantication";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { updateProfileAPI, getUserAPI } from "../api/CRUD";
import { setUser } from "JS/userReducer";
import Password from "./Password";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    change password
  </Tooltip>
);

const User = () => {
  const profile = useSelector((state) => state.user);

  const { user, token } = isAuth("user", "token");
  const { id } = user;
  const { firstName, lastName, phone, country, email, password } = user;

  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPhone, setNewPhone] = useState(phone);
  const [newCountry, setNewCountry] = useState(country);

  const dispacth = useDispatch();

  const userEdited = {
    id: id,
    email: email,
    password: password,
    firstName: newFirstName,
    lastName: newLastName,
    phone: newPhone,
    country: newCountry,
  };

  const getProfile = async (id, token) => {
    const response = await getUserAPI(id, token);
    dispacth(setUser({ id, ...response.user }));
  };

  const handleUpdate = async () => {
    await updateProfileAPI(id, userEdited, token)
      .then(() => {
        setUserAuth("user", userEdited);
        alert("updated with success");
        getProfile(userEdited.id, token);
      })
      .catch((error) => console.error("error", error.response.data.message));
  };

  useEffect(() => {
    getProfile(id, token);
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pl-1" md="7">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          defaultValue={email}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="phone">Phone</label>
                        <Form.Control
                          placeholder="Phone"
                          type="phone"
                          defaultValue={phone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="first Name"
                          type="text"
                          defaultValue={firstName}
                          onChange={(e) => setNewFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          defaultValue={lastName}
                          onChange={(e) => setNewLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          placeholder="Country"
                          type="text"
                          defaultValue={country}
                          onChange={(e) => setNewCountry(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="8">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="button"
                    variant="info"
                    onClick={() => token && handleUpdate()}
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/default-avatar.png")}
                    ></img>
                    <h5 className="title">{firstName + " " + lastName}</h5>
                  </a>
                  <p className="description">{firstName + "123"}</p>
                </div>
                <p className="description ">
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. <br /> Vestibulum tortor
                  quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                  <br /> Donec eu libero sit amet quam egestas semper. <br />
                  Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                </p>
              </Card.Body>
              <hr></hr>
              <div className="d-flex justify-content-between">
                <div className="button-container mr-auto ml-auto">
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <div className="button-container mr-auto ml-auto">
                    <Password password={password} />
                  </div>
                </OverlayTrigger>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default User;
