import React, { useState } from "react";
import { Row, div, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function SellScreen(props) {
  console.log(
    "---EST CE QU'ON A BIEN LE TOKEN DANS SELLSCREEN----",
    props.token
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [kidsAge, setKidsAge] = useState("");
  const [url, setUrl] = useState("");
  const [state, setState] = useState("");
  const [token, setToken] = useState("");

  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const [listErrorsCreateArticle, setListErrorsCreateArticle] = useState([]);

  var handleClick = async () => {
    const data = await fetch(`/articles/create-article`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `urlFromFront=${url}&titleFromFront=${title}&descriptionFromFront=${description}&brandFromFront=${brand}&priceFromFront=${price}&categoryFromFront=${category}&subcategoryFromFront=${subCategory}&stateFromFront=${state}&sellerToken=${props.token}`
    });
    
    const body = await data.json();

    if (body.result == true) {
      setIsValidated(true)
    } else {
      setListErrorsCreateArticle(body.error)
    }
  };

  if (isValidated == true) {
    return <Redirect to="/" />;
  }

  var subCategory1 = [
    { subcategory: "Sélectionner un produit" },
    { subcategory: "Sièges Auto" },
    { subcategory: "Nacelles" },
    { subcategory: "Poussettes" },
    { subcategory: "Landeaux" },
    { subcategory: "Portes-Bébé" },
    { subcategory: "Sacs à Langer" },
    { subcategory: "Se déplacer / Autre" },
  ];

  var subCategory2 = [
    { subcategory: "Sélectionner un produit" },
    { subcategory: "de 0 à 3 mois" },
    { subcategory: "de 4 à 6 mois" },
    { subcategory: "de 7 à 12 mois" },
    { subcategory: "de 13 à 18 mois" },
    { subcategory: "de 19 à 24 mois" },
    { subcategory: "de 2 à 3 ans" },
    { subcategory: "Autres" },
  ];

  var subCategory3 = [
    { subcategory: "Sélectionner un produit" },
    { subcategory: "Baignoires" },
    { subcategory: "Transats de bain" },
    { subcategory: "Lingettes-Serviettes" },
    { subcategory: "Thermometres" },
    { subcategory: "Jouets de bain" },
    { subcategory: "Se baigner / Autre" },
  ];

  var subCategory4 = [
    { subcategory: "Sélectionner un produit" },
    { subcategory: "Lits bébé" },
    { subcategory: "Lits de voyage" },
    { subcategory: "Linges de lit" },
    { subcategory: "Gigoteuses" },
    { subcategory: "Veilleuses" },
    { subcategory: "Babyphones" },
    { subcategory: "Dormir / Autre" },
  ];

  var subCategory5 = [
    { subcategory: "Sélectionner un produit" },
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

  if (category == "Se déplacer" && selectedCategory == true) {
    setDisplaySubCategory(subCategory1);
    setSelectedCategory(false);
  } else if (category == "S'habiller" && selectedCategory == true) {
    setDisplaySubCategory(subCategory2);
    setSelectedCategory(false);
  } else if (category == "Se baigner" && selectedCategory == true) {
    setDisplaySubCategory(subCategory3);
    setSelectedCategory(false);
  } else if (category == "Dormir" && selectedCategory == true) {
    setDisplaySubCategory(subCategory4);
    setSelectedCategory(false);
  } else if (category == "Manger" && selectedCategory == true) {
    setDisplaySubCategory(subCategory5);
    setSelectedCategory(false);
  } else if (category == "Autre" && selectedCategory == true) {
    setDisplaySubCategory(subCategory6);
    setSelectedCategory(false);
  }

  let InputSubCat = "";
  let optionSubCat = "";

  if (DisplaySubCategory != "") {
    let optionSubCat = DisplaySubCategory.map((e, i) => {
      return <option> {e.subcategory}</option>;
    });

    InputSubCat = (
      <Input
        style={{ fontSize: 12 }}
        type="select"
        name="select"
        onChange={(e) => setSubCategory(e.target.value)}
        className="inputSell"
      >
        {optionSubCat}
      </Input>
    );
  }

  var tabErrorsCreateArticle = listErrorsCreateArticle.map((error, i) => {
    return <p style={{ fontSize: 12, color: "red" }}>{error}</p>;
  });

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row style={styleRow}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 12,
            marginLeft: 10,
            marginTop: 5,
            paddingLeft: 15,
          }}
        >
          Vendre un article
        </p>
      </Row>

      <Row style={styleRow}>
        <Col xs="12" md="6" lg="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="exampleSelect">Catégorie:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedCategory(true);
              }}
              className="inputSell"
            >
              <option>-Choisir une catégorie</option>
              <option>Se déplacer</option>
              <option>S'habiller</option>
              <option>Dormir</option>
              <option>Manger</option>
              <option>Se baigner</option>
              <option>Autre</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="exampleSelect">Produit:</Label>
            {InputSubCat}
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="example">Marque:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="text"
              name="brand"
              id="exampleBrand"
              placeholder="Marque du produit"
              onChange={(e) => setBrand(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="4">
          <FormGroup style={{ fontSize: 12, padding: 5 }}>
            <Label for="exampleSelect">État du produit:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => {
                setState(e.target.value);
                setSelectedCategory(true);
                setState(e.target.value);
              }}
            >
              <option>-Choisir un état</option>
              <option>Neuf</option>
              <option>Bon état</option>
              <option>Etat d'usage</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="4">
          <FormGroup
            style={{
              fontSize: 12,
              padding: 5,
            }}
          >
            <Label for="example">Prix:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="text"
              name="brand"
              id="exampleBrand"
              placeholder="10€"
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="6" lg="4">
          <FormGroup
            style={{
              fontSize: 12,
              padding: 5,
            }}
          >
            <Label for="example">Titre de l'annonce:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="text"
              name="name"
              id="exampleBrand"
              placeholder="ex: Poussette"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col>
          <FormGroup
            style={{
              fontSize: 12,
              padding: 5,
            }}
          >
            <Label for="example">Insérer une image:</Label>
            <Input
              style={{ fontSize: 12 }}
              type="text"
              name="name"
              id="exampleBrand"
              placeholder=""
              onChange={(e) => setUrl(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row style={styleRow}>
        <Col xs="12">
          <FormGroup style={{ padding: 10 }}>
            <Label for="exampleText" style={{ fontSize: 12 }}>
              Description du produit
            </Label>
            <Input
              style={{ height: 100 }}
              type="textarea"
              name="text"
              id="exampleText"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row style={styleRow}>{tabErrorsCreateArticle}</Row>

      <Row style={styleRow}>
        <Button
          style={{
            fontSize: 15,
            color: "white",
            backgroundColor: "#16bfc4",
            border: "none",
            marginBottom: 20,
          }}
          onClick={() => {
            handleClick();
          }}
        >
          Publier
        </Button>
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

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(SellScreen);
