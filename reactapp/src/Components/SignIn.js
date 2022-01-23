import React, { useState } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, div } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Navigation from './Nav.js'
import Filter from './Filter.js'

function SignIn ({onSubmitToken}){

    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [isConnect, setIsConnect] = useState(false)
    const [isNotConnect, setIsNotConnect] = useState('')
    const [tokenIsSubmited, setTokenIsSubmited] = useState(false)


    // FUNCTION TO CLEAN ALL INPUTS
    function clickToClean() {
        setMail("");
        setPassword("");
    }


    var handleSubmitSignin = async () => {
        console.log('HELLO WORLD');

        const dataUsers = await fetch(`/users/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `emailFromFront=${email}&passwordFromFront=${password}`
        })

        const dataConsumers = await dataUsers.json()


        console.log(dataConsumers.token)
        setIsConnect(dataConsumers.result)
        console.log(setIsConnect);
        setIsNotConnect(dataConsumers.error)
        onSubmitToken(dataConsumers.token)
    }
    if (isConnect === true) {
        console.log('HELLO WORLD', isConnect);
        return <Redirect to='/' />
    } 

    


    return (
        <div>
            <Navigation />
            <Filter />
            <Row style={{ display: "flex", justifyContent: "center" }}>
                <Form style={{ width: 500 }}>
                    <p style={{ fontSize: 25 }}>Se connecter</p>
                    <Row form>
                        <Col md={10}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input onChange={(e) => setMail(e.target.value)} type="email" name="email" id="email" placeholder="e-mail" />
                            </FormGroup>
                        </Col>
                        <Col md={10}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="password" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={() => handleSubmitSignin()} style={{ fontSize: 15, color: "white", backgroundColor: "#16bfc4", border: "none" }}>Me connecter</Button>
                </Form>
            </Row>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmitToken: function (token) {
            dispatch({ type: 'informationFromSignIn', token: token })
        }
    }
}


export default connect(
    null,
    mapDispatchToProps
)(SignIn);
