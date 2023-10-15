import { updateMyInformation } from "helpers/QueryMaker";
import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "redux/slices/userSlice";
import { useToasts } from 'react-toast-notifications';

function User() {
  const currentUser = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState(currentUser.user)
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const updateUserInfo = (e) => {
    e.preventDefault()
    updateMyInformation((data) => {
      dispatch(updateUserData(data.data))
      addToast("User information updated successfully", { appearance: 'success' });
    }, userInfo, currentUser.token)
  }
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
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Email (disabled)</label>
                        <Form.Control
                          defaultValue={userInfo?.email}
                          disabled
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue={userInfo.first_name}
                          placeholder="FirstName"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, first_name: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Last Name
                        </label>
                        <Form.Control
                          defaultValue={userInfo.last_name}
                          placeholder="Last Name"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, last_name: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Card Type</label>
                        <Form.Control
                          defaultValue={userInfo.card_type}
                          placeholder=""
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, card_type: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Card Number</label>
                        <Form.Control
                          defaultValue={userInfo.card_number}
                          placeholder="Card Number"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, card_number: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Billing Address</label>
                        <Form.Control
                          defaultValue={userInfo.billing_address}
                          placeholder="Home Address"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, billing_address: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Billing City</label>
                        <Form.Control
                          defaultValue={userInfo.billing_city}
                          placeholder="City"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, billing_city: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Billing Country</label>
                        <Form.Control
                          defaultValue={userInfo.billing_country}
                          placeholder="Country"
                          type="text"
                          onChange={(e) => { setUserInfo({ ...userInfo, billing_country: e.target.value }) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={updateUserInfo}
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
                      src={"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"}
                    ></img>
                    <h5 className="title">{userInfo.first_name} {userInfo.last_name}</h5>
                  </a>
                  <p className="description">{userInfo.billing_address}, {userInfo.billing_city}, {userInfo.billing_country}</p>
                </div>

              </Card.Body>
              <hr></hr>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
