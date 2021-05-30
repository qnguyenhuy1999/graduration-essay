/**
 *
 * Register
 *
 */

import React, { Dispatch, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectRegister } from './selectors';
import { registerSaga } from './saga';
import {
  Box,
  Button,
  Flex,
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
import { RegisterFormValues } from 'types';
import ToastAlert from 'lib/services/alert.service';

interface Props {
  dispatch: Dispatch<any>;
}

interface FormProps extends FormikProps<RegisterFormValues> {}

function LoginForm(props: FormProps & Props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    dispatch,
    setSubmitting,
    isSubmitting,
  } = props;
  const { registerResult, error } = useSelector(selectRegister);

  useEffect(() => {
    if (registerResult) {
      ToastAlert.success('Register success.');
    }

    if (error) {
      ToastAlert.error(error);
    }

    if (registerResult || error) {
      setSubmitting(false);
    }

    dispatch(actions.resetState());
  }, [dispatch, error, registerResult, setSubmitting]);

  return (
    <form onSubmit={handleSubmit}>
      <Flex alignItems="center">
        <div className="mr-3">
          <FormGroup>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <FormControl
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name ? (
              <FormFieldError name="name" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="age">Age</FormLabel>
            <FormControl
              type="number"
              min="1"
              id="age"
              name="age"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
            />
            {errors.age ? (
              <FormFieldError name="age" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="sex">Gender</FormLabel>
            <FormControl
              as="select"
              id="sex"
              name="sex"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sex}
            >
              <option value="0">Female</option>
              <option value="1">Male</option>
            </FormControl>
            {errors.sex ? (
              <FormFieldError name="sex" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
          </FormGroup>
        </div>

        <div>
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
            {errors.email ? (
              <FormFieldError name="email" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
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
            {errors.password ? (
              <FormFieldError name="password" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirm-password">Retype Password</FormLabel>
            <FormControl
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword ? (
              <FormFieldError name="confirmPassword" />
            ) : (
              <Span variant="body" color="redPigment">
                ""
              </Span>
            )}
          </FormGroup>
        </div>
      </Flex>

      <Button
        variant="primary"
        type="submit"
        width="100%"
        loading={isSubmitting}
      >
        Sign up
      </Button>
    </form>
  );
}

const RegisterFormik = withFormik<Props, RegisterFormValues>({
  mapPropsToValues: () => ({
    email: '',
    name: '',
    sex: 1,
    age: 18,
    password: '',
    confirmPassword: '',
  }),
  mapPropsToErrors: () => ({
    email: '',
    name: '',
    sex: '',
    age: '',
    password: '',
    confirmPassword: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    sex: Yup.number().required(),
    age: Yup.number().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "The password doesn't match")
      .required(),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch } = props;
    const { email, name, sex, age, password } = values;
    dispatch(
      actions.doRegister({ registerInfo: { email, name, sex, age, password } }),
    );
  },
})(LoginForm);

export function Register() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: registerSaga });

  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <PublicLayout>
        <H3 mt="xxl">Slide Presentation</H3>

        <Box mb="100px">
          <H5 mb="xl">Welcome to Slide Presentation</H5>

          <RegisterFormik dispatch={dispatch} />
        </Box>

        <Span variant="body">
          Have an account?{' '}
          <Link to="/login" color="primaryBlue" fontWeight="bold">
            Login here
          </Link>
        </Span>
      </PublicLayout>
    </>
  );
}
