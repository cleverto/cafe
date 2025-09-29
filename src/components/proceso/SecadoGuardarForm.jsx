import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";

const SecadoGuardarForm = (props) => {
  const inputRef = useRef(null);

  return (
    <Container className="mb-4 ">
      <Form
        noValidate
        id="formIdModulo"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3 mb-4">
          <Col md="12" lg="12">
            <div class="">
              <div
                style={{
                  backgroundColor: "#fff3cd", // amarillo suave
                  color: "#856404", // texto marrón oscuro
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textAlign: "right",
                  border: "2px solid #ffeeba",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div class="d-flex justify-content-between ">
                  <div>
                  </div>
                  <div >
                    QQ <span className="ms-1">
                      {(props.totalQQ).toLocaleString("es-PE")}
                    </span>
                  </div>

                  <div>
                    S/.  <span className="ms-1">
                      {(props.totalActivos).toLocaleString("es-PE")}
                    </span></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Fecha</Form.Label>

              <Form.Control
                value={props.values.fecha}
                onChange={props.handleChange}
                name="fecha"
                type="date"
                isInvalid={!!props.errors.fecha & props.touched.fecha}
                isValid={!!props.touched.fecha}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.fecha}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Comprobante</Form.Label>
              <Form.Select
                value={props.values.id_tipo_comprobante}
                onChange={props.handleChange}
                name="id_tipo_comprobante"
                isInvalid={
                  !!props.errors.id_tipo_comprobante &
                  props.touched.id_tipo_comprobante
                }
                isValid={!!props.touched.id_tipo_comprobante}
              >
                {props.listaTipoComprobante.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* Moneda */}
        </Row>
      </Form>
    </Container>
  );
};

export default SecadoGuardarForm;
