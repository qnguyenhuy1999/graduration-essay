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
  infoModalCUSlide: any;
  handleClose: () => void;
}

interface FormFormikProps {
  handleClose: () => void;
  dispatch: Dispatch<any>;
  data: any;
}

interface FormProps
  extends FormikProps<CreateSlideFormValues>,
    FormFormikProps {}

export function ModalCreateSlide(props: Props) {
  const { infoModalCUSlide, handleClose } = props;
  const dispatch = useDispatch();

  return (
    <Modal
      title={
        infoModalCUSlide?.data?.id
          ? `Edit ${infoModalCUSlide?.data?.name}`
          : 'Create new slide'
      }
      visible={infoModalCUSlide?.isVisible}
      width="450px"
      handleClose={handleClose}
      className="modal-center"
    >
      <FormCreateSlideFormik
        data={infoModalCUSlide?.data}
        handleClose={handleClose}
        dispatch={dispatch}
      />
    </Modal>
  );
}

const FormCreateSlide = (props: FormProps) => {
  const {
    values,
    data,
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
          value={values.name}
        />
        <FormFieldError name="name" />
      </FormGroup>

      <Button
        type="submit"
        variant="primary"
        disabled={!(dirty || isValid)}
        mr="s"
      >
        {data?.id ? 'Update' : 'Create'}
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
  mapPropsToValues: ({ data }) => ({
    name: data?.name || '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch, data } = props;
    if (data) {
      dispatch(actions.updateSlide({ ...values, id: data.id }));
    } else {
      dispatch(actions.createSlide({ ...values }));
    }
  },
})(FormCreateSlide);
