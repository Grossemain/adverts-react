import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ResultatCard from './ResultatCard';

import React, { useState } from 'react';


const RechercheForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(results.values);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Mettre à jour l'état hasSearched à vrai pour indiquer qu'une recherche a été effectuée
    setHasSearched(true);

    // Renseigner l'url de l'api
    const apiUrl = `http://127.0.0.1:8000/api/books/search?search=${searchQuery}`;
    console.log(results);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchQuery })
      });

      const data = await response.json();
      setResults(data);

    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }

  };

  return (
    <Container fluid="md">
      <section className="Recherche">
        <div className="col-12 col-md-8 mx-auto hero-content">
          <div className="text-dark text-center mb-5">
            {/* <p className="display-5 mb-4 mb-md-2">Rechercher un livre</p> */}
          </div>
          <div className="main-search-bar rounded-pill bg-white ">
            <Form onSubmit={handleFormSubmit} >
              <Row className="align-items-center d-flex justify-content-between">
                <Col className="d-flex justify-content-start">
                  <div className="border-end flex-grow-1 d-flex ps-3 d-flex align-items-center">
                    <Form.Control
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Rechercher un livre"
                      className=" mr-sm-2 rounded-pill border-0 "
                    />
                  </div>
                </Col>
                
                <Col className="d-flex justify-content-end">
                  <Button className="search-btn rounded-pill btn border-white border-5 py-2 px-3" type="submit">Rechercher</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </section>
      <section className="Resultat">
        <Container fluid="md">
          <Row>
            <Col>
              {results.length > 0 ? (
                <div className= "row row-cols-1 row-cols-md-3 g-4 m-3 rounded-3 mt-4">
                  {results.map((book, index) => (
                    <ResultatCard key={index} book={book}/>
                  ))}
                </div>
              ) : (
                hasSearched && <p>Aucun résultat trouvé</p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Container >
  );
}

export default RechercheForm;