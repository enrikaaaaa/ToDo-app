import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import UserForm from '../UserForm/UserForm';
import styles from './UserModal.module.scss';

const UserModal = ({ isModalOpen, handleCloseModal, handleSubmit }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles.modalContent}>
        <h2 id="modal-title">Add New User</h2>
        <UserForm handleSubmit={handleSubmit} />
      </div>
    </Modal>
  );
};

UserModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserModal;
