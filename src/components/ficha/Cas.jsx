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
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import styled from "styled-components";

const Cas = () => {
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
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que se envíe el formulario
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
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Card className="mb-3 mt-4">
            <Card.Header as="h5" className="bg-primary text-white">
              <div class="d-flex justify-content-between">
                <div className="mt-2">Datos del Trabajador</div>
                <div className="mt-1">
                  <Form.Group as={Col} md="12" className=" not-spin">
                    <InputGroup>
                      <StyledFormControl
                        ref={inputReffocus}
                        className="bg-primary text-light"
                        value={values.numerodocumento_buscar}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        onBlur={(e) => handleBlur(e.target.value)}
                        onKeyDown={handleKeyDownDNI}
                        name="numerodocumento_buscar"
                        type="text"
                        placeholder="Buscar por DNI"
                        maxLength="8"
                      />

                      <Button
                        variant="secondary"
                        id="btn-buscar-dni"
                        onClick={(e) => buscar_dni()}
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
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="m-0">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    DNI
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  <Form.Label column sm="2">
                    Nombres
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  <Form.Label column sm="2">
                    Apellido paterno
                  </Form.Label>
                  <Col sm="10" lg="3">
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

                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Apellido materno
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Estado civil
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Select
                      value={values.sexo}
                      onChange={handleInputChange}
                      name="sexo"
                      isValid={!!touched.sexo}
                    >
                      <option key="1" value="M">
                        SOLTERO
                      </option>
                      <option key="0" value="F">
                        CASADO
                      </option>
                      <option key="0" value="F">
                        CONVIVIENTE
                      </option>
                      <option key="0" value="F">
                        DIVORCIADO
                      </option>
                      <option key="0" value="F">
                        VIUDO
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Row>

              <Row className="m-0">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    CARNÉ
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Pasaporte
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Libreta del Adolesc.
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    RUC
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-0">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Sexo
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Select
                      value={values.sexo}
                      onChange={handleInputChange}
                      name="sexo"
                      isValid={!!touched.sexo}
                    >
                      <option key="1" value="M">
                        MASCULINO
                      </option>
                      <option key="0" value="F">
                        FEMENINO
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Nacimiento
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Control
                      value={values.fechanacimiento}
                      onChange={handleInputChange}
                      name="fechanacimiento"
                      type="date"
                      isInvalid={
                        !!errors.fechanacimiento & touched.fechanacimiento
                      }
                      isValid={!!touched.fechanacimiento}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fechanacimiento}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Domicilio
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup className="">
                      <Form.Select
                        value={values.sexo}
                        onChange={handleInputChange}
                        name="sexo"
                        isValid={!!touched.sexo}
                        style={{ width: "28%" }}
                      >
                        <option value="M">AV.</option>
                        <option value="C">CALLE</option>
                        <option value="J">JR.</option>
                        <option value="P">PASAJE</option>
                        <option value="O">OTRO</option>
                      </Form.Select>

                      <Form.Control
                        required
                        value={values.lugar}
                        onChange={handleInputChange}
                        name="lugar"
                        type="text"
                        maxLength={25}
                        isInvalid={!!errors.lugar && touched.lugar}
                        isValid={!!touched.lugar}
                        style={{ width: "72%" }}
                      />
                    </InputGroup>

                    <Form.Control.Feedback type="invalid">
                      {errors.lugar}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Teléfono
                  </Form.Label>
                  <Col sm="10" lg="3">
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
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Control
                      required
                      value={values.email}
                      onChange={handleInputChange}
                      name="email"
                      type="text"
                      isInvalid={!!errors.email & touched.email}
                      isValid={!!touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-3 mt-4">
            <Card.Header as="h5" className="bg-primary text-white">
              Hijos menores
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="m-0">
                <Form.Group as={Row} className="mb-2 m-0">
                  <Form.Label column sm="2">
                    Cantidad de hijos
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Control
                      required
                      value={values.numerodocumento}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      name="numerodocumento"
                      type="text"
                      maxLength="8"
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
                  <Form.Label column sm="2">
                    Hijos con discap.
                  </Form.Label>
                  <Col sm="10" lg="3">
                    <Form.Control
                      required
                      value={values.numerodocumento}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      name="numerodocumento"
                      type="text"
                      maxLength="8"
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
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-3 mt-4">
            <Card.Header as="h5" className="bg-primary text-white">
              Adjuntar documentos
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="m-0">
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label>Adjuntar DNI de hijos</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Row>
              <Row className="m-0">
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label>Adjuntar copia de partidad de matrimonio civil</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Row>
              <Row className="m-0">
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label>DNI de la esposa</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Row>
              <Row className="m-0">
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label>Copia de DNI de su pareja, más documento que sustente el vínculo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          <Button type="submit" className="mt-4">
            Guardar
          </Button>
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

export default Cas;
