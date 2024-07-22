import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import axios from "axios";
// import RechercheForm from "../../components/RechercheForm";

const Books = () => {
    const [Books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [viewingBook, setViewingBook] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        author: '',
        description: '',
        edition: '',
        purchase_price: '',
        is_for_sale: false,
    });

    useEffect(() => {
        displayBooks();
    }, []); // Sans les crochets ça tourne en boucle

    const displayBooks = async () => {
        await axios.get("http://127.0.0.1:8000/api/books").then((res) => {
            setBooks(res.data);
        });
    };

    const deleteBook = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/books/${id}`).then(displayBooks);
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
        setFormValues({
            title: book.title,
            author: book.author,
            description: book.description,
            edition: book.edition,
            purchase_price: book.purchase_price,
            is_for_sale: book.is_for_sale,
        });
        setShowModal(true);
    };

    const handleViewClick = (book) => {
        setViewingBook(book);
        setShowViewModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const saveBook = () => {
        axios.put(`http://127.0.0.1:8000/api/books/${editingBook.id}`, formValues)
            .then(() => {
                setShowModal(false);
                setEditingBook(null);
                displayBooks();
            });
    };

    return (
        <div>
            {/* <RechercheForm/> */}
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom du livre</th>
                            <th>Auteur du livre</th>
                            <th>En vente</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Books.map((Book) => (
                            <tr key={Book.id}>
                                <td>{Book.title}</td>
                                <td>{Book.author}</td>
                                <td>{Book.is_for_sale ? "Oui" : "Non"}</td>
                                <td>
                                    <span className="m-1">
                                        <Button
                                            variant="success"
                                            onClick={() => {
                                                handleViewClick(Book);
                                            }}
                                        >
                                            Voir
                                        </Button>
                                    </span>

                                    <span className="m-1">
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleEditClick(Book);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </span>

                                    <span className="m-1">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                deleteBook(Book.id);
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

                {/* Modal for viewing book details */}
                <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Détails du livre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {viewingBook && (
                            <div>
                                <p><strong>Nom du livre:</strong> {viewingBook.title}</p>
                                <p><strong>Auteur du livre:</strong> {viewingBook.author}</p>
                                <p><strong>description du livre:</strong> {viewingBook.description}</p>
                                <p><strong>Edition du livre:</strong> {viewingBook.edition}</p>
                                <p className="bg-warning"><strong>Prix d'achat:</strong> {viewingBook.purchase_price}</p>
                                <p><strong>En vente:</strong> {viewingBook.is_for_sale ? "Oui" : "Non"}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* Modal for editing book details */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Éditer le livre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nom du livre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Auteur du livre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="author"
                                    value={formValues.author}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description du livre</Form.Label>
                                <Form.Control
                                    as="textarea" rows={4}
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Edition du livre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="edition"
                                    value={formValues.edition}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Prix d'achat</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="purchase_price"
                                    value={formValues.purchase_price}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="En vente"
                                    name="is_for_sale"
                                    checked={formValues.is_for_sale}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={saveBook}>
                            Sauvegarder
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Books;
