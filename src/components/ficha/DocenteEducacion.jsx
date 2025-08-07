import { Card, Col, Container, Form, Row } from "react-bootstrap";
import DocenterMain from "./DocenteMain";
import Dashboard from "../dashboard/Dashboard";
import DocenteCabecera from "./DocenteCabecera";
import * as Yup from "yup";
import { useFormik } from "formik";

const DocenteEducacion = () => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };
  const validationSchema = Yup.object({
    ingreso: Yup.date().nullable(),
  });
  const guardar = (e) => {};
  const initialValues = {
    apellido_paterno: "",
  };
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        guardar(values);
        //guardar(values);
        // if (error==="true"){
        //   resetForm();
        // }
        // inputReffocus.current.focus();
      },
    });
  const componente = (
    <>
      <Container className="mt-4">
        <DocenteCabecera />
        <DocenterMain modulo="/docente_educacion" />


        <hr className="mt-1 " />
        <div style={{marginTop:"30px"}}></div>
        <Card>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="3">
                  Educación
                </Form.Label>
                <Col lg="9" className="mt-2">
                  <Form.Check
                    inline
                    label="PUBLICA"
                    name="group1"
                    type="radio"
                    id={`reverse-radio-1`}
                    defaultChecked // Selecciona este radio por defecto
                  />
                  <Form.Check
                    inline
                    label="PRIVADA"
                    name="group1"
                    type="radio"
                    id={`reverse-radio-2`}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="3">
                  Formación Universitaria
                </Form.Label>
                <Col lg="9" className="mt-2">
                  <Form.Check
                    inline
                    label="COMPLETA"
                    name="group2"
                    type="radio"
                    id={`reverse-radio-3`}
                    defaultChecked
                  />
                  <Form.Check
                    inline
                    label="INCOMPLETA"
                    name="group2"
                    type="radio"
                    id={`reverse-radio-4`}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2 m-0">
                <Form.Label column lg="3">
                  Técnico superior
                </Form.Label>
                <Col lg="9" className="mt-2">
                  <Form.Check
                    inline
                    label="COMPLETA"
                    name="group3"
                    type="radio"
                    id={`reverse-radio-5`}
                    defaultChecked
                  />
                  <Form.Check
                    inline
                    label="INCOMPLETA"
                    name="group3"
                    type="radio"
                    id={`reverse-radio-6`}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default DocenteEducacion;
