import { useEffect, useRef } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";

const Componente = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.values.foco === "0") {
      inputRef.current?.focus();
    }
    props.setFieldValue("foco", "0");
  }, [props.values.foco]);

  return (
    <Container className=" ">
      <Form
        noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="">
          <Col md="12" lg="12">
            <Form.Group className="m-0">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={props.values.id_categoria}
                onChange={props.handleChange}
                name="id_categoria"
                isValid={!!props.touched.id_categoria}
              >
                {props.listaCategoria.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Form.Group as={Col} md="12" className="mb-2">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              required
              ref={inputRef}
              value={props.values.producto}
              onChange={props.handleChange}
              name="producto"
              type="text"
              placeholder="Producto"
              maxlength="50"
              isInvalid={
                !!props.errors.producto &&
                props.touched.producto &&
                props.values.producto?.length === 0
              }
              isValid={!!props.touched.producto}
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.producto}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" className="mb-2">
            <Form.Label>Valor de QQ</Form.Label>
            <Form.Control
              required
              value={props.values.qq}
              onChange={(e) => {
                let value = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  props.setFieldValue("qq", value);
                }
              }}
              name="qq"
              type="text"
              placeholder="0.00"
              maxlength="5"
              isInvalid={
                !!props.errors.qq &&
                props.touched.qq &&
                props.values.qq?.length === 0
              }
              isValid={!!props.touched.qq}
            />
            <Form.Control.Feedback type="invalid">
              {props.errors.qq}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default Componente;
