import React from "react";
import { Button, Row, Col, div } from "reactstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navigation() {
  return (
    <div >
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
        <Col xs={6} md={4} style={{ display: "flex" }}>
          <SearchBar />
        </Col>
        <Col
          xs={4}
          md={2}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Link to="/SellScreen">
            <Button
              type="button"
              style={{
                fontSize: 12,
                color: "white",
                backgroundColor: "#16bfc4",
                border: "none",
              }}
            >
              Vendre un article
            </Button>
          </Link>
        </Col>
        <Col
          xs={4}
          md={2}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Link to="/SignUp" style={{ fontSize: 12, borderRadius: "blue" }}>
            M'inscrire | Me connecter
          </Link>
        </Col>
        <Col
          xs={4}
          md={2}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Link
            to="/ProfileScreen"
            style={{ fontSize: 12, borderRadius: "blue" }}
          >
            Mon Profile
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Navigation;
