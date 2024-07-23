import React from 'react';
import Card from 'react-bootstrap/Card';

const ResultatCard = ({ advert }) => {
    return (
        <Card className="md-6">
                      <Card.Body>
                        <Card.Title><h2>{advert.advert_name}</h2></Card.Title> 
                        {/* <Card.Text><h3>{book.author}</h3></Card.Text> */}
                        {/* <Card.Text><strong>{book.edition}</strong></Card.Text> */}
                        <Card.Text><em>{advert.advert_description}</em></Card.Text>
                        <Card.Text><span className='bg-warning rounded-pill p-2'>{advert.selling_price}</span></Card.Text>
                        {/* <Card.Text><span>A vendre :{book.is_for_sale ? "Oui" : "Non"}</span></Card.Text> */}
                      </Card.Body>
                    </Card>
    );
};
export default ResultatCard;