import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import CreateOption from './CreateOption';

const API_URL = 'http://localhost:3400/product';


const ContentShow = () => {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [prise, setPrise] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const showProduct = () => {
        setcontent(<ProductDIv
            showCreateForm={showCreateForm}
            name={name}
            setName={setName}
            brand={brand}
            setBrand={setBrand}
            prise={prise}
            setPrise={setPrise}
            createdAt={createdAt}
            setCreatedAt={setCreatedAt} />);
    }

    const showCreateForm = () => {
        setcontent(<CreateOption
            showProduct={showProduct}
            API_URL={API_URL}
            name={name}
            setName={setName}
            brand={brand}
            setBrand={setBrand}
            prise={prise}
            setPrise={setPrise}
            createdAt={createdAt}
            setCreatedAt={setCreatedAt} />)
    }

    const [content, setcontent] = useState(<ProductDIv
         showCreateForm={showCreateForm}
        name={name}
            setName={setName}
            brand={brand}
            setBrand={setBrand}
            prise={prise}
            setPrise={setPrise}
            createdAt={createdAt}
            setCreatedAt={setCreatedAt} /> );



    return (
        <div>
            {content}
        </div>
    )

}

const ProductDIv = (props) => {

    const [product, setProduct] = useState([]);




    const productFetch = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        setProduct((prevItem) => [...prevItem, data]);
        setProduct(data)
    }

    useEffect(() => {
        productFetch()
    })

    const handleDelete = async (id, e) => {


        e.preventDefault()


        await fetch("http://localhost:3400/product/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "Application/json"
            },
        })
    }

    const itemStructure = { Name: props.name, Brand: props.brand, Price: props.prise, CreatedAt: props.createdAt }
    const handleEdit = async (id, e) => {
        e.preventDefault();
        await fetch("http://localhost:3400/product/" + id, {
            mrthod: "PATCH",
            headers: {
                "Content-type": "Application/json"
            },
            // body: JSON.stringify(itemStructure),
        })

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
                      <Form.Control required value={props.name} onChange={(e) => props.setName(e.target.value)} type="name" placeholder="Enter Name" />
                    </Form.Group>
        
                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control value={props.brand} onChange={(e) => props.setBrand(e.target.value)} type="brand" placeholder="Enter Brand" />
                    </Form.Group>
        
                    <Form.Group className="mb-3">
                      <Form.Label>Prise</Form.Label>
                      <Form.Control value={props.prise} onChange={(e) => props.setPrise(e.target.value)} type="prise" placeholder="Enter Prise" />
                    </Form.Group>
        
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Created At</Form.Label>
                      <Form.Control value={props.createdAt} onChange={(e) => props.setCreatedAt(e.target.value)} type="date" placeholder="Enter Date of Creation" />
                    </Form.Group>
                  </Form>
                  <Button variant="outline-dark" size='sm' className="me-3 px-3" onClick={() => props.showProduct()}>Save</Button>
                </Col>
                <Col>
                </Col>
              </Row>
            </Container>
          )

    }



    return (
        <div className="container product-div">
            <Row>
                <Col>
                    <Button onClick={() => props.showCreateForm()} variant="dark" size='sm' className="me-3 px-3">Create</Button>
                    <Button variant="outline-dark" size='sm'>Refresh</Button>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className='mt-3 ms-5 text-center'>

                <Table className='' hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Created At</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            Array.isArray(product) ? (
                                product.map((productItem, index) => (

                                    <tr key={index} >

                                        <td>{index + 1}</td>
                                        <td>{productItem.Name}</td>
                                        <td>{productItem.Brand}</td>
                                        <td>{productItem.Price}</td>
                                        <td>{productItem.CreatedAt}</td>
                                        <td style={{ height: "30px", }}>
                                            <Button onClick={(e) => handleEdit(productItem.id, e)} variant="dark" size='sm' className="me-3 px-3" >Edit</Button>
                                            <Button onClick={(e) => handleDelete(productItem.id, e)} variant="outline-danger" size='sm'>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <h2>Error</h2>
                            )


                        }

                    </tbody>
                </Table>
            </Row>
        </div>
    )


}

export default ContentShow