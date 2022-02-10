import React, { useState } from "react";
import { Card, CardImg, Row } from "reactstrap";
import { Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function ProductScreen ({user, product, onSubmitUserStatus}) {
  // console.log(props.product);
  console.log("---USER INFO DANS PRODUCTSCREEN---", user.firstName);

  const [goToPayment, setGoToPayment] = useState(false);
  
  var userStatus = "buyer"


  let redirectToPayment = null;
  if (goToPayment === true) {
    if (user.firstName) {
      redirectToPayment = <Redirect to="/PaiementScreen" />;
    } else {
      redirectToPayment = <Redirect to="/signup" />;
    }
  }


  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row style={{ marginLeft: 1, marginRight: 1 }}>
        <Col xs="12" lg="6">
          <Card>
            <CardImg
            
              top
              width="100px"
              src={product.images}
              alt="Card image cap"
            />
          </Card>
        </Col>
        <Col xs="12" lg="6">
          <Row>
            <p style={styleEcrit}>Catégorie du produit:</p>
            <p style={styleBd}>{product.subcategory}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Marque: </p>
            <p style={styleBd}>{product.brand}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>État: </p>
            <p style={styleBd}>{product.state}</p>
          </Row>
          <Row>
            <p style={styleEcrit}>Description:</p>
            <p style={styleBd}>{product.description}</p>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <p style={styleEcrit}>Prix: </p>
            <p style={styleBd}>{product.price}€</p>
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
                setGoToPayment(true);
                onSubmitUserStatus(userStatus)
              }}
            >
              Acheter
            </Button>
          </Row>
        </Col>
      </Row>
      {redirectToPayment}
    </div>
  );
};

var styleEcrit = { fontSize: 12, color: "grey", width: "30%", marginBottom: 5 };
var styleBd = { fontSize: 12, color: "17a2b8", marginBottom: 5 };

function mapStateToProps(state) {
  return { user: state.machin, product: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitUserStatus: function (userStatus) {
      dispatch({type:'userisabuyer', userStatus:userStatus})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
