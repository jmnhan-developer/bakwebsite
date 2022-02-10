import React, { useState, useEffect } from "react";
import { div, Row, FormGroup, Input, Card, CardImg } from "reactstrap";
import { Col, Button } from "react-bootstrap";
import Navigation from "./Nav.js";
import Filter from "./Filter.js";
import { connect } from "react-redux";

const PaiementScreen = (props) => {
  const [userInfo, setUserInfo] = useState([]);

  console.log("token récupéré from store updateProfile", props.token);

  return (
    <div style={{ margin: 10, marginBottom: 5 }}>
      <Navigation />

      <Filter />

      <Row>
        <Col xs="12" md="3">
          <Card style={{ marginLeft: 1, marginRight: 1 }}>
            <CardImg
              alt=""
              top
              width="100px"
              src={props.product.images}
              alt="Card image cap"
            />
          </Card>
        </Col>
        <Col xs="12" md="3">
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Catégorie du produit:</p>
            <p style={styleBd}>{props.product.subcategory}</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Marque: </p>
            <p style={styleBd}>{props.product.brand}</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>État: </p>
            <p style={styleBd}>{props.product.state}</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Description:</p>
            <p style={styleBd}>{props.product.description}</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Prix: </p>
            <p style={styleBd}>{props.product.price}€</p>
          </Row>
          <hr style={{ margin: 0 }} />
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Mondial Relay: </p>
            <p style={styleBd}>10,57€</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Colissimo: </p>
            <p style={styleBd}>10,87€</p>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit}>Mondial Realy: </p>
            <p style={styleBd}>11,05€</p>
          </Row>
        </Col>
        <Col xs="12" md="6" style={{ backgroundColor: "#F8F9F9" }}>
          <p style={{ fontSize: 12, fontWeight: "bold" }}>Paiement:</p>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Prix: </p>
						<Col style={{ display: "flex", flexDirection:"column" }}>
						<p style={styleBd}>{props.product.price}€</p>
						</Col>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Transporteur:</p>
            <FormGroup>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                  }}
                >
                  <option>Sélectionner un transporteur</option>
                  <option>Mondial Relay: 10,57€</option>
                  <option>Colissimo: 10,87€</option>
                  <option>Chronopost: 11,05€</option>
                </Input>
              </Col>
            </FormGroup>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Montant total à payer: </p>
						<Col style={{ display: "flex", flexDirection:"column" }}>
						<p style={styleBd}>XXXX€</p>
						</Col>
          </Row>
          <hr />
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Mode de paiement:</p>
            <FormGroup style={{ fontSize: 10 }}>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                    marginBottom: 5,
                  }}
                >
                  <option>Type de carte</option>
                  <option>Visa</option>
                  <option>MasterCard</option>
                </Input>
              </Col>
            </FormGroup>
          </Row>
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Coordonnées bancaires:</p>
            <FormGroup>
              <Col>
                <Input
                  type="text"
                  name="select"
                  id="exampleSelect"
                  placeholder="Nom"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                    marginBottom: 5,
                  }}
                ></Input>
                <Input
                  type="text"
                  name="select"
                  id="exampleSelect"
                  placeholder="Numero de carte"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                    marginBottom: 5,
                  }}
                ></Input>
              </Col>
              <Col style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  type="text"
                  name="select"
                  id="exampleSelect"
                  placeholder="MM/YY"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                    marginBottom: 5,
                    marginRight: 2,
                  }}
                ></Input>
                <Input
                  type="text"
                  name="select"
                  id="exampleSelect"
                  placeholder="Code de sécurité"
                  style={{
                    fontSize: 12,
                    border: "none",
                    outline: "none",
                    marginBottom: 5,
                    marginLeft: 2,
                  }}
                ></Input>
              </Col>
            </FormGroup>
          </Row>
					<hr />
          <Row style={{ marginLeft: 1, marginRight: 1 }}>
            <p style={styleEcrit1}>Adresse de livraison: </p>
            <Col style={{ display: "flex", flexDirection:"column" }}>
              <p style={styleBd}>{props.user.firstName} {props.user.lastName}</p>
              <p style={styleBd}>{props.user.address}</p>
							<p style={styleBd}>{props.user.postalCode} {props.user.city}</p>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                width: 200,
                backgroundColor: "#16bfc4",
                border: "none",
                marginTop: 13,
								margin: 30
              }}
            >
              Valider
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

var styleEcrit = { fontSize: 12, color: "grey", width: "45%", marginBottom: 5 };
var styleBd = { fontSize: 12, color: "17a2b8", marginBottom: 5 };
var styleEcrit1 = {
  fontSize: 12,
  color: "black",
  width: "30%",
  marginBottom: 5,
};
var styleBd1 = {
  fontSize: 12,
  fontWeight: "bold",
  color: "black",
  marginBottom: 5,
};

function mapStateToProps(state) {
  return { user: state.machin, token: state.token, product: state.product };
}

export default connect(mapStateToProps, null)(PaiementScreen);
