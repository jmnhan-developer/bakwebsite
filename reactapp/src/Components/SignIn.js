import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  div,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function SignIn({ onSubmitToken }) {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [isNotConnect, setIsNotConnect] = useState("");
  const [tokenIsSubmited, setTokenIsSubmited] = useState(false);

  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setMail("");
    setPassword("");
  }

  var handleSubmitSignin = async () => {
    console.log("HELLO WORLD");

    const dataUsers = await fetch(`/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${email}&passwordFromFront=${password}`,
    });

    const dataConsumers = await dataUsers.json();

    console.log(dataConsumers.token);
    setIsConnect(dataConsumers.result);
    console.log(setIsConnect);
    setIsNotConnect(dataConsumers.error);
    onSubmitToken(dataConsumers.token);
  };
  if (isConnect === true) {
    console.log("HELLO WORLD", isConnect);
    return <Redirect to="/" />;
  }

  return (
    <div style={{ marginLeft: 25, marginTop: 5, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row style={styleRow}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Me connecter
        </p>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="email">E-mail</Label>
            <Input style={{ fontSize: 12, padding: 5 }}>
              onChange={(e) => setMail(e.target.value)}
              type="email" name="email" id="email" placeholder="e-mail"
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="password">Password</Label>
            <Input style={{ fontSize: 12, padding: 5 }}>
              onChange={(e) => setPassword(e.target.value)}
              type="password" name="password" id="examplePassword"
              placeholder="password"
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Button
          style={{
            fontSize: 12,
            color: "white",
            backgroundColor: "#16bfc4",
            border: "none",
            marginBottom: 20
          }}
          onClick={() => handleSubmitSignin()}
        >
          Me connecter
        </Button>
      </Row>
    </div>
  );
}

var styleRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  backgroundColor: "#F8F9F9",
  marginLeft: 10,
  marginRight: 10,
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: "informationFromSignIn", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
