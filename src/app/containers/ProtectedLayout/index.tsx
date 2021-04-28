import React from 'react';

import { Box } from 'app/components';
import { Header } from 'app/components/Header';

export function ProtectedLayout(props) {
  const { children } = props;
  return (
    <div>
      <Header />
      <Box mx="50px">{children}</Box>
    </div>
  );
}
