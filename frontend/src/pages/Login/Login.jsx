import { ErrorMessage, Field, Form, Formik } from 'formik';

import Button from '../../components/Button/Button';
import TextField from '@mui/material/TextField';
import { UserContext } from '../../contexts/UserContext';
import { loginUser } from '../../api/users';
import styles from './Login.module.scss';
import { useContext } from 'react';

const LoginForm = () => {
  const { handleLogin } = useContext(UserContext);

  const initialValues = {
    Email: '',
    Password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser(values);
      handleLogin(response);
    } catch (error) {
      alert('Error logging in. Please try again later.');
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.containerLogin}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <Form>
            <h2 className={styles.formTitle}>Login</h2>
            <Field
              name="Email"
              as={TextField}
              className={styles.fullWidthTextField}
              label="Email"
              type="email"
              fullWidth
            />
            <ErrorMessage
              name="Email"
              component="div"
              className={styles.errorText}
            />
            <Field
              name="Password"
              as={TextField}
              className={styles.fullWidthTextField}
              label="Password"
              type="password"
              fullWidth
            />
            <ErrorMessage
              name="Password"
              component="div"
              className={styles.errorText}
            />
            <Button
              type="submit"
              className={styles.loginButton}
              onSubmit={handleSubmit}
            >
              Log In
            </Button>
            <div className={styles.registerContainer}>
              <h5>Not registered? Contact your boss</h5>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default LoginForm;
