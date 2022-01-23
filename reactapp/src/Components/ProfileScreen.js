import React from 'react';
import { div, Row } from 'reactstrap';
import UpDateProfile from './UpDateProfile.js'
import Navigation from './Nav.js'
import Filter from "./Filter.js"
import { connect } from 'react-redux';





function ProfileScreen(props) {



    return (
        <div>
            <Row>
                <Navigation />
            </Row>
            <Row>
                <Filter />
            </Row>
            <Row>
                <UpDateProfile />
            </Row>
        </div>


    )
}



function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(ProfileScreen);
