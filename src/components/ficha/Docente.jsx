import React, { useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card,
  InputGroup,
  Spinner,
  FloatingLabel,
  Figure,
  Table,
  Badge,
  Breadcrumb,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import styled from "styled-components";
import DocenteMain from "./DocenteMain";
const Docente = () => {
  const [swdni, setSwdni] = useState(false);
  const [disabledDNI, setDisabledDNI] = useState(false);
  const inputReffocus = useRef();

  //placeholder de codigo modular
  const StyledFormControl = styled(Form.Control)`
    &::placeholder {
      color: #ced4da;
    }

    &::-webkit-input-placeholder {
      color: #ced4da;
    }

    &:-ms-input-placeholder {
      color: #ced4da;
    }
  `;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };
  const handleKeyDownDNI = (e) => {
    console.log("handleKeyDownDNI");
    if (e.key === "Enter") {
      e.preventDefault(); 
      buscar_dni();
    }
  };
  const buscar_dni = () => {
    const nuevoValor = values.numerodocumento_buscar;
    if (nuevoValor.length === 8) {
      setSwdni(true);
      setDisabledDNI(true);
      get_dni_externo(nuevoValor);
    }
  };
  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({ tipo: "dni", nro: cad });
    setFieldValue("primernombre", "");
    setFieldValue("apellidopaterno", "");
    setFieldValue("apellidomaterno", "");
    await Axios.post(
      window.globales.url + "/funciones/get_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "true") {
        setFieldValue("numerodocumento", cad);
        setFieldValue("primernombre", res.data.items.nombres);
        setFieldValue("apellidopaterno", res.data.items.paterno);
        setFieldValue("apellidomaterno", res.data.items.materno);

        setDisabledDNI(false);
      }
      setSwdni(false);
    });
  };
  const handleBlur = async (cad) => {
    let _datos = JSON.stringify({ nro: cad });
    try {
      await Axios.post(
        window.globales.url + "/funciones/get_ingreso_by_dni",
        _datos
      ).then((res) => {});
    } catch (error) {
      console.error("Error al realizar la consulta:", error);
    }
  };
  const guardar = async () => {};
  const initialValues = {
    apellido_paterno: "",
    apellido_materno: "",
    nombres: "",
    dni: "",
    carne_extranjeria: "",
    pasaporte: "",
    libreta_militar: "",
    sexo: "",
    fecha_nacimiento: "",
    lugar_nacimiento: "",
    estado_civil: "",
    domicilio_nombre: "",
    domicilio_numero: "",
    distrito: "",
    provincia: "",
    departamento: "",
    telefono_fijo: "",
    telefono_celular: "",
    correo_electronico: "",
    ruc: "",
    hijos_menores: false,
    hijos_menores_cantidad: "",
    hijos_discapacidad: false,
    hijos_discapacidad_cantidad: "",
    ingreso: "",
    id_departamento_academico: "",
    id_cargo: "",
    nombrado: false,
    contratado: false,
    nro_resolucion: "",
    fecha_resolucion: "",
  };

  const validationSchema = Yup.object({
    apellido_paterno: Yup.string().required("Requerido"),
    apellido_materno: Yup.string().required("Requerido"),
    nombres: Yup.string().required("Requerido"),
    dni: Yup.string().matches(/^\d{8}$/, "DNI debe tener 8 dígitos"),
    correo_electronico: Yup.string().email("Email inválido"),
    fecha_nacimiento: Yup.date().nullable(),
    ingreso: Yup.date().nullable(),
    fecha_resolucion: Yup.date().nullable(),
    // Puedes agregar más reglas según tus necesidades
  });
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
        <Breadcrumb>
          <Breadcrumb.Item href="#/">Regresar</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="m-0">
          <Form.Group as={Col} md="12" className="mb-2 not-spin p-0">
            <InputGroup>
              <FloatingLabel label="Buscar al trabajador">
                <Form.Control
                  ref={inputReffocus}
                  required
                  value={values.numerodocumento}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownDNI}
                  name="numerodocumento"
                  type="number"
                  placeholder="DNI"
                  maxlength="8"
                  disabled={disabledDNI}
                  style={{ textTransform: "uppercase" }}
                  isInvalid={!!errors.numerodocumento & touched.numerodocumento}
                  isValid={!!touched.numerodocumento}
                />
              </FloatingLabel>
              <Button
                variant="secondary"
                id="btn-buscar-dni"
                disabled={disabledDNI}
                onClick={() => buscar_dni()}
              >
                {swdni ? (
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
              <Form.Control.Feedback type="invalid">
                {errors.numerodocumento}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <h1 className="display-6">ELVE CLEVER TORRES ALTAMIRANO</h1>
          <h6>MANCO CAPAC 699 JAEN</h6>
        </Row>
      </Container>
      <hr style={{ margin: 0, padding: 0 }} />
      <DocenteMain />
      <Container className="mt-4">
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Card>
            <Row className="m-0 p-4">
              <Col lg="6">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="4">
                    DNI
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      required
                      value={values.numerodocumento}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      onBlur={(e) => handleBlur(e.target.value)}
                      name="numerodocumento"
                      type="text"
                      maxLength="8"
                      disabled={disabledDNI}
                      style={{ textTransform: "uppercase" }}
                      isInvalid={
                        !!errors.numerodocumento & touched.numerodocumento
                      }
                      isValid={!!touched.numerodocumento}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.numerodocumento}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="4">
                    Nombres
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      required
                      value={values.primernombre}
                      onChange={handleChange}
                      name="primernombre"
                      type="text"
                      maxlength="50"
                      disabled={disabledDNI}
                      style={{ textTransform: "uppercase" }}
                      isInvalid={!!errors.primernombre & touched.primernombre}
                      isValid={!!touched.primernombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.primernombre}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column lg="4">
                    Apellido paterno
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      required
                      value={values.apellidopaterno}
                      onChange={handleInputChange}
                      name="apellidopaterno"
                      type="text"
                      maxlength="50"
                      disabled={disabledDNI}
                      style={{ textTransform: "uppercase" }}
                      isInvalid={
                        !!errors.apellidopaterno & touched.apellidopaterno
                      }
                      isValid={!!touched.apellidopaterno}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.apellidopaterno}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className=" m-0">
                  <Form.Label column lg="4">
                    Apellido materno
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      required
                      value={values.apellidomaterno}
                      onChange={handleInputChange}
                      name="apellidomaterno"
                      type="text"
                      maxlength="50"
                      disabled={disabledDNI}
                      style={{ textTransform: "uppercase" }}
                      isInvalid={
                        !!errors.apellidomaterno & touched.apellidomaterno
                      }
                      isValid={!!touched.apellidomaterno}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.apellidomaterno}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Card>

          <div className="text-center">
            <Button type="submit" size="lg" className="mt-4">
              Guardar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Docente;
