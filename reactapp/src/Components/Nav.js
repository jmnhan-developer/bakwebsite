import React, { useState } from "react";
import { Button, Row, Col, div } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";

function Navigation({ user, token, onSubmitUserStatus, onSubmitSearchTerm }) {
  console.log("-----LES INFO DU USER DANS LA NAV-----", user);

  const [goToProfile, setGoToProfile] = useState(false);
  const [goToSell, setGoToSell] = useState(false);


  var infoUser = (
    <p
      style={{
        display: "flex",
        justifyContent: "center",
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
      Bonjour {user.firstName} !
    </p>
  );

  let redirectToProfil = null;
  if (goToProfile === true) {
    if (user.firstName) {
      redirectToProfil = <Redirect to="/ProfileScreen" />;
    } else {
      redirectToProfil = <Redirect to="/signin" />;
    }
  }

  let redirectToSellScreen = null;
  if (goToSell === true) {
    if (user.firstName) {
      redirectToSellScreen = <Redirect to="/sellScreen" />;
    } else {
      redirectToSellScreen = <Redirect to="/signup" />;
    }
  }

  var userStatus = "seller";

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
        <Col xs={4} md={1} style={{ paddingLeft: 15 }}>
          <Link to="/" onClick={() => onSubmitSearchTerm("")}>
            <img
              src="./logobak.png"
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Col>
        <Col
          xs={6}
          md={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SearchBar />
        </Col>
        <Col xs={4} md={1}>
          <Button
            type="button"
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#16bfc4",
              border: "none",
            }}
            onClick={() => {
              onSubmitUserStatus(userStatus);
              setGoToSell(true);
            }}
          >
            Vendre
          </Button>
        </Col>
        <Col xs={4} md={2}>
          <Link
            to="/Signup"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: 12,
              borderRadius: "blue",
            }}
          >
            Inscription | Connexion
          </Link>
        </Col>
        <Col xs={4} md={2}>
          {infoUser}
        </Col>
      </Row>
      {redirectToProfil}
      {redirectToSellScreen}
      {/* {redirectToHomescreen} */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.machin,
    token: state.token,
    userStatus: state.userStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitUserStatus: function (userStatus) {
      dispatch({ type: "userisabuyer", userStatus: userStatus });
    },
    onSubmitSearchTerm: function (searchTerm) {
      dispatch({ type: "searchTermFromSearchBar", searchTerm: searchTerm });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
