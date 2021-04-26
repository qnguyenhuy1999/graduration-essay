import React from 'react';
import styled from '@emotion/styled';

import { Flex, H4 } from '../Common';
import { NavLink, Link } from '../Link';
import theme from 'styles/theme';

const activeLink = {
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.primaryBlue,
};

export const Header = () => {
  return (
    <CustomHeader alignItems="center" justifyContent="space-between">
      <H4 mb="0">
        <Link to="/" color="primaryBlue">
          Slide Presentation
        </Link>
      </H4>
      <Flex alignItems="center">
        <NavLink exact to="/editor" mr="s" activeStyle={activeLink}>
          Route editor
        </NavLink>
        <NavLink to="/presentation" activeStyle={activeLink}>
          Presentation
        </NavLink>
      </Flex>
    </CustomHeader>
  );
};

const CustomHeader = styled(Flex)<any>`
  box-shadow: ${p => p.theme.shadows.hoverElement};
  padding: ${p => p.theme.space.m};
`;
