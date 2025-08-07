import React from "react";
import { Button, Modal } from "react-bootstrap";

const Modal_lg = ({ size, comp, title, show, handleClose }) => {
  if (show) {
    return (
      <Modal
        size={size}
        show={show}
        onHide={handleClose}
        //backdrop="static"
        keyboard={true}
        animation={false}
        // fullscreen={fullscreen}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{comp}</Modal.Body>

      </Modal>
    );
  }

  return null;
};

export default Modal_lg;
