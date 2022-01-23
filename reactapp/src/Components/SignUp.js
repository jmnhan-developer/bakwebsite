import React, { useState, useEffect, MenuItem } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, div } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Navigation from './Nav.js'
import Filter from './Filter.js';

function SignUp({ onSubmitToken }) {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [isConnect, setIsConnect] = useState(false)
    const [isNotConnect, setIsNotConnect] = useState('')
    const [token, setToken] = useState('')
    const [tokenIsSubmited, setTokenIsSubmited] = useState(false)

    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignup, setErrorsSignup] = useState([])

    // FUNCTION TO CLEAN ALL INPUTS
    function clickToClean() {
        setFirstName("");
        setLastName("");
        setMail("");
        setPassword("");
        setAddress("");
        setPostalCode("");
        setCity("");
    };




    var handleSubmitSignup = async () => {


        const dataUsers = await fetch('/users/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&passwordFromFront=${password}&addressFromFront=${address}&postalCodeFromFront=${postalCode}&cityFromFront=${city}`
        })

        const dataConsumers = await dataUsers.json()

        setIsConnect(dataConsumers.result)
        setIsNotConnect(dataConsumers.error)
        console.log('token from signUpScreen',dataConsumers.saveUser.token)
        onSubmitToken(dataConsumers.saveUser.token)
    }

    if (isConnect === true) {
        return <Redirect to='/' />
    }


    return (
        <div>
            <Navigation />
            <Filter />
            <Row style={{ display: "flex", justifyContent: "center" }}>
                <Form style={{ width: 500 }}>
                    <p style={{ fontSize: 25 }}>S'inscrire</p>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="text">Prénom</Label>
                                <Input onChange={(e) => setFirstName(e.target.value)} type="text" name="prénom" id="prénom" placeholder="Prénom" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="text">Nom</Label>
                                <Input onChange={(e) => setLastName(e.target.value)} type="text" name="nom" id="nom" placeholder="Nom" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input onChange={(e) => setMail(e.target.value)} type="email" name="email" id="email" placeholder="e-mail" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="password" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="adresse">Adresse</Label>
                        <Input onChange={(e) => setAddress(e.target.value)} type="text" name="adresse" id="adresse" placeholder="Adresse" />
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleZip">Code Postal</Label>
                                <Input onChange={(e) => setPostalCode(e.target.value)} type="text" name="zip" id="exampleZip" />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="ville">Ville</Label>
                                <Input onChange={(e) => setCity(e.target.value)} type="text" name="ville" id="ville" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button style={{ fontSize: 15, color: "white", backgroundColor: "#16bfc4", border: "none", marginRight:20 }} onClick={() => handleSubmitSignup()}>M'inscrire</Button>
                    {/* <p>Ne pas oublier de rajouter clickToClean() dans le onClick</p> */}
                    <Link to ="/SignIn">J'ai déjà un compte</Link>
                </Form>
            </Row>
        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return {
        onSubmitToken: function (token) {
            dispatch({ type: 'informationFromSignUp', token: token })
        }
    }
}



export default connect(

    null,
    mapDispatchToProps

)(SignUp);
