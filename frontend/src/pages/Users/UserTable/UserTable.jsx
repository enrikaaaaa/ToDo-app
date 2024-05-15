import { Table, TableBody } from '@mui/material';
import { TableCell, TableRow } from '@mui/material';

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
      id: userToEdit._id,
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
      setModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Table className={styles.UserTable}>
        <TableBody>
        <TableRow className={styles.UserTableHeader}>
            <TableCell className={styles.tableCell}>Name</TableCell>
            <TableCell className={styles.tableCell}>L.Name</TableCell>
            <TableCell className={styles.tableCell}>Password</TableCell>
            <TableCell className={styles.tableCell}>Email</TableCell>
            <TableCell className={styles.tableCell}>Role</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
            <TableCell className={styles.tableCell}>Actions</TableCell>
          </TableRow>

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
