/**
 *
 * Profile
 *
 */

import React, { Dispatch } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { profileSaga } from './saga';
import { ProtectedLayout } from '../ProtectedLayout';
import { ProfileLayout } from './components/ProfileLayout';
import { UpdateProfileFormValues } from 'types/profile';
import {
  Button,
  FormControl,
  FormFieldError,
  FormGroup,
  FormLabel,
  H3,
} from 'app/components';
import { selectAuth } from '../Auth/selectors';
import { UserInfo } from 'types/auth';

interface Props {
  dispatch: Dispatch<any>;
  authInfo: UserInfo | null;
}

interface FormProps extends FormikProps<UpdateProfileFormValues> {}

function UpdateProfileForm(props: Props & FormProps) {
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
        <FormLabel htmlFor="name">Full Name</FormLabel>
        <FormControl
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        <FormFieldError name="name" />
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
        <FormFieldError name="age" />
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
        <FormFieldError name="sex" />
      </FormGroup>

      <Button variant="primary" type="submit" disabled={!(dirty && isValid)}>
        Update
      </Button>
    </form>
  );
}

const UpdateProfileFormik = withFormik<Props, UpdateProfileFormValues>({
  mapPropsToValues: ({ authInfo }) => ({
    name: authInfo?.name || '',
    age: authInfo?.age || 0,
    sex: authInfo?.sex || 0,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    sex: Yup.number().required(),
    age: Yup.number().required(),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch } = props;
    dispatch(actions.changeProfileInfo(values));
  },
})(UpdateProfileForm);

export function Profile() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profileSaga });

  const { authInfo } = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Update Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <ProfileLayout>
        <H3 mb="xl">Update profile</H3>
        <UpdateProfileFormik dispatch={dispatch} authInfo={authInfo || null} />
      </ProfileLayout>
    </ProtectedLayout>
  );
}
