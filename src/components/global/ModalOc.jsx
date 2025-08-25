import React from 'react'
import { Offcanvas } from 'react-bootstrap';



const ModalOc = (props) => {
  if (props.show) {
    return (
      <Offcanvas
        show={props.show}
        onHide={props.handleClose}
        backdrop={true}
        placement={props.posicion}
        style={{ zIndex: "1055", left: props.izquierda,   }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.componente}
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  return null;
};

export default ModalOc;