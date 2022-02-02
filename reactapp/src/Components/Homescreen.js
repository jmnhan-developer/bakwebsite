import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  div,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Col from "react-bootstrap/Col";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";

function Homescreen({ token, onSubmitproduct }) {
  const [productList, setProductList] = useState([]);
  const [goToProduct, setGoToProduct] = useState(false);

  useEffect(() => {
    const findProducts = async () => {
      const data = await fetch(`/articles/get-all-articles`);
      const body = await data.json();
      setProductList(body.products);
    };
    findProducts();
  }, []);

  let allArticles = productList.map((e, i) => {
    return (
      <Col xs="6" md="4" lg="3" xl="2" style={{paddingLeft: 0, paddingRight: 0}}> 
        <Card
          onClick={() => {
            setGoToProduct(true);
            onSubmitproduct(e);
          }}
          alt=""
          style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 2, cursor: "pointer" }}
        >
          <CardImg
            top
            width="100%"
            src={e.images}
            alt="Card image cap"
            style={{ height: 150 }}
          />
          <hr style={{ marginBottom: 1 }} />
          <CardBody>
          <CardTitle style={{ fontSize: 12, fontWeight: "bold" }}>
              {e.title}
            </CardTitle>
            <CardSubtitle style={{ fontSize: 12 }} className="mb-2 text-muted">
              {e.price}€
            </CardSubtitle>
            <CardText style={{ fontSize: 12 }}>{e.brand}</CardText>
            <CardText style={{ fontSize: 12 }}>{e.state}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  });

  if (goToProduct == true) {
    return <Redirect to="/ProductScreen" />;
  }

  return (
    <div style={{margin:10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row>
        <Col
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 5, 
            marginTop: 15,
            marginBottom: 15
          }}
        >
          <img width="100%" src="./chambrebebe.png" alt="chambrebebe" />
        </Col>
      </Row>

      <Row style={{ marginLeft: 2, marginRight: 2 }}>{allArticles}</Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmitproduct: function (product) {
      dispatch({ type: "productSelectedFromHomeScreen", product: product });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
