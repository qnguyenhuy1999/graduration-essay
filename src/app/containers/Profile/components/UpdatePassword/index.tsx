/**
 *
 * Update Password
 *
 */

import React, { Dispatch } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  Button,
  FormControl,
  FormFieldError,
  FormGroup,
  FormLabel,
  H3,
} from 'app/components';
import { actions, reducer, sliceKey } from '../../slice';
import { profileSaga } from '../../saga';
import { UpdatePasswordFormValues } from 'types/profile';
import { selectAuth } from 'app/containers/Auth/selectors';
import { ProtectedLayout } from 'app/containers/ProtectedLayout';
import { ProfileLayout } from '../ProfileLayout';

interface Props {
  dispatch: Dispatch<any>;
  email: string;
}

interface FormProps extends FormikProps<UpdatePasswordFormValues> {}

function UpdatePasswordForm(props: Props & FormProps) {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    dirty,
    isValid,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
          type="email"
          id="email"
          name="email"
          value={values.email}
          disabled={true}
        />
        <FormFieldError name="email" />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
        <FormControl
          type="password"
          id="oldPassword"
          name="oldPassword"
          autoComplete="current-password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="oldPassword" />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="oldPassword">New Password</FormLabel>
        <FormControl
          type="password"
          id="newPassword"
          name="newPassword"
          autoComplete="current-password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="newPassword" />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <FormControl
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="confirmPassword" />
      </FormGroup>

      <Button variant="primary" type="submit" disabled={!(dirty && isValid)}>
        Change password
      </Button>
    </form>
  );
}

const UpdatePasswordFormik = withFormik<Props, UpdatePasswordFormValues>({
  mapPropsToValues: ({ email }) => ({
    email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "The password doesn't match")
      .required('Confirm password is required'),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch } = props;
    dispatch(actions.changePassword(values));
  },
})(UpdatePasswordForm);

export function UpdatePassword() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profileSaga });

  const dispatch = useDispatch();
  const { authInfo } = useSelector(selectAuth);

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Update Password</title>
        <meta name="description" content="Description of Update Password" />
      </Helmet>

      <ProfileLayout>
        <H3 mb="xl">Update Password</H3>
        <UpdatePasswordFormik
          dispatch={dispatch}
          email={authInfo?.email || ''}
        />
      </ProfileLayout>
    </ProtectedLayout>
  );
}
