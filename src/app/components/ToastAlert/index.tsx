import React from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

import { IconCircleWrapper, IconWrapper } from '../Icon';
import { Flex, H6, Span } from '../Common';
import { Close, Completed, Warning } from '../Icon/Common';

function ToastSuccess(title: string, message: string, options?: object) {
  return toast(
    <Flex alignItems="flex-start">
      <IconCircleWrapper icon={Completed} />
      <Flex flexDirection="column" mx="m">
        <H6>{title}</H6>
        <Span>{message}</Span>
      </Flex>
    </Flex>,
    options,
  );
}

function ToastError(title: string, message: string, options?: object) {
  return toast(
    <Flex alignItems="flex-start">
      <BorderIconCircle bg="white">
        <IconWrapper icon={Close} fill="redPigment" />
      </BorderIconCircle>
      <Flex flexDirection="column" mx="m" mt="xs">
        <H6>{title}</H6>
        <Span>{message}</Span>
      </Flex>
    </Flex>,
    { ...options, className: 'toast-error' },
  );
}

function ToastWarning(title: string, message: string, options?: object) {
  return toast(
    <Flex alignItems="flex-start">
      <BorderIconCircle bg="primaryBlack">
        <IconWrapper icon={Warning} fill="brightYellowCrayola" />
      </BorderIconCircle>
      <Flex flexDirection="column" mx="m" mt="xs">
        <H6>{title}</H6>
        <Span>{message}</Span>
      </Flex>
    </Flex>,
    { ...options, className: 'toast-warning' },
  );
}

const BorderIconCircle = styled.div<any>`
  padding: 4px 5px 5px;
  border-radius: 50%;
  background: ${p => p.theme.colors[p.bg]};
`;

export { ToastSuccess, ToastError, ToastWarning };
