import Axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [listaUbigeo, setListaUbigeo] = useState([]);

  useEffect(() => {
    if (props.values.foco === "0") {
      inputRef.current?.focus();
    }
    props.setFieldValue("foco", "0");
  }, [props.values.foco]);
  const options = [{ value: "060801", label: "JAEN" }];

const buscar_ubigeo = async (inputValue) => {
  const texto = String(inputValue || "").trim(); // ✅ Forzamos a string
  if (texto.length < 2) {
    setListaUbigeo([]);
    return;
  }

  // Simulando búsqueda en datos locales
  const datos = [
    { id_ubigeo: 1, ubigeo: "Lima - Lima - Miraflores" },
    { id_ubigeo: 2, ubigeo: "Lima - Lima - San Isidro" },
    { id_ubigeo: 3, ubigeo: "Cusco - Cusco - San Blas" },
  ];

  const filtrados = datos
    .filter((item) =>
      item.ubigeo.toLowerCase().includes(texto.toLowerCase())
    )
    .map((item) => ({
      value: item.id_ubigeo,
      label: item.ubigeo,
    }));

  setListaUbigeo(filtrados);
};


  return (
    <Container className=" ">
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3">
          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <InputGroup>
                <Form.Control
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
                  placeholder="Buscar por DNI"
                  maxLength="8"
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
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                required
                ref={inputRef}
                value={props.values.proveedor}
                onChange={props.handleChange}
                name="proveedor"
                type="text"
                placeholder="Proveedor"
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
                ref={inputRef}
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
              options={options} // Lista de opciones
              value={selectedOption} // Valor actual
              onChange={setSelectedOption} // Actualiza el valor
              onInputChange={(inputValue) => buscar_ubigeo(inputValue)}

              placeholder="Seleccione un país..."
              isClearable // Botón para limpiar
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProveedorForm;
