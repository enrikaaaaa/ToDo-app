import { createUser, deleteUser, fetchUsers } from '../../api/users';
import { useEffect, useState } from 'react';

import Button from '../../components/Button/Button';
import UserModal from './UserModal';
import UserTable from './UserTable';
import styled from 'styled-components';

const UsersContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createUser(values);
      resetForm();
      handleCloseModal();
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <UsersContainer>
      <h1>All Users</h1>

      <UserTable users={users} handleDeleteUser={handleDeleteUser} />
      <UserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      <Button onClick={handleOpenModal}>Add New User</Button>
    </UsersContainer>
  );
};

export default Users;
