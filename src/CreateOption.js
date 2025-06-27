import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';




const CreateOption = (props) => {

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [prise, setPrise] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    // console.log({name,brand,prise,createdAt})
    const itemStructure = { Name: name, Brand: brand, Price: prise, CreatedAt: createdAt }
    await fetch(props.API_URL, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(itemStructure),
    })

    navigate('/');
  }



  return (
    <Container className='mt-4'>
      <Row>
        <Col>
        </Col>
        <Col>
          <h2 className='text-center'>Create a product</h2>

          <Form style={{ width: '380px' }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control required value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control value={brand} onChange={(e) => setBrand(e.target.value)} type="brand" placeholder="Enter Brand" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prise</Form.Label>
              <Form.Control value={prise} onChange={(e) => setPrise(e.target.value)} type="prise" placeholder="Enter Prise" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Created At</Form.Label>
              <Form.Control value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} type="date" placeholder="Enter Date of Creation" />
            </Form.Group>
          </Form>

          <Button variant="dark" size='sm' className="me-3 px-3" onClick={(e) => handleSubmit(e)} >Submit</Button>
          <Button variant="outline-dark" size='sm' className="me-3 px-3" onClick={() => props.showProduct()}>Cancel</Button>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateOption