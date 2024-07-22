import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
// import RechercheForm from "../../components/RechercheForm";

const Adverts = () => {
    const [Adverts, setAdverts] = useState([]);
    const [editingAdvert, setEditingAdvert] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [viewingAdvert, setViewingAdvert] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [formValues, setFormValues] = useState({
        advert_name: '',
        img: '',
        advert_description: '',
        selling_price: '',
    });

    useEffect(() => {
        displayAdverts();
    }, []); // Sans les crochets ça tourne en boucle

    const displayAdverts = async () => {
        await axios.get("http://127.0.0.1:8000/api/adverts").then((res) => {
            setAdverts(res.data);
        });
    };

    const deleteAdvert = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/adverts/${id}`).then(displayAdverts);
    };

    const handleEditClick = (Advert) => {
        setEditingAdvert(Advert);
        setFormValues({
            advert_name: Advert.advert_name,
            img: Advert.img,
            advert_description: Advert.advert_description,
            selling_price: Advert.selling_price,
        });
        setShowModal(true);
    };

    const handleViewClick = (Advert) => {
        setViewingAdvert(Advert);
        setShowViewModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const saveAdvert = () => {
        axios.put(`http://127.0.0.1:8000/api/adverts/${editingAdvert.id}`, formValues)
            .then(() => {
                setShowModal(false);
                setEditingAdvert(null);
                displayAdverts();
            });
    };

    return (
        <div>
            {/* <RechercheForm/> */}
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom de l'annonce</th>
                            <th>image</th>
                            {/* <th>Description</th> */}
                            <th>Prix de vente</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Adverts.map((Advert) => (
                            <tr key={Advert.id}>
                                <td>{Advert.advert_name}</td>
                                <td>{Advert.img}</td>
                                {/* <td>{Advert.advert_description}</td> */}
                                <td>{Advert.selling_price}</td>
                                <td>
                                    <span className="m-1">
                                        <Button
                                            variant="success"
                                            onClick={() => {
                                                handleViewClick(Advert);
                                            }}
                                        >
                                            Voir
                                        </Button>
                                    </span>

                                    <span className="m-1">
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleEditClick(Advert);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </span>

                                    <span className="m-1">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                deleteAdvert(Advert.id);
                                            }}
                                        >
                                            Supprimer
                                        </Button>
                                    </span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for viewing Advert details */}
                <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Détails de l'annonce</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {viewingAdvert && (
                            <div>
                                <p><strong>Nom de l'annonce:</strong> {viewingAdvert.advert_name}</p>
                                <p><strong>image :</strong> {viewingAdvert.img}</p>
                                <p><strong>description:</strong> {viewingAdvert.advert_description}</p>
                                <p className="bg-success"><strong>Prix de vente:</strong> {viewingAdvert.selling_price}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* Modal for editing Advert details */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Éditer l'annonce'</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nom de l'annonce</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="advert_name"
                                    value={formValues.advert_name}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="img"
                                    value={formValues.img}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    name="advert_description"
                                    value={formValues.advert_description}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Prix de vente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="selling_price"
                                    value={formValues.selling_price}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={saveAdvert}>
                            Sauvegarder
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Adverts;
