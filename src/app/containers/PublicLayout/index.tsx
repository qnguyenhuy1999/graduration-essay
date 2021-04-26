import React from 'react';

import { Flex, Box } from 'app/components';
import Illustration from './assets/illustration.jpg';

export function PublicLayout(props) {
  const { children } = props;
  return (
    <Flex alignItems="center" maxHeight="100%">
      <Box width="50%" height="100vh">
        <img src={Illustration} alt="Illustration" />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="white"
        height="100vh"
        px="50px"
        ml="100px"
        py="xxl"
      >
        {children}
      </Flex>
    </Flex>
  );
}
