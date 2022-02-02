import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
  div,
} from "reactstrap";
import { connect } from "react-redux";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { Redirect } from "react-router-dom";

function ResultScreen(props) {

  const [productList, setProductList] = useState([]);
  const [listenReducer, setListenReducer] = useState("");
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

  let searchProduct = productList.map((e, i) => {
    return (
      <Col xs="6" md="4" lg="3" xl="2" style={{paddingLeft: 0, paddingRight: 0}}>
        <Card>
          <CardImg top width="100%" src={e.images} alt="Card image cap" />
          <CardBody>
            <CardTitle style={{ fontSize: 12, fontWeight: "bold" }}>
              {e.title}
            </CardTitle>
            <CardSubtitle style={{ fontSize: 12 }} className="mb-2 text-muted">
              {e.price}€
            </CardSubtitle>
            <CardText style={{ fontSize: 12 }}>{e.brand}</CardText>
            <CardText style={{ fontSize: 12 }}>{e.state}</CardText>
            <Button
              style={{
                fontSize: 12,
                color: "white",
                backgroundColor: "#16bfc4",
                border: "none",
              }}
							onClick={() => {
								setGoToProduct(true);
								props.onSubmitproduct(e);
							}}
            >
              Voir l'article
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  });
	if(goToProduct == true) {
		return <Redirect to="/ProductScreen" />;
	}

  return (
    <div style={{margin:10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <p>Résultats de votre recherche</p>
      <Row style={{ marginLeft: 2, marginRight: 2 }}>{searchProduct}</Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { subcat: state.subcat };
}
function mapDispatchToProps (dispatch) {
	return {
		onSubmitproduct: function (product) {
			dispatch ({type: "productSelectedFromResultScreen", product:product})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
