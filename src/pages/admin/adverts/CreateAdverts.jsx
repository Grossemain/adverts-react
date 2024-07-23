import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateAdvert = () => {
    const navigate = useNavigate();

    const [advert_name, setAdvert_name] = useState("");
    const [img, setImg] = useState("");
    const [advert_description, setAdvert_description] = useState("");
    const [selling_price, setSelling_price] = useState("");

    const [validationError, setValidationError] = useState({});


    //Fonction d'ajout d'annonce
    const addAdvert = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("advert_name", advert_name);
        formData.append("img", img);
        formData.append("advert_description", advert_description);
        formData.append("selling_price",selling_price);
      

        //remplace le console.log pour voir les resultats d'un tableau
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        await axios
            .post(`http://127.0.0.1:8000/api/adverts`, formData)
            .then(navigate('/adverts'))
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                }
            });
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Ajout d'un nouveau livre</h4>
                                <hr />
                                <div className="form-wrapper">
                                    {Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {Object.entries(validationError).map(
                                                            ([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Form onSubmit={addAdvert}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="advert_name">
                                                    <Form.Label>Nom de l'annonce</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="advert_name"
                                                        value={advert_name}
                                                        onChange={(event) => {
                                                            setAdvert_name(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="img">
                                                    <Form.Label>image</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="img"
                                                        value={img}
                                                        onChange={(event) => {
                                                            setImg(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="advert_description">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control
                                                        as="textarea" rows={4}
                                                        name="advert_description"
                                                        value={advert_description}
                                                        onChange={(event) => {
                                                            setAdvert_description(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="selling_price">
                                                    <Form.Label>Prix d'achat</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="selling_price"
                                                        value={selling_price}
                                                        onChange={(event) => {
                                                            setSelling_price(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        
                                        <Button
                                            variant="primary"
                                            className="mt-2"
                                            size="lg"
                                            block="block"
                                            type="submit"
                                        >
                                            Créer
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default CreateAdvert;