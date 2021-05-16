import React from 'react';

import { Element } from 'types/element';
import { Box } from 'app/components';

interface Props {
  element: Element;
}

export function PresentationView(props: Props) {
  const { element } = props;

  return (
    <Box
      p="xl"
      bg="primaryWhite"
      height="70vh"
      borderRadius="8px"
      border="5px solid"
      className="overflow-auto"
    >
      <div dangerouslySetInnerHTML={{ __html: element?.html }} />
    </Box>
  );
}
