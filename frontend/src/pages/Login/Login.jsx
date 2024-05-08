import { ErrorMessage, Field, Form, Formik } from 'formik';

import { ROUTES } from '../../routes/consts';
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
      const users = await fetchUsers();
      const user = users.find(
        (user) =>
          user.Email === values.email && user.Password === values.password,
      );
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate(ROUTES.USERS);
      } else {
        alert('User not found or invalid credentials');
      }
    } catch (error) {
      alert('Error logging in: ' + error);
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
              className={styles.fullWidthTextField}
              label="Email"
              type="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorText}
            />
            <Field
              name="password"
              className={styles.fullWidthTextField}
              label="Password"
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorText}
            />
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
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
