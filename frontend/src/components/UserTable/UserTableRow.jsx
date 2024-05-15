import { Button, TableCell, TableRow } from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import styles from './UserTable.module.scss';

const UserTableRow = ({ user, handleEditUser, handleDeleteUser }) => {
  return (
    <TableRow key={user._id} className={styles.TableRow}>
      <TableCell className={styles.TableData}>{user.Name}</TableCell>
      <TableCell className={styles.TableData}>{user.LastName}</TableCell>
      <TableCell className={styles.TableData}>{user.Password}</TableCell>
      <TableCell className={styles.TableData}>{user.Email}</TableCell>
      <TableCell className={styles.TableData}>{user.Role}</TableCell>
      <TableCell className={styles.TableData}>{user.Position}</TableCell>
      <TableCell className={styles.TableData}>
        <Button onClick={() => handleEditUser(user._id)}>
          <EditIcon className={styles.editIcon} />
        </Button>
        <Button onClick={() => handleDeleteUser(user._id)}>
          <DeleteOutlineIcon className={styles.redIcon} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

export default UserTableRow;
