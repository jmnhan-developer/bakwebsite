import React, { useEffect, useState } from 'react'
import { Card, CardText, CardBody, CardImg, CardTitle, CardSubtitle, Button, Col, Row, Container } from 'reactstrap';
import { connect } from 'react-redux';
import Navigation from './Nav.js'
import Filter from "./Filter.js"



function ResultScreen(props) {


    console.log('subcat from resultscreen', props.subcat)
    const [productList, setProductList] = useState([])
    const [listenReducer, setListenReducer] = useState('')
    
    useEffect(() => {
        const findProducts = async () => {
            const data = await fetch(`articles/filter-articles?subcat=${props.subcat}`)
            const body = await data.json()
            setProductList(body.products);

        }
        findProducts()
    }, [props.subcat])

    console.log('from resultscreen', productList);

    let searchProduct = productList.map((e, i) => {
        return (<Col xs="12" lg="6" xl="4">
            <Card>
                <CardImg top width="100%" src={e.images} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{e.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{e.price}</CardSubtitle>
                    <CardText>{e.description}</CardText>
                    <Button>Voir l'article</Button>
                </CardBody>
            </Card>
        </Col>)
    })


    return (
        <Container>
            <Navigation />
            <Filter />
            <h4>Résultats de votre recherche</h4>
            <Row>
                {searchProduct}
            </Row>
        </Container>
    );
}


function mapStateToProps(state) {
    return { subcat: state.subcat }
}

export default connect(
    mapStateToProps,
    null
)(ResultScreen);