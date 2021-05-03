import React from 'react';
import { Modal as ModalBootstrap, ModalProps } from 'react-bootstrap';
import styled from '@emotion/styled';
import { Box, H4 } from '../index';

interface Props extends ModalProps {
  title: string;
  visible: boolean;
  width: string;
  handleClose: () => void;
  className: string;
}

export function Modal(props: Props) {
  const { title, handleClose, width, visible, className, children } = props;
  return (
    <ModalStyled
      show={visible}
      onHide={handleClose}
      width={width}
      className={className}
    >
      <Box boxShadow="element" borderRadius="5px" bg="northeastSnow">
        <ModalBootstrap.Header closeButton className="mb-1">
          <H4>{title}</H4>
        </ModalBootstrap.Header>
        <ModalBody>{children}</ModalBody>
      </Box>
    </ModalStyled>
  );
}

const ModalStyled = styled(ModalBootstrap)`
  .modal-dialog {
    max-width: ${props => props.width};
    width: ${props => props.width};
  }

  .modal-header {
    border: 0;
    padding: 30px 30px 0;
  }

  .close,
  .close:not(:disabled):not(.disabled):hover,
  .close:not(:disabled):not(.disabled):focus {
    opacity: 1;
  }
`;

export const ModalBody = styled(ModalBootstrap.Body)<any>`
  padding: 0 30px 30px;
`;
