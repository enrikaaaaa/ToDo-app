import { Button, Modal } from '@mui/material';

import PropTypes from 'prop-types';
import styles from './UserEditModal.module.scss';

const UserEditModal = ({ open, handleClose, handleSubmit, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.modalContent}>
        {children}
        <Button onClick={handleSubmit}>Save Changes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

UserEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserEditModal;
