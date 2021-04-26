import React from 'react';
import { Box, Span } from 'app/components';

export function Slide(props) {
  const { name } = props;
  return (
    <Box variant="default">
      <Span variant="body" fontWeight="bold" px="s" py="xs">
        {name}
      </Span>
    </Box>
  );
}
