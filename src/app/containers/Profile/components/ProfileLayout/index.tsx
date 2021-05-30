import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Flex, Link, P } from 'app/components';
import ToastAlert from 'lib/services/alert.service';
import { actions } from '../../slice';
import { actions as authActions } from 'app/containers/Auth/slice';
import { selectProfile } from '../../selectors';

const activeStyle = {
  fontWeight: 'bold',
  color: 'primaryBlue',
};

export function ProfileLayout(props) {
  const { children } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { location } = history;
  const { changePasswordResult, changeProfileResult, error } = useSelector(
    selectProfile,
  );

  const isUpdateProfilePage = location.pathname === '/profile';
  const isUpdatePasswordPage = location.pathname === '/profile/update-password';

  useEffect(() => {
    if (changePasswordResult) {
      ToastAlert.success('Password successfully updated');
      dispatch(actions.resetStateResult());
    }

    if (changeProfileResult) {
      ToastAlert.success('Profile successfully updated');
      dispatch(authActions.setCurrentUser(changeProfileResult));
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [changePasswordResult, changeProfileResult, dispatch, error]);

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
