import * as Yup from 'yup';

import { Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PropTypes from 'prop-types';
import { createUser } from '../../api/users';
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

  const submitForm = async (values, { setSubmitting }) => {
    try {
      const newUser = {
        email: values.Email,
        password: values.Password,
        name: values.Name,
        lastName: values.LastName,
        role: values.Role,
        position: values.Position,
      };
      await createUser(newUser);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

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
      onSubmit={handleSubmit || submitForm}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="Name"
              placeholder="Name"
              as={TextField}
              fullWidth
            />
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
              fullWidth
            />
            <ErrorMessage
              name="LastName"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="password"
              name="Password"
              placeholder="Password"
              as={TextField}
              fullWidth
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
              fullWidth
            />
            <ErrorMessage
              name="Email"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.inputContainer}>
            <Field
              type="text"
              name="Role"
              placeholder="Role"
              as={TextField}
              fullWidth
            />
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
              fullWidth
            />
            <ErrorMessage
              name="Position"
              component="p"
              className={styles.errorMessage}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<PersonAddIcon />}
            className={styles.addButton}
          >
            Add User
          </Button>
        </Form>
      )}
    </Formik>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default UserForm;
