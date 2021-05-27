import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import theme from 'styles/theme';

import { Box, Flex, H4, Span } from '../Common';
import { NavLink, Link } from '../Link';
import { selectAuth } from '../../containers/Auth/selectors';
import { actions } from '../../containers/Auth/slice';
import { DropDown } from 'app/components';

const activeLink = {
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.primaryBlue,
};

export const Header = () => {
  const { slideId } = useParams<{ slideId: string }>();
  const { authInfo } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem('sp_token', '');
    dispatch(actions.doLogout());
  };

  const items = [
    {
      title: 'Logout',
      action: logout,
    },
  ];

  return (
    <CustomHeader>
      <Flex alignItems="center" justifyContent="space-between" mx="50px">
        <H4 mb="0">
          <Link to="/" color="primaryBlue">
            Slide Presentation
          </Link>
        </H4>
        <Flex alignItems="center">
          {slideId && (
            <div className="mr-2">
              <Span variant="body">
                <NavLink
                  exact
                  to={`/slide/${slideId}/editor`}
                  mr="s"
                  activeStyle={activeLink}
                >
                  Route editor
                </NavLink>
              </Span>
              <Span variant="body">
                <NavLink
                  to={`/slide/${slideId}/presentation`}
                  activeStyle={activeLink}
                >
                  Presentation
                </NavLink>
              </Span>
            </div>
          )}
          <DropDown title={authInfo?.name || ''} items={items} />
        </Flex>
      </Flex>
    </CustomHeader>
  );
};

const CustomHeader = styled(Box)<any>`
  box-shadow: ${p => p.theme.shadows.hoverElement};
  padding-top: ${p => p.theme.space.m};
  padding-bottom: ${p => p.theme.space.m};
`;
