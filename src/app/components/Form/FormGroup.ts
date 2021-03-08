import { FormGroup as BootstrapFormGroup } from 'react-bootstrap';
import styled from '@emotion/styled';
import { color, space, layout } from 'styled-system';

const FormGroup = styled(BootstrapFormGroup)<any>(
  {
    marginBottom: '20px',
  },
  layout,
  color,
  space,
);

export { FormGroup };
