import React, { useState } from "react";
import { Row, Input } from "reactstrap";
import { Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";



function ProfileUpdate(props) {

  console.log("EST CE QU'ON A BIEN LE TOKEN SUR PROFILEUPDATE", props.token)

  const [userInfo, setUserInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  var handleClick = async () => {
    const dataUsers = await fetch(
      `/users/update-profile?token=${props.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `firstName=${firstName}&lastName=${lastName}&email=${email}&address=${address}&postalCode=${postalCode}&city=${city}`,
      }
    );
  };

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
          Modifier mon profile
        </p>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Prénom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="firstName"
            value={firstName}
            onChangeText={(val) => setFirstName(val)}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Nom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="lastName"
            value={lastName}
            onChangeText={(val) => setLastName(val)}
          />
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>E-mail:</p>
          <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder={email}
            />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Adresse:</p>
          <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="adresse"
              id="adresse"
              placeholder={address}
            />
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Code Postal:</p>
          <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              name="zip"
              id="exampleZip"
              placeholder={postalCode}
            />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Ville:</p>
          <Input
              style={{ fontSize: 12 }}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="ville"
              id="ville"
              placeholder={city}
            />
        </Col>
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
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ProfileUpdate);
