import styled from '@emotion/styled';
import {
  color,
  space,
  typography,
  position,
  layout,
  flexbox,
  ColorProps,
  SpaceProps,
  compose,
} from 'styled-system';
import { Link as RouterLink } from 'react-router-dom';
import { NavLink as RouterNavLink } from 'react-router-dom';

const Link = styled(RouterLink)<ColorProps & SpaceProps & any>`
  ${compose(color, space, typography, position, flexbox, layout)};

  :hover {
    ${compose(color, space, typography, position, flexbox, layout)};
  }
`;

const NavLink = styled(RouterNavLink)<ColorProps & SpaceProps & any>`
  ${compose(color, space, typography, position, flexbox, layout)};
`;

export { Link, NavLink };
