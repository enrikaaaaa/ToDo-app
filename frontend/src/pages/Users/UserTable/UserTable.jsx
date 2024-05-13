import { Table, TableBody } from '@mui/material';

import PropTypes from 'prop-types';
import UserEditModal from './UserEditModal';
import UserTableForm from './UserTableForm';
import UserTableRow from './UserTableRow';
import styles from './UserTable.module.scss';
import { updateUser } from '../../../api/users';
import { useState } from 'react';

const UserTable = ({ users, handleDeleteUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    Name: '',
    LastName: '',
    Password: '',
    Email: '',
    Role: '',
    Position: '',
  });

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    const editedUser = {
      Name: userToEdit.Name || '',
      LastName: userToEdit.LastName || '',
      Password: userToEdit.Password || '',
      Email: userToEdit.Email || '',
      Role: userToEdit.Role || '',
      Position: userToEdit.Position || '',
    };
    setEditedUser(editedUser);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateUser(editedUser.id, editedUser);
      console.log('User data updated successfully:', updateUser);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data. Please try again later.');
    }
  };

  return (
    <div>
      <Table className={styles.UserTable}>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user._id}
              user={user}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </TableBody>
      </Table>
      <UserEditModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
      >
        <h2>Edit User</h2>
        <UserTableForm editedUser={editedUser} handleChange={handleChange} />
      </UserEditModal>
    </div>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

export default UserTable;
