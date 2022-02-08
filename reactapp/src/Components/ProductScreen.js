import React, { useState } from "react";
import { Card, CardImg, Row } from "reactstrap";
import { Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

const ProductScreen = (props) => {
  console.log(props.product);

  const [goToPayment, setGoToPayment] = useState(false);

  if (goToPayment === true) {
    return <Redirect to="/PaiementScreen" />;
  }

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row style={{marginLeft:1, marginRight:1 }}>
        <Col xs="12" lg="6">
          <Card>
            <CardImg
              alt=""
              top
              width="100px"
              src={props.product.images}
              alt="Card image cap"
            />
          </Card>
        </Col>
        <Col xs="12" lg="6">
          <Row>
            <p style={styleEcrit}>Catégorie du produit:</p>
            <p style={styleBd}>{props.product.subcategory}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Marque: </p>
            <p style={styleBd}>{props.product.brand}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>État: </p>
            <p style={styleBd}>{props.product.state}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Description:</p>
            <p style={styleBd}>{props.product.description}</p>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Prix: </p>
            <p style={styleBd}>{props.product.price}€</p>
          </Row>
          <hr style={{ margin: 0 }} />
          <Row>
            <p style={styleEcrit}>Mondial Realy: </p>
            <p style={styleBd}>10,57€</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Colissimo: </p>
            <p style={styleBd}>10,87€</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Mondial Realy: </p>
            <p style={styleBd}>11,05€</p>
          </Row>
          <hr style={{ margin: 0 }} />

          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: 14,
                width: 150,
                backgroundColor: "#16bfc4",
                border: "none",
                marginTop: 13,
              }}
              onClick={() => {
                goToPayment(true);
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

var styleEcrit = { fontSize: 12, color: "grey", width: "30%", marginBottom: 5 };
var styleBd = { fontSize: 12, color: "17a2b8", marginBottom: 5 };

function mapStateToProps(state) {
  return { product: state.product };
}

export default connect(mapStateToProps, null)(ProductScreen);
