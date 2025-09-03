
import {
  Form,
  Row,
  Col,
  Container,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";

const CajaForm = (props) => {
  return (
    <Container className="">
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="g-3">
          <Col md="12" className=" mb-2 mt-4 text-center">
            <ButtonGroup>
              <ToggleButton
                id={`radio-1`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value="I"
                checked={props.values.movimiento === "I"}
                onChange={(e) =>
                  props.setFieldValue("movimiento", e.target.value)
                }
              >
                Ingreso
              </ToggleButton>
              <ToggleButton
                id={`radio-2`}
                type="radio"
                variant="outline-danger"
                name="radio"
                value="S"
                checked={props.values.movimiento === "S"}
                onChange={(e) =>
                  props.setFieldValue("movimiento", e.target.value)
                }
              >
                Salida
              </ToggleButton>
            </ButtonGroup>
          </Col>

          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                value={props.values.id_moneda}
                onChange={props.handleChange}
                name="id_moneda"
                isValid={!!props.touched.id_moneda}
              >
                {props.listaMoneda.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Tipo de caja</Form.Label>
              <Form.Select
                value={props.values.id_tipo_caja}
                onChange={props.handleChange}
                name="id_tipo_caja"
                isValid={!!props.touched.id_tipo_caja}
              >
                {props.listaTipoCaja.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Concepto</Form.Label>
              <Form.Select
                value={props.values.id_concepto}
                onChange={props.handleChange}
                name="id_concepto"
                isValid={!!props.touched.id_concepto}
              >
                {props.listaConcepto.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
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
            <Form.Group className=" m-0">
              <Form.Label>Observaciones</Form.Label>

              <Form.Control
                required
                value={props.values.observaciones}
                onChange={props.handleChange}
                name="celular"
                type="text"
                maxLength="50"
                style={{ textTransform: "uppercase" }}
                isInvalid={
                  !!props.errors.observaciones & props.touched.observaciones
                }
                isValid={!!props.touched.observaciones}
              />

              <Form.Control.Feedback type="invalid">
                {props.errors.observaciones}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="12" lg="12">
            <Form.Group>
              <Form.Label>Monto</Form.Label>
              <Form.Control
                required
                value={props.values.monto}
                onChange={(e) => {
                  let value = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                    props.setFieldValue("monto", value);
                  }
                }}
                onWheel={(e) => e.currentTarget.blur()}
                name="monto"
                type="text"
                inputMode="decimal"
                maxLength="6"
                isInvalid={
                  !!props.errors.monto &&
                  props.touched.monto &&
                  props.values.monto?.length === 0
                }
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.monto}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CajaForm;
