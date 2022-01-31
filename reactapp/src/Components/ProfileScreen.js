import React, { useState, useEffect } from "react";
import { div, Row, Input, Button } from "reactstrap";
import { Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";

function Profile(props) {

  console.log("EST CE QU'ON A BIEN LE TOKEN SUR PROFILE", props.token)

  // RECUPERER LES INFOS DE L'USER VIA LE TOKEN POUR AFFICHER SES INFOS DANS L'ECRAN PROFILEUPDATE
  const [userInfo, setUserInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const[goToProfileUpdate, setGoToProfileUpdate] = useState(false)

  useEffect(() => {
    const findUser = async () => {
      const data = await fetch(`/users/display-profile?token=${props.token}`);
      const body = await data.json();

      if (body) {
        setUserInfo(body);
        setFirstName(body.firstName);
        setLastName(body.lastName);
        setMail(body.email);
        setAddress(body.address);
        setPostalCode(body.postalCode);
        setCity(body.city);
      }
    }
    findUser()
  },[]);

  if (goToProfileUpdate == true) {
    return <Redirect to="/ProfileUpdateScreen" />
  }

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
          Mon profile
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
            name="email"
            value={email}
            onChangeText={(val) => setMail(val)}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Adresse:</p>
          <Input
            style={{ fontSize: 12 }}
            name="address"
            value={address}
            onChangeText={(val) => setAddress(val)}
          />
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Code Postal:</p>
          <Input
            style={{ fontSize: 12 }}
            name="postalCode"
            value={postalCode}
            onChangeText={(val) => setPostalCode(val)}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Ville:</p>
          <Input
            style={{ fontSize: 12 }}
            name="city"
            value={city}
            onChangeText={(val) => setCity(val)}
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
  return { token: state.token }
}

export default connect(mapStateToProps, null)(Profile);