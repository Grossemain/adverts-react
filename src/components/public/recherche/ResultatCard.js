import React from 'react';
import Card from 'react-bootstrap/Card';

const ResultatCard = ({ book }) => {
    return (
        <Card className="md-6">
                      <Card.Body>
                        <Card.Title><h2>{book.title}</h2></Card.Title> 
                        <Card.Text><h3>{book.author}</h3></Card.Text>
                        <Card.Text><strong>{book.edition}</strong></Card.Text>
                        <Card.Text><em>{book.description}</em></Card.Text>
                        <Card.Text><span className='bg-warning rounded-pill p-2'>{book.purchase_price}</span></Card.Text>
                        <Card.Text><span>A vendre :{book.is_for_sale ? "Oui" : "Non"}</span></Card.Text>
                      </Card.Body>
                    </Card>
    );
};
export default ResultatCard;