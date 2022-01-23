import React, { useState, useEffect } from "react";
// import {FontAwesomeIcon} from '@fontawesome/react-fontawesome'
// import {search} from '@fontawesome/free-solid-svg-icons'
// import { FontAwesome } from '@expo/vector-icons';

function SearchBar() {
  const [productList, setProductList] = useState([]);
  const [filterAddList, setFilterAddList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      const results = productList.filter((products) =>
        products.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterAddList(results);
    } else {
      setFilterAddList(productList);
    }
  }, [searchTerm]);

  return (
    <input
      style={{
        backgroundColor: "#F8F9F9",
        border: "none",
        marginLeft: 10,
        width: 400,
        height: 30,
        outline: "none",
        fontSize: 12,
      }}
      leftIcon={{
        type: "font-awesome",
        name: "search",
        color: "grey",
        size: 20,
      }}
      lightTheme="true"
      placeholder="Rechercher"
      onChangeText={(val) => setSearchTerm(val)}
    />
  );
}

export default SearchBar;
