import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Flex, Link, P } from 'app/components';

const activeStyle = {
  fontWeight: 'bold',
  color: 'primaryBlue',
};

export function ProfileLayout(props) {
  const { children } = props;
  const history = useHistory();
  const { location } = history;

  const isUpdateProfilePage = location.pathname === '/profile';
  const isUpdatePasswordPage = location.pathname === '/profile/update-password';

  return (
    <Flex mt="50px" alignItems="flex-start">
      <Box
        p="l"
        pb="xs"
        boxShadow="hoverElement"
        borderRadius="4px"
        className="d-flex flex-column mr-5"
      >
        <Link to="/profile">
          <P mb="m" style={isUpdateProfilePage ? activeStyle : {}}>
            Update profile
          </P>
        </Link>
        <Link to="/profile/update-password">
          <P style={isUpdatePasswordPage ? activeStyle : {}}>Change password</P>
        </Link>
      </Box>

      <div className="ml-5">{children}</div>
    </Flex>
  );
}
