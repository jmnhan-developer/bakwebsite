import React, { useState, useEffect } from "react";
import { div, Row, Input, Button } from "reactstrap";
import { Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";

function Profile(props) {

  console.log("EST CE QU'ON A BIEN PROPS.USER.TOKEN SUR PROFILE", props.user)

  const[goToProfileUpdate, setGoToProfileUpdate] = useState(false)

  if (goToProfileUpdate == true) {
    return <Redirect to="/ProfileUpdateScreen" />
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
          Mon profile
        </p>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Prénom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="firstName"
            value={props.user.firstName}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Nom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="lastName"
            value={props.user.lastName}
          />
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>E-mail:</p>
          <Input
            style={{ fontSize: 12 }}
            name="email"
            value={props.user.email}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Adresse:</p>
          <Input
            style={{ fontSize: 12 }}
            name="address"
            value={props.user.address}
          />
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Code Postal:</p>
          <Input
            style={{ fontSize: 12 }}
            name="postalCode"
            value={props.user.postalCode}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Ville:</p>
          <Input
            style={{ fontSize: 12 }}
            name="city"
            value={props.user.city}
          />
        </Col>
      </Row>
      <Row style={styleRow}>
          <Button
          style={{fontSize: 12 }}
          onClick={() =>{setGoToProfileUpdate(true)} }>Modifier mon profile</Button>
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

var styleCol = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: 10,
};
var styleP = { width: 150, fontSize: 12, margin: 0 };



function mapStateToProps(state) {
  return { user: state.machin };
}

export default connect(mapStateToProps, null)(Profile);