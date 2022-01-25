import React from "react";
import { div, Row } from "reactstrap";
import UpDateProfile from "./UpDateProfile.js";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";

function ProfileScreen(props) {

  return (
    <div style={{ marginLeft: 25, marginTop: 5, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <UpDateProfile />
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ProfileScreen);
