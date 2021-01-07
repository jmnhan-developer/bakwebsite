import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Container, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col'
import Navigation from './Nav.js'
import Filter from './Filter.js'


function Homescreen({ token, onSubmitproduct }) {

  const [productList, setProductList] = useState([])
  const [goToProduct, setGoToProduct] = useState(false)

  useEffect(() => {
    const findProducts = async () => {
      const data = await fetch(`/articles/get-all-articles`)
      const body = await data.json()
      setProductList(body.products);
    }
    findProducts()
  }, [])

  console.log(productList);

  let allArticles = productList.map((e, i) => {
    return (<Col xs="12" lg="6" xl="3">
      <Card onClick={() => { setGoToProduct(true); onSubmitproduct(e) }} style={{marginBottom:10}}>
        <CardImg top width="100%" src={e.images} alt="Card image cap" style={{height:250}}/>
        <hr style={{marginBottom:1}}/>
        <CardBody>
          <CardTitle tag="h5">{e.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{e.price}€</CardSubtitle>
          <CardText>{e.brand}</CardText>
        </CardBody>
      </Card>
    </Col>)
  })

  if (goToProduct == true) {
    return <Redirect to='/ProductScreen' />
  }





  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Filter />
      </Row>
      <Row>
        {allArticles}
      </Row>
    </Container>

  );
};

function mapStateToProps(state) {
  return {token:state.token}
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmitproduct: function (product) {
      dispatch({ type: 'productSelectedFromHomeScreen', product: product })
    }
  }
}

export default connect(

  mapStateToProps,
  mapDispatchToProps

  )(Homescreen)
