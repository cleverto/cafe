import Axios from "axios";
import { useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import Select from "react-select";

const ProveedorForm = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.values.foco === "0") {
      inputRef.current?.focus();
    }
    props.setFieldValue("foco", "0");
  }, [props.values.foco]);

  return (
    <Container className="">
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3">
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Nro de dni o ruc</Form.Label>
              <InputGroup>
                <Form.Control
                  ref={inputRef}
                  value={props.values.dni}
                  onChange={props.handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      props.buscar_dni(props.values.dni);
                    }
                  }}
                  name="dni"
                  type="text"
                  placeholder="Buscar por DNI o RUC"
                  maxLength="11"
                  isInvalid={!!props.errors.dni && props.errors.dni}
                  isValid={!!props.touched.dni}
                />

                <Button
                  variant="secondary"
                  onClick={() => props.buscar_dni(props.values.dni)}
                >
                  {props.values.swdni ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="false"
                    />
                  ) : (
                    <i className="bi bi-search"></i>
                  )}
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                value={props.values.proveedor}
                onChange={props.handleChange}
                name="proveedor"
                type="text"
                placeholder="Nombre"
                maxlength="50"
                isInvalid={
                  !!props.errors.proveedor &&
                  props.touched.proveedor &&
                  props.values.proveedor?.length === 0
                }
                isValid={!!props.touched.proveedor}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.proveedor}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                required
                value={props.values.direccion}
                onChange={props.handleChange}
                name="direccion"
                type="text"
                placeholder="Direccion"
                maxlength="150"
                isInvalid={
                  !!props.errors.direccion &&
                  props.touched.direccion &&
                  props.values.direccion?.length === 0
                }
                isValid={!!props.touched.direccion}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.direccion}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                required
                value={props.values.telefono}
                onChange={props.handleChange}
                name="telefono"
                type="text"
                placeholder="Telefono"
                maxlength="50"
                isInvalid={
                  !!props.errors.telefono &&
                  props.touched.telefono &&
                  props.values.telefono?.length === 0
                }
                isValid={!!props.touched.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Select
              options={props.listaUbigeo}
              value={
                props.listaUbigeo.find(
                  (opt) => opt.value === props.values.id_ubigeo
                ) || null
              }
              onChange={(option) => {
                props.setFieldValue("id_ubigeo", option ? option.value : "");
                props.setFieldValue("ubigeo", option ? option.label : "");
              }}
              onInputChange={(inputValue, { action }) => {
                if (action === "input-change") {
                  props.buscar_ubigeo(inputValue);
                }
              }}
              placeholder="Seleccione un ubigeo..."
              isClearable
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProveedorForm;
