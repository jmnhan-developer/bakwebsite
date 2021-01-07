import React from 'react'
import { Button, Nav} from 'reactstrap';
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'





function Navigation() {


    return (
        <div>

            <Nav style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width:1120 }}>
                <span className="navbar-brand" >
                    <Link to="/"><img src="./logo-bak.png" width="60" height="60" className="d-inline-block align-top" alt="logo" /></Link>
                </span>
                <SearchBar />
                <Link to="/SellScreen" ><Button type="button" style={{ fontSize: 15, color: "white", backgroundColor: "#16bfc4", border: "none" }}>Vendre un article</Button></Link>
                <Link to="/SignUp" style={{ fontSize: 15, borderRadius: "blue" }}>M'inscrire | Me connecter</Link>
                <Link to="/ProfileScreen" style={{ fontSize: 15, borderRadius: "blue" }}>Mon Profile</Link>
            </Nav>
            <hr style={{ margin: 0 }} />

        </div>

    )
}

export default Navigation;