import React from 'react';
import classNames from 'classnames';

import { Element } from 'types/element';
import { Box } from 'app/components';

interface Props {
  element: Element;
  nextDirection: string;
}

export function PresentationView(props: Props) {
  const { element, nextDirection } = props;

  return (
    <Box
      p="xl"
      bg="primaryWhite"
      height="70vh"
      borderRadius="8px"
      border="5px solid"
      className={classNames('overflow-auto slide-content', nextDirection)}
    >
      <div dangerouslySetInnerHTML={{ __html: element?.html }} />
    </Box>
  );
}
