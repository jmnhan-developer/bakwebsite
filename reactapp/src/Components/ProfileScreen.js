import React, { useState } from "react";
import {
  Row,
  Input,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";

function Profile({user, token, onSubmitproduct}) {
  console.log("EST CE QU'ON A BIEN USER.TOKEN SUR PROFILE", user);
  console.log("---EST CE QU'ON A BIEN LE TOKEN---", token)


  const [goToProfileUpdate, setGoToProfileUpdate] = useState(false);
  const [myProductList, setMyProductList] = useState([]);
  const [goToProduct, setGoToProduct] = useState(false);

  useState(() => {
    const findMyProducts = async () => {
      const data = await fetch(
        `/articles/get-article-by-seller?sellerToken=${token}`
      );
      const body = await data.json();
      setMyProductList(body.products);
      
      console.log ("---C'EST QUOI LE BODY---", body)

    };
    findMyProducts();
  }, [user.token]);
  
  let myProducts = myProductList.map((e, i) => {
    return (
      <Col xs="6" md="4" lg="3" xl="2" style={{paddingLeft: 0, paddingRight: 0}}> 
        <Card
          onClick={() => {
            setGoToProduct(true);
            onSubmitproduct(e);
          }}
          alt=""
          style={{ paddingLeft: 0, paddingRight: 0, margin: 5, cursor: "pointer", borderRadius: 15 }}
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

  if (goToProfileUpdate === true) {
    return <Redirect to="/ProfileUpdateScreen" />;
  }

  if (goToProduct === true) {
    return <Redirect to="/MyProductScreen" />;
  }

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row style={styleRowDisplayProfile}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Mon profile
        </p>
      </Row>

      <Row style={styleRowDisplayProfile}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Prénom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="firstName"
            value={user.firstName}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Nom:</p>
          <Input
            style={{ fontSize: 12 }}
            name="lastName"
            value={user.lastName}
          />
        </Col>
      </Row>

      <Row style={styleRowDisplayProfile}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>E-mail:</p>
          <Input
            style={{ fontSize: 12 }}
            name="email"
            value={user.email}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Adresse:</p>
          <Input
            style={{ fontSize: 12 }}
            name="address"
            value={user.address}
          />
        </Col>
      </Row>

      <Row style={styleRowDisplayProfile}>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Code Postal:</p>
          <Input
            style={{ fontSize: 12 }}
            name="postalCode"
            value={user.postalCode}
          />
        </Col>
        <Col xs="12" md="6" style={styleCol}>
          <p style={styleP}>Ville:</p>
          <Input style={{ fontSize: 12 }} name="city" value={user.city} />
        </Col>
      </Row>
      <Row style={styleRowDisplayProfile}>
        <Button
          style={{ fontSize: 12, marginBottom: 10 }}
          onClick={() => {
            setGoToProfileUpdate(true);
          }}
        >
          Modifier mon profile
        </Button>
      </Row>
      <hr></hr>
      <Row style={{display: "flex", flexDirection:"row",   justifyContent: "space-evenly", marginTop: 10}}>
      <p
          style={{
            fontWeight: "bold",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Mes articles en vente
        </p>
      </Row>
      <Row style={{ marginLeft: 2, marginRight: 2, marginTop: 10 }}>{myProducts}</Row>
    </div>
  );
}

var styleRowDisplayProfile = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  backgroundColor: "#F8F9F9",
  marginLeft: 2,
  marginRight: 2,
};

var styleCol = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: 10,
};
var styleP = { width: 150, fontSize: 12, margin: 0 };

function mapStateToProps(state) {
  return { user: state.machin, token: state.token };
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmitproduct: function (product) {
      dispatch({ type: "productSelectedFromResultScreen", product: product });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
