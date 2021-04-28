import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { Box, Flex, H4, Span } from '../Common';
import { NavLink, Link } from '../Link';
import theme from 'styles/theme';

const activeLink = {
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.primaryBlue,
};

export const Header = () => {
  const { slideId } = useParams<{ slideId: string }>();

  return (
    <CustomHeader>
      <Flex alignItems="center" justifyContent="space-between" mx="50px">
        <H4 mb="0">
          <Link to="/" color="primaryBlue">
            Slide Presentation
          </Link>
        </H4>
        {slideId && (
          <Flex alignItems="center">
            <Span variant="body">
              <NavLink exact to="/editor" mr="s" activeStyle={activeLink}>
                Route editor
              </NavLink>
            </Span>
            <Span variant="body">
              <NavLink to="/presentation" activeStyle={activeLink}>
                Presentation
              </NavLink>
            </Span>
          </Flex>
        )}
      </Flex>
    </CustomHeader>
  );
};

const CustomHeader = styled(Box)<any>`
  box-shadow: ${p => p.theme.shadows.hoverElement};
  padding-top: ${p => p.theme.space.m};
  padding-bottom: ${p => p.theme.space.m};
`;
