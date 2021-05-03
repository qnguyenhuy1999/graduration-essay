import React, { Dispatch } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import {
  Button,
  FormControl,
  FormFieldError,
  FormGroup,
  FormLabel,
  Modal,
} from 'app/components';
import { CreateSlideFormValues } from 'types/slide';
import { actions } from '../../slice';

interface Props {
  visible: boolean;
  handleClose: () => void;
}

interface FormFormikProps {
  handleClose: () => void;
  dispatch: Dispatch<any>;
}

interface FormProps
  extends FormikProps<CreateSlideFormValues>,
    FormFormikProps {}

export function ModalCreateSlide(props: Props) {
  const { visible, handleClose } = props;
  const dispatch = useDispatch();

  return (
    <Modal
      title="Create new slide"
      visible={visible}
      width="450px"
      handleClose={handleClose}
      className="modal-center"
    >
      <FormCreateSlideFormik handleClose={handleClose} dispatch={dispatch} />
    </Modal>
  );
}

const FormCreateSlide = (props: FormProps) => {
  const {
    handleClose,
    handleSubmit,
    handleChange,
    handleBlur,
    dirty,
    isValid,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormControl
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFieldError name="name" />
      </FormGroup>

      <Button
        type="submit"
        variant="primary"
        disabled={!(dirty || isValid)}
        mr="s"
      >
        Create
      </Button>
      <Button type="button" variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </form>
  );
};

const FormCreateSlideFormik = withFormik<
  FormFormikProps,
  CreateSlideFormValues
>({
  isInitialValid: false,
  mapPropsToValues: () => ({
    name: '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch } = props;
    dispatch(actions.createSlide({ ...values }));
  },
})(FormCreateSlide);
