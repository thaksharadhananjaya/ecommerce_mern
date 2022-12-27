import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategories } from '../../actions/category_action';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import Input from '../../components/input';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const [showAddModel, setShowAddModel] = useState(false);
  const [name, setCatName] = useState();
  const [parentID, setParID] = useState();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleClose = () => setShowAddModel(false);
  const handleShow = () => setShowAddModel(true);

  const addNewCategory = () => {
    const category = {
      name,
      parentID
    }
    console.log(category);
    setCatName();
    setParID();
    dispatch(addCategory(category));
  }

  function createCatList(categoriesList) {

    const finalCat = [];
    for (let cat of categoriesList) {
      finalCat.push(
        <li key={cat._id}>
          {cat.name}
          {cat.children.length > 0 ? <ul>{createCatList(cat.children)}</ul> : null}
        </li>
      );
    }
    return finalCat;
  }

  function createSelectCatList(categories, options = []) {
    for (let category of categories) {
      options.push(
        <option key={category._id} value={category._id}>
          {category.name}
        </option>);
      if (category.children.length > 0) {
        createSelectCatList(category.children, options);
      }
    }

    return options.sort();
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={12}>
            <div className='title' >
              <h2>Category</h2>
              <Button onClick={handleShow}>Add</Button>
            </div>

          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {categories.categories != null ? createCatList(categories.categories) : null}
            </ul>
          </Col>
        </Row>
      </Container>


      <Modal show={showAddModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Input
            type="text"
            controlId="catName"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setCatName(e.target.value)}
          />

          <select onChange={(e)=> setParID(e.target.value)}>
            <option >Select parent category</option>
            {categories.categories != null ? createSelectCatList(categories.categories) : null}
          </select>

        </Form.Group>
        <Modal.Footer>

          <Button variant="primary"  onClick={addNewCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>


    </Layout>
  )
}


const Container = styled.div`
    .title{
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      margin-bottom: 16px
    }
`;
