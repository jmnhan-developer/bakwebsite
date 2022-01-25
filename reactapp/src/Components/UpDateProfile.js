import React, { useState, useEffect } from "react";
import { Row, Input } from "reactstrap";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";

function UpDateProfile(props) {
  //RECUPERER LES INFOS DE L'USER VIA LE TOKEN POUR AFFICHER SES INFOS DANS L'ECRAN PROFILEUPDATE
  const [userInfo, setUserInfo] = useState([]);
  console.log("token récupéré from store updateProfile", props.token);
  useEffect(() => {
    const findUser = async () => {
      const rawData = await fetch(
        `/users/display-profile?token=${props.token}`
      ); //l'ID ici est un objet...et non un tableau d'objets.
      const doneData = await rawData.json();
      console.log("done data est:", doneData);
      setUserInfo(doneData);
      setFirstName(doneData.firstName);
      setLastName(doneData.lastName);
      setMail(doneData.email);
      setAddress(doneData.address);
      setPostalCode(doneData.postalCode);
      setCity(doneData.city);
    };
    findUser();
  }, []);

  //POUR RETENIR LES MODIFS ET RÉENREGISTRER LES INFOS DE L'USER DANS LA BASE DE DONNÉES

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
    <div>
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
          ></Input>
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Nom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="lastName"
            value={lastName}
            onChangeText={(val) => setLastName(val)}
          ></Input>
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
          ></Input>
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Adresse:</p>
          <Input
            style={{ fontSize: 12 }}
            name="address"
            value={address}
            onChangeText={(val) => setAddress(val)}
          ></Input>
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
          ></Input>
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Ville:</p>
          <Input
            style={{ fontSize: 12 }}
            name="city"
            value={city}
            onChangeText={(val) => setCity(val)}
          ></Input>
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
	marginBottom:10
};

var styleP = { width: 150, fontSize: 12, margin: 0 };

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(UpDateProfile);
