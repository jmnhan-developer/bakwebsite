import React, { useState, useEffect } from 'react';
import { Row, Input } from 'reactstrap';
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux';




function UpDateProfile(props) {

    //RECUPERER LES INFOS DE L'USER VIA LE TOKEN POUR AFFICHER SES INFOS DANS L'ECRAN PROFILEUPDATE
    const [userInfo, setUserInfo] = useState([])
    console.log('token récupéré from store updateProfile',props.token)
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


    //POUR RETENIR LES MODIFS ET RÉENREGISTRER LES INFOS DE L'USER DANS LA BASE DE DONNÉES

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setMail] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')


    var handleClick = async () => {
        const dataUsers = await fetch(`/users/update-profile?token=${props.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstName=${firstName}&lastName=${lastName}&email=${email}&address=${address}&postalCode=${postalCode}&city=${city}`
        });
    };

    return (
        <div>
            <Col >
                <Row style={{ justifyContent: "space-between", marginTop: 10 }}>
                    <p style={{ color: "black" }}><strong>Mes coordonnées</strong></p>
                    
                </Row>
                <Row>
                    <p style={styleEcrit}>Prénom: </p>
                    <Input style={styleBd} name="firstName" value={firstName} onChangeText={(val) => setFirstName(val)}></Input>

                </Row>
                <Row>
                    <p style={styleEcrit}>Nom: </p>
                    <Input style={styleBd} name="lastName" value={lastName} onChangeText={(val) => setLastName(val)} ></Input>

                </Row>
                <Row>
                    <p style={styleEcrit}>Mon e-mail: </p>
                    <Input style={styleBd} name="email" value={email} onChangeText={(val) => setMail(val)}></Input>

                </Row>
                <Row>
                    <p style={styleEcrit}>Adresse: </p>
                    <Input style={styleBd} name="Address" value={address} onChangeText={(val) => setAddress(val)}></Input>

                </Row>
                <Row>
                    <p style={styleEcrit}>Code Postal: </p>
                    <Input style={styleBd} name="postalCode" value={postalCode} onChangeText={(val) => setPostalCode(val)}></Input>

                </Row>
                <Row>
                    <p style={styleEcrit}>Ville: </p>
                    <Input style={styleBd} name="city" value={city} onChangeText={(val) => setCity(val)}></Input>

                </Row>
            </Col>
            <hr />

        </div>



    )
}

var styleEcrit = { fontSize: 15, color: "grey", width: "20%", marginBottom: 5 }
var styleBd = { fontSize: 15, color: "black", marginBottom: 5, width: 400, border: "none", outiline: "none", backgroundColor: "#F8F9F9" }
var styleEcrit1 = { fontSize: 13, color: "black", width: "45%", marginBottom: 5 }
var styleBd1 = { fontSize: 13, fontWeight: "bold", color: "black", marginBottom: 5 }


function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(UpDateProfile);
