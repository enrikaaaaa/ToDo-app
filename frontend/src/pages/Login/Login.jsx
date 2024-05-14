import { ErrorMessage, Field, Form, Formik } from 'formik';

import Button from '../../components/Button/Button';
import { ROUTES } from '../../routes/consts';
import TextField from '@mui/material/TextField';
import { fetchUsers } from '../../api/users';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('values', values);
      const users = await fetchUsers();
      const user = users.find((user) => user.Email === values.email);

      console.log('users data', users);

      if (!user) {
        alert('User not found');
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      navigate(ROUTES.TASKS);
      window.location.reload(ROUTES.TASKS);
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
              name="email"
              as={TextField}
              className={styles.fullWidthTextField}
              label="Email"
              type="email"
              fullWidth
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorText}
            />
            <Field
              name="password"
              as={TextField}
              className={styles.fullWidthTextField}
              label="Password"
              type="password"
              fullWidth
            />
            <ErrorMessage
              name="password"
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
