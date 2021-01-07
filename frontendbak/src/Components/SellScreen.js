import React, { useState } from 'react';
import { Row, Container, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Navigation from './Nav.js'
import Filter from './Filter.js'



function SellScreen(props) {


    console.log('token from sellscreen', props.token, '-----');

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState(0)
    const [age, setAge] = useState('')
    const [url, setUrl] =useState('')
    const [state, setState] =useState('')
    const [token, setToken] =useState('')

    const [catName, setCatName] = useState('');
    const [selectedCatName, setSelectedCatName] = useState(false)
    const [DisplaySubCat, setDisplaySubCat] = useState([]);
    const [subCatName, setSubCatName] = useState('');
    const [selectedValueState, setSelectedValueState] = useState("");
    const [isValidated, setIsValidated] = useState(false)


    var handleClick = async () => {

        const dataArticle = await fetch(`/articles/create-article`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `url=${url}&title=${title}&description=${desc}&brand=${brand}&price=${price}&age=${age}&category=${catName}&subcategory=${subCatName}&state=${selectedValueState}&sellerToken=${props.token}`
            
            // &sellerToken=${props.token}
        });
        console.log('dataAnnonce XXXX', dataArticle.body);


        const dataAnnonce = await dataArticle.json()


    }
    if (isValidated == true) {
        return <Redirect to='/' />
    }



    var subCat1 = [
        { subcategory: "Sièges Auto" },
        { subcategory: "Nacelles" },
        { subcategory: "Poussettes" },
        { subcategory: "Landeaux" },
        { subcategory: "Portes-Bébé" },
        { subcategory: "Sacs à Langer" },
        { subcategory: "Se déplacer / Autre" },
    ]

    var subCat2 = [
        { subcategory: "de 0 à 3 mois" },
        { subcategory: "de 4 à 6 mois" },
        { subcategory: "de 7 à 12 mois" },
        { subcategory: "de 13 à 18 mois" },
        { subcategory: "de 19 à 24 mois" },
        { subcategory: "de 2 à 3 ans" },
        { subcategory: "Autres" },
    ]

    var subCat3 = [
        { subcategory: "Baignoires" },
        { subcategory: "Transats de bain" },
        { subcategory: "Lingettes-Serviettes" },
        { subcategory: "Thermometres" },
        { subcategory: "Jouets de bain" },
        { subcategory: "Se baigner / Autre" },
    ]

    var subCat4 = [
        { subcategory: "Lits bébé" },
        { subcategory: "Lits de voyage" },
        { subcategory: "Linges de lit" },
        { subcategory: "Gigoteuses" },
        { subcategory: "Veilleuses" },
        { subcategory: "Babyphones" },
        { subcategory: "Dormir / Autre" },
    ]

    var subCat5 = [
        { subcategory: "Biberons" },
        { subcategory: "Chauffe-Biberons" },
        { subcategory: "Stérilisateurs" },
        { subcategory: "Robots de Cuisine" },
        { subcategory: "Vaiselles" },
        { subcategory: "Accessoires" },
        { subcategory: "Manger / Autre" },
    ]

    if (catName == "Se déplacer" && selectedCatName == true) {
        setDisplaySubCat(subCat1)
        setSelectedCatName(false)

    }
    else if (catName == "S'habiller" && selectedCatName == true) {
        setDisplaySubCat(subCat2)
        setSelectedCatName(false)
    }
    else if (catName == "Se baigner" && selectedCatName == true) {
        setDisplaySubCat(subCat3)
        setSelectedCatName(false)
    }
    else if (catName == "Dormir" && selectedCatName == true) {
        setDisplaySubCat(subCat4)
        setSelectedCatName(false)
    }
    else if (catName == "Manger" && selectedCatName == true) {
        setDisplaySubCat(subCat5)
        setSelectedCatName(false)
    }

    let InputSubCat = '';
    let optionSubCat = '';


    if (DisplaySubCat != '') {
        let optionSubCat = DisplaySubCat.map((e, i) => {

            return (<option> {e.subcategory}</option>)

        })

        InputSubCat = <Input type="select" name="select" onChange={(e) => setSubCatName(e.target.value)} className='inputSell'>
            {optionSubCat}
        </Input>
    }


    return (
        <Container>
            <Navigation />
            <Filter/>
            <Row style={{ fontWeight: "bold", fontSize: 20, marginLeft: 3, marginRight: 3, marginTop: 10 }}>
                <p>Vendre un article</p>
            </Row>
            <Row style={{ backgroundColor: "#F8F9F9", marginLeft: 3, marginRight: 3 }}>
                <FormGroup style={{ padding: 10, width: 200 }}>
                    <Label for="exampleSelect">Catégorie:</Label>
                    <Row style={{ display: "flex", flexDirection: "row", marginLeft: 1 }}>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => { setCatName(e.target.value); setSelectedCatName(true) }} className='inputSell' >
                            <option>-Choisir une catégorie</option>
                            <option>Se déplacer</option>
                            <option>S'habiller</option>
                            <option>Dormir</option>
                            <option>Manger</option>
                            <option>Se baigner</option>
                        </Input>
                    </Row>
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 200 }}>
                    <Label for="exampleSelect">Produit:</Label>
                    {InputSubCat}
                </FormGroup>

                <FormGroup style={{ padding: 10, width: 200 }}>
                    <Label for="exampleEmail">Marque:</Label>
                    <Input type="text" name="brand" id="exampleBrand" placeholder="Marque du produit" onChange={(e) => setBrand(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 200 }}>
                    <Label for="exampleSelect">État du produit:</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => { setSelectedValueState(e.target.value); setSelectedCatName(true); setState(e.target.value) }}>
                        <option>-Choisir un état</option>
                        <option>Neuf</option>
                        <option>Bon état</option>
                        <option>Etat d'usage</option>
                    </Input>
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 200 }}>
                    <Label for="exampleEmail">Prix:</Label>
                    <Input type="text" name="brand" id="exampleBrand" placeholder="10€" onChange={(e) => setPrice(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 800, display:"flex", flexDirection:"row" }}>
                    <Label for="exampleEmail" style={{width:300}}>Insérer l'image (url):</Label>
                    <Input type="text" name="name" id="exampleBrand" placeholder="" onChange={(e) => setUrl(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 800, display:"flex", flexDirection:"row" }}>
                    <Label for="exampleEmail" style={{width:300}}>Nom de l'article:</Label>
                    <Input type="text" name="name" id="exampleBrand" placeholder="ex: Poussette" onChange={(e) => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ padding: 10, width: 1000 }} >
                    <Label for="exampleText">Description du produit</Label>
                    <Input style={{ height: 200 }} type="textarea" name="text" id="exampleText"  onChange={(e) => setDesc(e.target.value)} />
                </FormGroup>
            </Row>
            <Row style={{ marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 50 }}>
                <Button style={{ fontSize: 15, color: "white", backgroundColor: "#16bfc4", border: "none" }} onClick={() => { handleClick(); setIsValidated(true) }}>Valider</Button>
            </Row>
        </Container>

    )
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(SellScreen);