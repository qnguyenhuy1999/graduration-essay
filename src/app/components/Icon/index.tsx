import React from 'react';
import styled from '@emotion/styled';

import {
  space,
  layout,
  position,
  typography,
  opacity,
  compose,
  system,
  variant,
} from 'styled-system';

const CommonSizeProps = {
  micro: {
    height: '10px',
    width: '10x',
  },
  tiny: {
    height: '12px',
    width: '12x',
  },
  small: {
    height: '24px',
    width: '24px',
  },
  medium: {
    height: '32px',
    width: '32px',
  },
  large: {
    height: '40px',
    width: '40px',
  },
};

const Wrapper = styled.span<any>`
  ${compose(space, layout, position, typography)};
  svg {
    ${variant({
      prop: 'size',
      variants: CommonSizeProps,
    })}
    ${compose(layout, opacity)},
  }
  path {
    ${system({
      fill: {
        property: 'fill',
        scale: 'colors',
      },
      stroke: {
        property: 'stroke',
        scale: 'colors',
      },
    })}
  }
`;

const CircleWrapper = styled.span`
  ${compose(space, layout, position, typography)};
  svg {
    ${variant({
      prop: 'size',
      variants: CommonSizeProps,
    })}
    ${layout}
  }
  circle {
    ${system({
      fill: {
        property: 'fill',
        scale: 'colors',
      },
    })}
  }
`;

function IconWrapper(props: any) {
  return <Wrapper {...props}>{React.createElement(props.icon)}</Wrapper>;
}

function IconCircleWrapper(props: any) {
  return (
    <CircleWrapper {...props}>{React.createElement(props.icon)}</CircleWrapper>
  );
}

export { IconWrapper, IconCircleWrapper };
