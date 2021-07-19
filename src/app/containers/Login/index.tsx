/**
 *
 * Login
 *
 */

import React, { Dispatch, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { LoginFormValues } from 'types';
import { actions, reducer, sliceKey } from './slice';
import { actions as authActions } from '../Auth/slice';
import { loginSaga } from './saga';
import {
  Box,
  Button,
  FormControl,
  FormFieldError,
  FormGroup,
  FormLabel,
  H3,
  H5,
  Link,
  Span,
} from 'app/components';
import { PublicLayout } from '../PublicLayout';
import { selectLogin } from './selectors';
import ToastAlert from 'lib/services/alert.service';

interface Props {
  dispatch: Dispatch<any>;
}

interface FormProps extends FormikProps<LoginFormValues> {}

function LoginForm(props: Props & FormProps) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    dispatch,
  } = props;
  const { loginResult, error } = useSelector(selectLogin);

  useEffect(() => {
    if (loginResult) {
      dispatch(authActions.authenticated(loginResult.data));
      localStorage.setItem('sp_token', loginResult?.loginToken);
    }

    if (error) {
      ToastAlert.error(error);
    }

    if (loginResult || error) {
      setSubmitting(false);
    }

    dispatch(actions.resetState());
  }, [dispatch, error, loginResult, setSubmitting]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="email" />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormControl
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="password" />
      </FormGroup>

      <Button
        variant="primary"
        type="submit"
        loading={isSubmitting}
        width="100%"
      >
        Login
      </Button>
    </form>
  );
}

const LoginFormik = withFormik<Props, LoginFormValues>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch } = props;
    dispatch(actions.doLogin({ authInfo: values }));
  },
})(LoginForm);

export function Login() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: loginSaga });

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('sp_token');
    if (token) {
      window.location.reload();
      localStorage.removeItem('sp_token');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <PublicLayout>
        <H3 mt="xxl">Slide Presentation</H3>

        <Box mb="100px">
          <H5 mb="xl">Welcome to Slide Presentation</H5>

          <LoginFormik dispatch={dispatch} />
        </Box>

        <Span variant="body">
          New member?{' '}
          <Link to="/register" color="primaryBlue" fontWeight="bold">
            Signup here
          </Link>
        </Span>
      </PublicLayout>
    </>
  );
}
