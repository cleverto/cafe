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
      <Form noValidate
        id="formId"
        onSubmit={props.handleSubmit}
        autoComplete="off">

        <Row className="">

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

        </Row>

      </Form>
    </Container>
  );
};

export default Componente;
