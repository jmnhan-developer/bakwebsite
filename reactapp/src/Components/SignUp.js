import React, { useState } from "react";
import { Col, Row, Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function SignUp({ onSubmitToken, onSubmitDatas }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
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
    const data = await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&passwordFromFront=${password}&addressFromFront=${address}&postalCodeFromFront=${postalCode}&cityFromFront=${city}`,
    });

    const body = await data.json();

    if (body.result === true) {
      onSubmitToken(body.saveUser.token);
      onSubmitDatas({
        firstName: body.saveUser.firstName,
        lastName: body.saveUser.lastName,
        email: body.saveUser.email,
        password: body.saveUser.password,
        address: body.saveUser.address,
        postalCode: body.saveUser.postalCode,
        city: body.saveUser.city,
      });
      setUserExists(true);
    } else {
      setErrorsSignup(body.error);
    }
  };

  if (userExists) {
    return <Redirect to="/" />;
  }

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <p style={{ fontSize: 12, color: "red" }}>{error}</p>;
  });

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
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
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="prénom"
              id="prénom"
              placeholder="Prénom"
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text"> Nom</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">E-mail</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="e-mail"
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Password</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Adresse</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="adresse"
              id="adresse"
              placeholder="Adresse"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="texte">Code Postal</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              name="zip"
              id="exampleZip"
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="text">Ville</Label>
            <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="ville"
              id="ville"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>{tabErrorsSignup}</Row>
      <Row style={styleRow}>
        <Button
          style={{
            fontSize: 12,
            color: "white",
            backgroundColor: "#16bfc4",
            border: "none",
            marginBottom: 20,
          }}
          onClick={(() => handleSubmitSignup(), clickToClean())}
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
    onSubmitDatas: function (argument) {
      dispatch({ type: "userInfoFromSignUp", user: argument });
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
