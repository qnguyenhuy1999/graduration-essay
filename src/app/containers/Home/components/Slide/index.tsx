import React from 'react';
import { Box, Link, Span } from 'app/components';

export function Slide(props) {
  const { name, id } = props;
  return (
    <Link to={`/slide/${id}/editor`} mr="m">
      <Box variant="default" p="m">
        <Span variant="body" fontWeight="bold">
          {name}
        </Span>
      </Box>
    </Link>
  );
}
