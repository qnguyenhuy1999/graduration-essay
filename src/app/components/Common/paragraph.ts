import styled from '@emotion/styled';
import { ColorProps, SpaceProps, variant } from 'styled-system';

type BaseParagraphProps = ColorProps & SpaceProps;

const P = styled.p<BaseParagraphProps>`
  ${variant({
    prop: 'variant',
    variants: {
      body: {
        fontWeight: 'regular',
      },
      bodyBold: {
        fontWeight: 'bold',
      },
      bodyItalic: {
        fontStyle: 'italic',
      },
      small: {
        fontSize: 'small',
        fontWeight: 'regular',
      },
      smallBold: {
        fontSize: 'small',
        fontWeight: 'bold',
      },
    },
  })}
`;

const Span = styled.span<BaseParagraphProps>`
  ${variant({
    prop: 'variant',
    variants: {
      body: {
        fontWeight: 'regular',
      },
      bodyBold: {
        fontWeight: 'bold',
      },
      bodyItalic: {
        fontStyle: 'italic',
      },
      small: {
        fontSize: 'small',
        fontWeight: 'regular',
      },
      smallBold: {
        fontSize: 'small',
        fontWeight: 'bold',
      },
    },
  })}
`;

export { P, Span };
