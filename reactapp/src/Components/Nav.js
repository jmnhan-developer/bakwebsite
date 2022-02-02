import React, { useState } from "react";
import { Button, Row, Col, div } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import { propTypes } from "react-bootstrap/esm/Image";

function Navigation(props) {

  console.log("-----LES INFO DU USER DANS LA NAV-----", props.user );

  const [goToProfile, setGoToProfile] = useState(false);

  var infoUser = "";

  if (props.user.firstName) {
    infoUser = (
      <p
        style={{
          display: "flex",
          alignContent: "center",
          margin: 0,
          padding: 0,
          fontSize: 12,
          color: "#16bfc4",
          borderRadius: "blue",
          cursor: "pointer",
        }}
        onClick={() => {
          setGoToProfile(true);
        }}
      >
        Bonjour {props.user.firstName} !
      </p>
    );
  }

  
  if (goToProfile === true) {
    if (props.user.firstName) {
      return <Redirect to="/ProfileScreen" />;
    } else {
      return <Redirect to="/signup" />;
    }
  }

  
  return (
    <div>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 2,
        }}
      >
        <Col xs={4} md={2} style={{ paddingLeft: 15 }}>
          <Link to="/">
            <img
              src="./logobak.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Col>
        <Col xs={6} md={5} style={{ display: "flex" }}>
          <SearchBar />
        </Col>
        <Col xs={4} md={1}>
          <Link to="/SellScreen">
            <Button
              type="button"
              style={{
                fontSize: 12,
                fontWeight:"bold",
                color: "#16bfc4",
                backgroundColor: "white",
                borderColor:"#16bfc4"
              }}
            >
              Vendre
            </Button>
          </Link>
        </Col>
        <Col xs={4} md={2}>
          <Link to="/SignUp" style={{ fontSize: 12, borderRadius: "blue" }}>
            Inscription | Connexion
          </Link>
        </Col>
        <Col xs={4} md={2}>
          {infoUser}
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.machin };
}
export default connect(mapStateToProps, null)(Navigation);