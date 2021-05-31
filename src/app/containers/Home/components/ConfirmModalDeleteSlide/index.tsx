import React from 'react';

import { Button, Modal, Span } from 'app/components';

interface Props {
  isVisible: boolean;
  handleClose: () => void;
  handleAccept: () => void;
}

export function ConfirmModalDeleteSlide(props: Props) {
  const { isVisible, handleClose, handleAccept } = props;
  return (
    <Modal
      title="Are you sure?"
      visible={isVisible}
      width="450px"
      handleClose={handleClose}
      className="modal-center"
    >
      <Span>Do you want to remove this slide?</Span>
      <div className="mt-3">
        <Button variant="primary" mr="m" onClick={handleAccept}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
