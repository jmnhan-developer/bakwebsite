import React, { useState, useEffect } from 'react';
import { Container, Row, FormGroup, Input } from 'reactstrap';
import { Col, Button } from 'react-bootstrap'
import ProductScreen from './ProductScreen.js'
import { connect } from 'react-redux';




const PaiementScreen = (props) => {

    const [userInfo, setUserInfo] = useState([])

    console.log('token récupéré from store updateProfile', props.token)

    useEffect(() => {
        const findUser = async () => {
            const rawData = await fetch(`/users/display-profile?token=${props.token}`) //l'ID ici est un objet...et non un tableau d'objets.
            const doneData = await rawData.json()
            console.log("done data est:", doneData)
            setUserInfo(doneData)
            setFirstName(doneData.firstName)
            setLastName(doneData.lastName)
            setMail(doneData.email)
            setAddress(doneData.address)
            setPostalCode(doneData.postalCode)
            setCity(doneData.city)
        }
        findUser()
    }, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setMail] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')




    return (
        <Container >
            {/* <Row>
                <Navigation />
            </Row>
            <Row>
                <Filter />
            </Row> */}
            <Row style={{ display: "flex" }}>

                <ProductScreen />


                <Col style={{ backgroundColor: '#F8F9F9' }}>
                    <p style={{ fontWeight: "bold" }}>Récapitulatif et Paiement:</p>
                    <Row style={{}}>
                        <p style={styleEcrit1}>Prix: </p>
                        <p style={styleBd1}>{props.product.price}€</p>
                    </Row>

                    <Row style={{}}>
                        <p style={styleEcrit1}>Sélectionner le transporteur:</p>
                        <FormGroup row style={{ fontSize: 10 }}>
                            <Col sm={20}>
                                <Input type="select" name="select" id="exampleSelect" style={{ fontSize: 13, fontWeight: "bold", border: "none", outline: "none" }}>
                                    <option>Mondial Relay: 10,57€</option>
                                    <option>Colissimo: 10,87€</option>
                                    <option>Chronopost: 11,05€</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row style={{}}>
                        <p style={styleEcrit1}>Montant total à payer: </p>
                        <p style={styleBd1}>XXXX€</p>
                    </Row>
                    <hr />
                    <Row style={{}}>
                        <p style={styleEcrit1}>Sélectionner un mode de paiement:</p>
                        <FormGroup row style={{ fontSize: 10 }}>

                            <Col sm={20}>
                                <Input type="select" name="select" id="exampleSelect" style={{ fontSize: 13, fontWeight: "bold", border: "none", outline: "none" }}>
                                    <option>Visa</option>
                                    <option>MasterCard</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Col xs="12" lg="3" style={{ justifyContent: 'flex-start', marginLeft: 483 }}>
                            <Input type="text" name="select" id="exampleSelect" placeholder="Nom" style={{ fontSize: 13, border: "none", outline: "none", width: 300, marginBottom: 5 }}>
                            </Input>
                            <Input type="text" name="select" id="exampleSelect" placeholder="Numero de carte" style={{ fontSize: 13, border: "none", outline: "none", width: 300, marginBottom: 5 }}>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="3" style={{ display: "flex", flexDirection: "row", marginLeft: 483 }}>
                            <Input type="text" name="select" id="exampleSelect" placeholder="MM/YY" style={{ fontSize: 13, border: "none", outline: "none", width: 130, marginBottom: 5, marginRight: 10 }}>
                            </Input>
                            <Input type="text" name="select" id="exampleSelect" placeholder="Code de sécurité" style={{ fontSize: 13, border: "none", outline: "none", width: 160 }}>
                            </Input>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <p style={styleEcrit1}>Adresse de livraison:</p>
                    </Row>
                    <Row style={{ flexDirection: "column" }}>
                        <p style={styleBd1}>{firstName} {lastName}</p>
                        <p style={styleBd1}>{address}</p>
                        <p style={styleBd1}>{postalCode} {city}</p>

                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                        <Button style={{ width: 200, backgroundColor: "#16bfc4", border: "none", marginTop: 13 }}>Payer Mainetnant</Button>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

var styleEcrit = { fontSize: 12, color: "lightgrey", width: "40%", marginBottom: 5 }
var styleBd = { fontSize: 12, color: "grey", marginBottom: 5 }
var styleEcrit1 = { fontSize: 13, color: "black", width: "45%", marginBottom: 5 }
var styleBd1 = { fontSize: 13, fontWeight: "bold", color: "black", marginBottom: 5 }


function mapStateToProps(state) {
    return { token: state.token, product: state.product }
}

export default connect(
    mapStateToProps,
    null
)(PaiementScreen);
