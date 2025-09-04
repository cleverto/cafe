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

const AlmacenGuardarForm = (props) => {
  const inputRef = useRef(null);

  return (
    <Container className="mb-4 ">
      <Form
        noValidate
        id="formIdModulo"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
   
        <Row className="g-3">

          <Col md="12" lg="12"></Col>
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

          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Motivo</Form.Label>
              <Form.Control
                required
                value={props.values.motivo}
                onChange={(e) => {
                  const val = e.target.value;

                  if (/^\d*$/.test(val) && val.length <= 8) {
                    props.setFieldValue("motivo", val);
                  }
                }}
                name="motivo"
                type="text"
                maxLength="8"
                isInvalid={
                  !!props.errors.motivo &&
                  props.touched.motivo &&
                  props.values.motivo?.length === 0
                }
              />
            </Form.Group>
          </Col>

          {/* Moneda */}
        </Row>
      </Form>
    </Container>
  );
};

export default AlmacenGuardarForm;
