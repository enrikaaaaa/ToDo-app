import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import Button from '@mui/material/Button';
import { ROUTES } from '../../routes/consts';
import TextField from '@mui/material/TextField';
import { fetchUsers } from '../../api/users';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ContainerLogin = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-image: url(./images/bg-1.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const FormContainer = styled.div`
  width: 500px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
`;

const FormTitle = styled.h2`
  font-size: 30px;
  color: #452005;
  font-weight: bold;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  display: block;
  margin-bottom: 40px;
  font-family: 'Pacifico', cursive;
  font-style: normal;
`;

const FullWidthTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
`;

const LoginButton = styled(Button)`
  && {
    display: block;
    width: 100%;
    background-color: rgba(122, 64, 7, 0.4);
    &:hover {
      background-color: rgba(86, 45, 5, 0.7);
    }
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  padding-bottom: 10px;
  text-align: center;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const users = await fetchUsers();
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password,
      );
      if (user) {
        navigate(ROUTES.ORDERS);
      } else {
        alert('User not found or invalid credentials');
      }
    } catch (error) {
      alert('Error logging in: ' + error);
    }
    setSubmitting(false);
  };

  return (
    <ContainerLogin>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormContainer>
          <Form>
            <FormTitle>Login</FormTitle>
            <Field
              name="email"
              as={FullWidthTextField}
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              autoComplete="email"
            />
            <ErrorMessage name="email" component={ErrorText} />
            <Field
              name="password"
              as={FullWidthTextField}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              autoComplete="current-password"
            />
            <ErrorMessage name="password" component={ErrorText} />
            <LoginButton type="submit">Log In</LoginButton>
            <RegisterContainer>
              <h5>Not registered? Contact to your boss</h5>
            </RegisterContainer>
          </Form>
        </FormContainer>
      </Formik>
    </ContainerLogin>
  );
};

export default LoginForm;
