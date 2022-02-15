import React, { useState, useEffect } from "react";
import { Button, Row, Col, div } from "reactstrap";
import { connect } from "react-redux";

function SearchBar({ onSubmitSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState("");

  var handleSubmitSearch = async () => {
    if (searchTerm !== "") {
      onSubmitSearchTerm(searchTerm);
      console.log("---C'EST QUOI SEARCHTERM DANS SEARCHBAR---", searchTerm)
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <input
        style={{
          backgroundColor: "#F8F9F9",
          border: "none",
          marginLeft: 10,
          width: 200,
          height: 30,
          outline: "none",
          fontSize: 12,
        }}
        type="text"
        name="searchterme"
        id="searchterm"
        lighttheme="true"
        placeholder="Rechercher"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="button"
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "#16bfc4",
          backgroundColor: "#F8F9F9",
          border: "none",
          marginLeft:1
        }}
        onClick={() => {
          handleSubmitSearch();
        }}
      >
        Rechercher
      </Button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitSearchTerm: function (searchTerm) {
      dispatch({ type: "searchTermFromSearchBar", searchTerm: searchTerm });
    },
  };
}
export default connect(null, mapDispatchToProps)(SearchBar);
