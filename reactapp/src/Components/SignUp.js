import React, { useState, useEffect, MenuItem } from "react";
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
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

function SignUp({ onSubmitToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [isNotConnect, setIsNotConnect] = useState("");
  const [token, setToken] = useState("");
  const [tokenIsSubmited, setTokenIsSubmited] = useState(false);

  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setFirstName("");
    setLastName("");
    setMail("");
    setPassword("");
    setAddress("");
    setPostalCode("");
    setCity("");
  }

  var handleSubmitSignup = async () => {
    const dataUsers = await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&passwordFromFront=${password}&addressFromFront=${address}&postalCodeFromFront=${postalCode}&cityFromFront=${city}`,
    });

    const dataConsumers = await dataUsers.json();

    setIsConnect(dataConsumers.result);
    setIsNotConnect(dataConsumers.error);
    console.log("token from signUpScreen", dataConsumers.saveUser.token);
    onSubmitToken(dataConsumers.saveUser.token);
  };

  if (isConnect === true) {
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
          M'inscrire
        </p>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Prénom</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setFirstName(e.target.value)}
              type="text" name="prénom" id="prénom" placeholder="Prénom"
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text"> Nom</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setLastName(e.target.value)}
              type="text" name="nom" id="nom" placeholder="Nom"
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">E-mail</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setMail(e.target.value)}
              type="email" name="email" id="email" placeholder="e-mail"
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Password</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setPassword(e.target.value)}
              type="password" name="password" id="examplePassword"
              placeholder="password"
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Adresse</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setAddress(e.target.value)}
              type="text" name="adresse" id="adresse" placeholder="Adresse"
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="texte">Code Postal</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setPostalCode(e.target.value)}
              type="text" name="zip" id="exampleZip"
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Ville</Label>
            <Input style={{ fontSize: 12 }}>
              onChange={(e) => setCity(e.target.value)}
              type="text" name="ville" id="ville"
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
          onClick={() => handleSubmitSignup()}
        >
          M'inscrire
        </Button>
        {/* <p>Ne pas oublier de rajouter clickToClean() dans le onClick</p> */}
        <Link to="/SignIn" style={{ fontSize: 12 }}>
          J'ai déjà un compte
        </Link>
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: "informationFromSignUp", token: token });
    },
  };
}

var styleRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  backgroundColor: "#F8F9F9",
  marginLeft: 10,
  marginRight: 10,
};

export default connect(null, mapDispatchToProps)(SignUp);
