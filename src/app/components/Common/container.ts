import styled from '@emotion/styled';
import {
  flexbox,
  color,
  space,
  layout,
  position,
  border,
  BorderProps,
  ColorProps,
  SpaceProps,
  FlexboxProps,
  ShadowProps,
  shadow,
  compose,
  system,
  variant,
} from 'styled-system';
import theme from 'styles/theme';

const Box = styled.div<
  ColorProps & SpaceProps & BorderProps & ShadowProps & any
>`
  ${system({
    cursor: {
      property: 'cursor',
      defaultScale: { pointer: 'pointer' },
    },
  })}
  ${variant({
    prop: 'variant',
    variants: {
      default: {
        backgroundColor: `${theme.colors.primaryWhite}`,
        boxShadow: '0px 0px 10px rgba(21, 21, 21, 0.04)',
        borderRadius: '5px',
        border: '1px solid',
        borderColor: `${theme.colors.northeastSnow}`,
      },
    },
  })}
  ${compose(color, space, layout, position, border, shadow, flexbox)};
`;

const Flex = styled(Box)<ColorProps & SpaceProps & FlexboxProps & any>`
  display: flex;
  ${flexbox};
`;

export { Box, Flex };
