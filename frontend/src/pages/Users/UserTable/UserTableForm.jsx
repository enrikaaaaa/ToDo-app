import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const UserTableForm = ({ editedUser, handleChange }) => {
  return (
    <>
      <TextField
        label="Name"
        name="Name"
        value={editedUser.Name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Last Name"
        name="LastName"
        value={editedUser.LastName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Password"
        name="Password"
        value={editedUser.Password}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="Email"
        value={editedUser.Email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Role"
        name="Role"
        value={editedUser.Role}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Position"
        name="Position"
        value={editedUser.Position}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
};

UserTableForm.propTypes = {
  editedUser: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UserTableForm;
