import PropTypes from 'prop-types';
import styles from './UserTable.module.scss';

const UserTable = ({ users, handleDeleteUser }) => {
  return (
    <table className={styles.UserTable}>
      <thead>
        <tr>
          <th className={styles.TableHeader}>ID</th>
          <th className={styles.TableHeader}>Name</th>
          <th className={styles.TableHeader}>Last Name</th>
          <th className={styles.TableHeader}>Password</th>
          <th className={styles.TableHeader}>Email</th>
          <th className={styles.TableHeader}>Role</th>
          <th className={styles.TableHeader}>Position</th>
          <th className={styles.TableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
            <td className={styles.TableData}>{user._id}</td>
            <td className={styles.TableData}>{user.Name}</td>
            <td className={styles.TableData}>{user.LastName}</td>
            <td className={styles.TableData}>{user.Password}</td>
            <td className={styles.TableData}>{user.Email}</td>
            <td className={styles.TableData}>{user.Role}</td>
            <td className={styles.TableData}>{user.Position}</td>
            <td className={styles.TableData}>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

export default UserTable;
