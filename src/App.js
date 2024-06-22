import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBin6Line, RiEdit2Line ,RiAddLine} from 'react-icons/ri';
import { Container, Form, InputGroup, Table, Button } from 'react-bootstrap';
import data from './Assets/data.json';
import EditModal from './Components/Home/EditModal';
import AddModal from './Components/AddModal';


function App() {
  const [users, setUsers] = useState(data.data); // Initial state from JSON file
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  const filteredData = users.filter(item => {
    const searchTerm = search.toLowerCase();
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    return (
      searchTerm === '' ||
      item.id.toString().includes(searchTerm) ||
      item.first_name.toLowerCase().includes(searchTerm) ||
      item.last_name.toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
    );
  });

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleShowEditModal = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditUser(userToEdit);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditUser({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    });
  };

  const handleSaveEditUser = (updatedUser) => {
    // Find the index of the user to update
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      // Update the user in the users array
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
      setShowEditModal(false);
    }
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  };


  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>User Management Portal</h1>
        <Form className='mb-3 ' style={{display:"flex",gap:10}}> 
          <InputGroup>
            <Form.Control
              placeholder='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" onClick={handleShowAddModal} style={{display:"flex",alignItems:"center",gap:3}}><RiAddLine />User</Button>
        
        </Form>

        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><img src={item.avatar} alt="avatar" /></td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button variant="link" onClick={() => handleShowEditModal(item.id)}><RiEdit2Line /></Button>
                    <Button variant="link" onClick={() => handleDeleteUser(item.id)}><RiDeleteBin6Line /></Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* Edit Modal */}
      <EditModal
        user={editUser}
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleSaveEditUser}
      />
      <AddModal    user={editUser} show={showAddModal}
        handleClose={handleCloseAddModal}
        handleAdd={handleAddUser}
      />
    </div>
  );
}

export default App;
