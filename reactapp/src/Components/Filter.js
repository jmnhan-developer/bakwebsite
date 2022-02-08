import React, { useState } from "react";
import { Input, Button, Row } from "reactstrap";
import "../App.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Filter(props) {

  
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  const [category4, setCategory4] = useState(false);
  const [category5, setCategory5] = useState(false);
  const [category6, setCategory6] = useState(false);

  // const [colorButton1, setColorButton1] = useState(false);
  // const [colorButton2, setColorButton2] = useState(false);
  // const [colorButton3, setColorButton3] = useState(false);
  // const [colorButton4, setColorButton4] = useState(false);
  // const [colorButton5, setColorButton5] = useState(false);
  // const [colorButton6, setColorButton6] = useState(false);

  const [subCategory, setSubCategory] = useState("");

  const [goToResultScreen, setGoToResultScreen] = useState(false);

  var subCategory1 = [
    { subcategory: "Sélectionner une sous catégorie de Se déplacer"},
    { subcategory: "Sièges Auto" },
    { subcategory: "Nacelles" },
    { subcategory: "Poussettes" },
    { subcategory: "Landeaux" },
    { subcategory: "Portes-Bébé" },
    { subcategory: "Sacs à Langer" },
    { subcategory: "Se déplacer / Autre" },
  ];

  var subCategory2 = [
    { subcategory: "Sélectionner une sous catégorie de S'habiller" },
    { subcategory: "de 0 à 3 mois" },
    { subcategory: "de 4 à 6 mois" },
    { subcategory: "de 7 à 12 mois" },
    { subcategory: "de 13 à 18 mois" },
    { subcategory: "de 19 à 24 mois" },
    { subcategory: "de 2 à 3 ans" },
    { subcategory: "Autres" },
  ];

  var subCategory3 = [
    { subcategory: "Sélectionner une sous catégorie de Se baigner" },
    { subcategory: "Baignoires" },
    { subcategory: "Transats de bain" },
    { subcategory: "Lingettes-Serviettes" },
    { subcategory: "Thermometres" },
    { subcategory: "Jouets de bain" },
    { subcategory: "Se baigner / Autre" },
  ];

  var subCategory4 = [
    { subcategory: "Sélectionner une sous catégorie de Dormir" },
    { subcategory: "Lits bébé" },
    { subcategory: "Lits de voyage" },
    { subcategory: "Linges de lit" },
    { subcategory: "Gigoteuses" },
    { subcategory: "Veilleuses" },
    { subcategory: "Babyphones" },
    { subcategory: "Dormir / Autre" },
  ];

  var subCategory5 = [
    { subcategory: "Sélectionner une sous catégorie de Manger" },
    { subcategory: "Biberons" },
    { subcategory: "Chauffe-Biberons" },
    { subcategory: "Stérilisateurs" },
    { subcategory: "Robots de Cuisine" },
    { subcategory: "Vaiselles" },
    { subcategory: "Accessoires" },
    { subcategory: "Manger / Autre" },
  ];

  var subCategory6 = [
    { subcategory: "Sélectionner" },
    { subcategory: "Autre sous-catégorie" },
  ];

  if (category1 === true) {
    setDisplaySubCategory(subCategory1);
    setCategory1(false);
  } else if (category2 === true) {
    setDisplaySubCategory(subCategory2);
    setCategory2(false);
  } else if (category3 === true) {
    setDisplaySubCategory(subCategory3);
    setCategory3(false);
  } else if (category4 === true) {
    setDisplaySubCategory(subCategory4);
    setCategory4(false);
  } else if (category5 === true) {
    setDisplaySubCategory(subCategory5);
    setCategory5(false);
  } else if (category6 === true) {
    setDisplaySubCategory(subCategory6);
    setCategory6(false);
  }

  let InputSubCat = "";
  let optionSubCat = "";
  let buttonValidation = "";

  if (DisplaySubCategory != "") {
    optionSubCat = DisplaySubCategory.map((e, i) => {
      return <option> {e.subcategory}</option>;
    });

    InputSubCat = (
      <Input
        style={{ width: 320, fontSize: 12, marginLeft:10, marginBottom:10, height: 30 }}
        type="select"
        name="select"
        onChange={(e) => {
          setSubCategory(e.target.value);
        }}
        className="inputSell"
      >
        {optionSubCat}
      </Input>
    );

    buttonValidation = (
      <div className="buttonSearch">
        <Button
          style={{ fontSize: 12, width: 100, marginLeft: 10, height: 30 }}
          className="buttonFilter"
          title="Rechercher"
          onClick={() => {
            props.onSubmitCatSelected(subCategory);
            setGoToResultScreen(true);
          }}
        >
          Rechercher
        </Button>
      </div>
    );
  }
  if (goToResultScreen == true) {
    return <Redirect to="/ResultScreen" />;
  }



  return (
    <div>
      <Row
        style={{
          Display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        <Button
          style={styleButton}
          className="buttonFilter"
          onClick={() => {
            setCategory1(true);
            // setColorButton1(!colorButton1);
            // setColorButton2(false);
            // setColorButton3(false);
            // setColorButton4(false);
            // setColorButton5(false);
            // setColorButton6(false);
          }}
        >
          Se déplacer
        </Button>

        <Button
          style={styleButton}
          title="S'habiller"
          className="buttonFilter"
          onClick={() => {
            setCategory2(true);
            // setColorButton1(false);
            // setColorButton2(!colorButton2);
            // setColorButton3(false);
            // setColorButton4(false);
            // setColorButton5(false);
            // setColorButton6(false);
          }}
        >
          S'habiller
        </Button>

        <Button
          style={styleButton}
          title="Se baigner"
          className="buttonFilter"
          onClick={() => {
            setCategory3(true);
            // setColorButton1(false);
            // setColorButton2(false);
            // setColorButton3(!colorButton3);
            // setColorButton4(false);
            // setColorButton5(false);
            // setColorButton6(false);
          }}
        >
          Se baigner
        </Button>

        <Button
          style={styleButton}
          className="buttonFilter"
          onClick={() => {
            setCategory4(true);
            // setColorButton1(false);
            // setColorButton2(false);
            // setColorButton3(false);
            // setColorButton4(!colorButton4);
            // setColorButton5(false);
            // setColorButton6(false);
          }}
        >
          Dormir
        </Button>

        <Button
          style={styleButton}
          className="buttonFilter"
          onClick={() => {
            setCategory5(true);
            // setColorButton1(false);
            // setColorButton2(false);
            // setColorButton3(false);
            // setColorButton4(false);
            // setColorButton5(!colorButton5);
            // setColorButton6(false);
          }}
        >
          Manger
        </Button>

        <Button
          style={styleButton}
          className="buttonFilter"
          onClick={() => {
            setCategory6(true);
            // setColorButton1(false);
            // setColorButton2(false);
            // setColorButton3(false);
            // setColorButton4(false);
            // setColorButton5(false);
            // setColorButton6(!colorButton6);
          }}
        >
          Autre
        </Button>
      </Row>
      <Row>
        {InputSubCat}
        {buttonValidation}
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitCatSelected: function (subcat) {
      dispatch({ type: "subCatFromFilter", subcat: subcat });
    },
  };
}

const styleButton = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: 12,
  fontWeight: "bold",
  color: "#16bfc4",
  backgroundColor: "#ffffff",
  border: "none",
  margin: 3,
  width: 110,
  height: 30,
};

export default connect(null, mapDispatchToProps)(Filter);
