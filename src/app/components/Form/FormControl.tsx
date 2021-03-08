import React from 'react';
import styled from '@emotion/styled';
import { Form } from 'react-bootstrap';
import { ErrorMessage, ErrorMessageProps } from 'formik';
import {
  color,
  space,
  display,
  layout,
  DisplayProps,
  border,
  SpaceProps,
  ColorProps,
} from 'styled-system';

const FormControl = styled(Form.Control)<DisplayProps & any>`
  border-radius: 3px;
  margin-bottom: 7px;
  height: 40px;
  background-color: ${props =>
    props.readOnly && props.theme.colors.northeastSnow} !important;
  color: ${p => p.readOnly && 'hsl(0,0%,60%)'} !important;
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: ${p => p.readOnly && p.theme.colors.silver};
  }
  font-family: ${p => p.theme.fonts.secondary};
  border: 1px solid
    ${props => (props.border ? props.border : props.theme.colors.silver)};
  border-color: ${props => props.readOnly && props.theme.colors.silver};
  background-image: none !important;
  box-shadow: none !important;
  border-color: ${props =>
    props.successValidation && props.theme.colors.amazon};
  ${color};
  ${space};
  ${display};
  ${layout};
  ${border};
`;

const ErrorMessageWrapper = function (props: ErrorMessageProps) {
  return <ErrorMessage component="span" {...props} />;
};

const FormFieldError = styled(ErrorMessageWrapper)<SpaceProps & ColorProps>`
  margin-top: 5px;
  color: ${props =>
    props.color ? props.color : props.theme.colors.redPigment} !important;
  ${color};
  ${space};
`;

export { FormControl, FormFieldError };
