import { Modal, Button } from "react-bootstrap";

const ModalD = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      size={props.size}
      centered={props.centered}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          {props.cancelarTexto}
        </Button>
        <Button
          variant={props.operacion === "1" ? "danger" : "primary"}
          type="submit"
          form={props.formId} // Enlaza el botón con el formulario
        >
          {props.aceptarTexto}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalD;
