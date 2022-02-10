import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function SignIn({ onSubmitToken, onSubmitDatas, userStatus }) {
  
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignin, setErrorsSignin] = useState([]);


  // FUNCTION TO CLEAN ALL INPUTS

  function clickToClean() {
    setMail("");
    setPassword("");
  }

  var handleSubmitSignin = async () => {
    const data = await fetch(`/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${email}&passwordFromFront=${password}`,
    });

    const body = await data.json();

    if (body.result === true) {

      onSubmitToken(body.user.token);

      console.log("XXXX QU'EST CE QUE BODY.USER.TOKEN DANS SIGNIN XXXX", body.user.token);
      console.log("XXXX QU'EST CE QUE BODY DANS SIGNIN XXXX", body);
  

      onSubmitDatas({
        firstName: body.user.firstName,
        lastName: body.user.lastName,
        email: body.user.email,
        password: body.user.password,
        address: body.user.address,
        postalCode: body.user.postalCode,
        city: body.user.city,
      });
      console.log("----QUE CONTIENT BODY.USER DANS SIGNIN----", body.user);

      setUserExists(true);
    } else {
      setErrorsSignin(body.error);
    }
  };

  if (userExists === true) {
    if (userStatus ==='buyer'){
      return <Redirect to="/paiementscreen" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return <p style={{ fontSize: 12, color: "red" }}>{error}</p>;
  });

  return (
    <div style={{margin:10, marginBottom: 5 }}>
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
            <Input
              style={{ fontSize: 12, padding: 5 }}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="e-mail"
              value={email}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>
        <Col xs="12" md="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="password">Password</Label>
            <Input
              style={{ fontSize: 12, padding: 5 }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              value={password}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>{tabErrorsSignin}</Row>

      <Row style={styleRow}>
        <Button
          style={{
            fontSize: 12,
            color: "white",
            backgroundColor: "#16bfc4",
            border: "none",
            marginBottom: 20,
          }}
          onClick={() => {
            handleSubmitSignin();
            clickToClean();
          }}
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

function mapStateToProps(state) {
  return { userStatus: state.userStatus };
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: "informationFromSignIn", token: token });
    },

    onSubmitDatas: function (argument) {
      dispatch({ type: "userInfoFromSignIn", user: argument });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
