import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import data from "../Assets/data.json"
const AddModal = ({ user,show, handleClose, handleAdd }) => {
  const [newUser, setNewUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSaveNewUser = () => {
    // Generate unique ID based on the length of users array + 1
    const newId = data.data.length + 1;
    const userToAdd = { ...newUser, id: newId.toString() };
    handleAdd(userToAdd);
    handleClose(); // Close the modal after adding
    // Reset the form
    setNewUser({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="avatar"
            value={newUser.avatar}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={newUser.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={newUser.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSaveNewUser}>Add User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
