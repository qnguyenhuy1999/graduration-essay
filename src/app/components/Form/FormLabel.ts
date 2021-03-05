import styled from '@emotion/styled';
import { color, fontWeight, space, SpaceProps } from 'styled-system';

const FormLabel = styled.label<SpaceProps & any>`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  margin-bottom: ${props => props.theme.space.xs};
  color: ${props => props.theme.colors.dimGray};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-family: ${props => props.theme.fonts.secondary};
  text-transform: ${p => (p.isNormal ? 'none' : 'uppercase')};
  ${space};
  ${fontWeight};
  ${color};
`;

export default FormLabel;
