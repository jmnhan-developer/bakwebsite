import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { Redirect } from "react-router-dom";

function ResultScreen(props) {
  const [productList, setProductList] = useState([]);
  const [goToProduct, setGoToProduct] = useState(false);

  useEffect(() => {
    const findProducts = async () => {
      const data = await fetch(
        `articles/filter-articles?subcat=${props.subcat}`
      );
      const body = await data.json();
      setProductList(body.products);
    };
    findProducts();
  }, [props.subcat]);

  console.log("----PRODUCTLIST----", productList);

  let searchProduct;

  if (productList.length > 0) {
    console.log("----PRODUCTLIST.LENGTH----", productList.length);
    searchProduct = productList.map((e, i) => {
      return (
        <Col
          key={i}
          xs="6"
          md="4"
          lg="3"
          xl="2"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Card
            onClick={() => {
              setGoToProduct(true);
              props.onSubmitproduct(e);
            }}
            alt=""
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              margin: 5,
              cursor: "pointer",
              borderRadius: 15,
            }}
          >
            <CardImg
              top
              width="100%"
              src={e.images}
              alt="Card image cap"
              style={{ height: 150, borderRadius: 15 }}
            />
            <hr style={{ marginBottom: 2 }} />
            <CardBody>
              <CardTitle style={{ fontSize: 12, fontWeight: "bold" }}>
                {e.title}
              </CardTitle>
              <CardSubtitle
                style={{ fontSize: 12 }}
                className="mb-2 text-muted"
              >
                {e.price}€
              </CardSubtitle>
              <CardText style={{ fontSize: 12 }}>{e.brand}</CardText>
              <CardText style={{ fontSize: 12 }}>{e.state}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    });
  } else {
    searchProduct = (
      <p
        style={{
          display: "flex",
          alignContent: "center",
          margin: 0,
          padding: 0,
          fontSize: 12,
          color: "#16bfc4",
          borderRadius: "blue",
        }}
      >
        Aucun produit
      </p>
    );
  }

  if (goToProduct === true) {
    return <Redirect to="/ProductScreen" />;
  }

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />
      <Filter />

      <p>Résultats de votre recherche:</p>
      <Row style={{ marginLeft: 2, marginRight: 2 }}>{searchProduct}</Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { subcat: state.subcat };
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmitproduct: function (product) {
      dispatch({ type: "productSelectedFromResultScreen", product: product });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
