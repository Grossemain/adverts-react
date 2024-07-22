import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateBook = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [edition, setEdition] = useState("");
    const [purchase_price, setPurchase_price] = useState("");
    const [is_for_sale, setIs_for_sale] = useState("");

    const [validationError, setValidationError] = useState({});


    //Fonction d'ajout de book
    const addBook = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("edition", edition);
        formData.append("purchase_price",purchase_price);
        formData.append("is_for_sale", is_for_sale ? "1":"0");

        //remplace le console.log pour voir les resultats d'un tableau
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        await axios
            .post(`http://127.0.0.1:8000/api/books`, formData)
            .then(navigate('/books'))
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
                                    <Form onSubmit={addBook}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="title">
                                                    <Form.Label>Nom du livre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="title"
                                                        value={title}
                                                        onChange={(event) => {
                                                            setTitle(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="author">
                                                    <Form.Label>Auteur du livre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="author"
                                                        value={author}
                                                        onChange={(event) => {
                                                            setAuthor(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="description">
                                                    <Form.Label>Description du livre</Form.Label>
                                                    <Form.Control
                                                        as="textarea" rows={4}
                                                        name="description"
                                                        value={description}
                                                        onChange={(event) => {
                                                            setDescription(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="edition">
                                                    <Form.Label>Edition du livre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="edition"
                                                        value={edition}
                                                        onChange={(event) => {
                                                            setEdition(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="purchase_price">
                                                    <Form.Label>Prix d'achat</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="purchase_price"
                                                        value={purchase_price}
                                                        onChange={(event) => {
                                                            setPurchase_price(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="is_for_sale">
                                                    <Form.Label>Mettre en vente ?</Form.Label>
                                                        <Form.Check // prettier-ignore
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="oui"
                                                            name="is_for_sale"
                                                            checked={is_for_sale}
                                                            onChange={(event) => {
                                                                setIs_for_sale({
                                                                    is_for_sale: event.target.checked,
                                                                });
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
export default CreateBook;