import React, { useState } from "react";
import { Card, CardImg, div, Row } from "reactstrap";
import { Col, Button, Cardeck } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

const ProductScreen = (props) => {
  console.log(props.product);

  const [goToProduct, setGoToProduct] = useState(false);

  if (goToProduct == true) {
    return <Redirect to="/PaiementScreen" />;
  }

  return (
    <div>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Filter />
      </Row>
      <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardImg
              alt=""
              top
              width="400px"
              src={props.product.images}
              alt="Card image cap"
            />
          </Card>
        </Col>
        <Col xs="12" lg="6">
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Prix: </p>
            <p style={styleBd}>{props.product.price}€</p>
          </Row>
          <hr style={{ margin: 0 }} />
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Mondial Realy: </p>
            <p style={styleBd}>10,57€</p>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Colissimo: </p>
            <p style={styleBd}>10,87€</p>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Mondial Realy: </p>
            <p style={styleBd}>11,05€</p>
          </Row>
          <hr style={{ margin: 0 }} />
          <Row style={{}}>
            <p style={styleEcrit}>Catégorie du produit:</p>
            <p style={styleBd}>{props.product.subcategory}</p>
          </Row>
          <Row style={{}}>
            <p style={styleEcrit}>Marque: </p>
            <p style={styleBd}>{props.product.brand}</p>
          </Row>
          <Row style={{}}>
            <p style={styleEcrit}>État: </p>
            <p style={styleBd}>{props.product.state}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Description:</p>
            <p style={styleBd}>{props.product.description}</p>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                width: 200,
                backgroundColor: "#16bfc4",
                border: "none",
                marginTop: 13,
              }}
              onClick={() => {
                setGoToProduct(true);
              }}
            >
              Acheter
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

var styleEcrit = { fontSize: 15, color: "grey", width: "30%", marginBottom: 5 };
var styleBd = { fontSize: 15, color: "17a2b8", marginBottom: 5 };

function mapStateToProps(state) {
  return { product: state.product };
}

export default connect(mapStateToProps, null)(ProductScreen);
