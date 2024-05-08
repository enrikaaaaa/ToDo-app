import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import styles from './UserForm.module.scss';

const UserForm = ({ handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    Password: Yup.string().required('Password is required'),
    Email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    Role: Yup.string().required('Role is required'),
    Position: Yup.string().required('Position is required'),
  });

  return (
    <Formik
      initialValues={{
        Name: '',
        LastName: '',
        Password: '',
        Email: '',
        Role: '',
        Position: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.inputContainer}>
            <Field type="text" name="Name" placeholder="Name" as={TextField} />
            <ErrorMessage
              name="Name"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="LastName"
              placeholder="Last Name"
              as={TextField}
            />
            <ErrorMessage
              name="LastName"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="Password"
              placeholder="Password"
              as={TextField}
            />
            <ErrorMessage
              name="Password"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="Email"
              placeholder="Email"
              as={TextField}
            />
            <ErrorMessage
              name="Email"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field type="text" name="Role" placeholder="Role" as={TextField} />
            <ErrorMessage
              name="Role"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="Position"
              placeholder="Position"
              as={TextField}
            />
            <ErrorMessage
              name="Position"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default UserForm;
