import { createUser, deleteUser, fetchUsers } from '../../api/users';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableContainer from '@mui/material/TableContainer';
import UserModal from '../../components/UserModal/UserModal';
import UserTable from '../../components/UserTable/UserTable';
import styles from './Users.module.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
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
    <div className={styles.usersContainer}>
      <h1 className={styles.title}>All Users</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <UserTable users={users} handleDeleteUser={handleDeleteUser} />
          <Button
        variant="contained"
        startIcon={<PersonAddIcon />}
        onClick={handleOpenModal}
        className={styles.addButton}
      >
        Add User
      </Button>
        </TableContainer>
        
      )}
     
      <UserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Users;
