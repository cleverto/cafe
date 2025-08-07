import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card,
  InputGroup,
  FloatingLabel,
  Spinner,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import TrabajadorMain from "./TrabajadorMain";

const Componente = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleSubmit,
  listadepartamento = [],
  listaprovincia = [],
  listadistrito = [],
  listaestadocivil = [],
  listavia = [],
  buscar_dni,
  get_lista_provincia,
  get_lista_distrito,
}) => {
  return (
    <Container className="mt-3 ">
      <Form noValidate onSubmit={handleSubmit} autoComplete="off">
        <TrabajadorMain modulo="/trabajador_registrar" />

        <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />

        <div className="d-flex justify-content-between mb-4 mt-4">
          <div>
            {" "}
            <h5>Datos personales del servidor</h5>
            <p>Información personal del servidor / trabajador de la UNJ.</p>
          </div>
          <div>
            <Form.Group as={Col} md="12" className=" not-spin mt-2">
              <InputGroup>
                <Form.Control
                  value={values.numerodocumento_buscar}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      buscar_dni(values.numerodocumento_buscar);
                    }
                  }}
                  name="numerodocumento_buscar"
                  type="text"
                  placeholder="Buscar por DNI"
                  maxLength="8"
                />

                <Button
                  variant="secondary"
                  onClick={() => buscar_dni(values.numerodocumento_buscar)}
                >
                  {values.swdni ? (
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

        <Row className="">
          <Form.Group as={Col} md="3" className="mb-2 not-spin">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              required
              value={values.dni}
              onChange={handleChange}
              name="dni"
              type="text"
              placeholder="DNI"
              maxLength="8"
              disabled={values.swdni}
              style={{ textTransform: "uppercase" }}
              isInvalid={
                !!errors.dni && touched.dni && values.dni?.length === 0
              }
              isValid={!!touched.dni}
            />

            <Form.Control.Feedback type="invalid">
              {errors.dni}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              value={values.nombres}
              onChange={handleChange}
              name="nombres"
              type="text"
              placeholder="nombres"
              maxlength="50"
              disabled={values.swdni}
              style={{ textTransform: "uppercase" }}
              isInvalid={
                !!errors.nombres &&
                touched.nombres &&
                values.nombres?.length === 0
              }
              isValid={!!touched.nombres}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombres}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" className="mb-2">
            <Form.Label>Apellido paterno</Form.Label>
            <Form.Control
              required
              value={values.paterno}
              onChange={handleChange}
              name="paterno"
              type="text"
              placeholder="Ingresar apellido paterno"
              maxlength="50"
              disabled={values.swdni}
              style={{ textTransform: "uppercase" }}
              isInvalid={
                !!errors.paterno &&
                touched.paterno &&
                values.paterno?.length === 0
              }
              isValid={!!touched.paterno}
            />
            <Form.Control.Feedback type="invalid">
              {errors.paterno}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" className="">
            <Form.Label>Apellido materno</Form.Label>
            <Form.Control
              required
              value={values.materno}
              onChange={handleChange}
              name="materno"
              type="text"
              placeholder="Ingresar apellido materno"
              maxlength="50"
              disabled={values.swdni}
              style={{ textTransform: "uppercase" }}
              isInvalid={
                !!errors.materno &&
                touched.materno &&
                values.materno?.length === 0
              }
              isValid={!!touched.materno}
            />

            <Form.Control.Feedback type="invalid">
              {errors.materno}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Col md="12" className=" mb-2 mt-4 ">
          <ButtonGroup>
            <ToggleButton
              id={`radio-1`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value="1"
              checked={values.id_tipo_trabajador === "1"}
              onChange={(e) =>
                setFieldValue("id_tipo_trabajador", e.target.value)
              }
            >
              Personal Docente
            </ToggleButton>
            <ToggleButton
              id={`radio-2`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value="2"
              checked={values.id_tipo_trabajador === "2"}
              onChange={(e) =>
                setFieldValue("id_tipo_trabajador", e.target.value)
              }
            >
              Personal CAS
            </ToggleButton>
            <ToggleButton
              id={`radio-3`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value="3"
              checked={values.id_tipo_trabajador === "3"}
              onChange={(e) =>
                setFieldValue("id_tipo_trabajador", e.target.value)
              }
            >
              Repuesto judicial
            </ToggleButton>
          </ButtonGroup>
        </Col>

        <Card className="p-3  mb-4">
          <Card.Body>
            <h5 className=" fw-semibold text-dark mb-4">Datos personales</h5>
            <Row className="g-3">
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Sexo</Form.Label>

                  <Form.Select
                    value={values.sexo}
                    onChange={handleChange}
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
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Nacimiento</Form.Label>

                  <Form.Control
                    value={values.nacimiento}
                    onChange={handleChange}
                    name="nacimiento"
                    type="date"
                    isInvalid={!!errors.nacimiento & touched.nacimiento}
                    isValid={!!touched.nacimiento}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nacimiento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Teléfono fijo</Form.Label>

                  <Form.Control
                    required
                    value={values.fijo}
                    onChange={handleChange}
                    name="fijo"
                    type="text"
                    maxLength="50"
                    style={{ textTransform: "uppercase" }}
                    isInvalid={!!errors.fijo & touched.fijo}
                    isValid={!!touched.fijo}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.fijo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className=" m-0">
                  <Form.Label>Teléfono celular</Form.Label>

                  <Form.Control
                    required
                    value={values.celular}
                    onChange={handleChange}
                    name="celular"
                    type="text"
                    maxLength="50"
                    style={{ textTransform: "uppercase" }}
                    isInvalid={!!errors.celular & touched.celular}
                    isValid={!!touched.celular}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.celular}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Correo personal</Form.Label>

                  <Form.Control
                    required
                    value={values.correo}
                    onChange={handleChange}
                    name="correo"
                    type="text"
                    maxLength="50"
                    isInvalid={!!errors.correo & touched.correo}
                    isValid={!!touched.correo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.correo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Correo institucional</Form.Label>

                  <Form.Control
                    required
                    value={values.institucional}
                    onChange={handleChange}
                    name="institucional"
                    type="text"
                    maxLength="50"
                    isInvalid={!!errors.institucional & touched.institucional}
                    isValid={!!touched.institucional}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.institucional}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Estado civil</Form.Label>

                  <Form.Select
                    value={values.id_estado_civil}
                    onChange={(e) => {
                      const nuevoValor = e.target.value;
                      setFieldValue("id_estado_civil", nuevoValor);

                      // if (nuevoValor === "2") {
                      //   setSwCasado(true);
                      //   setSwConviviente(false);
                      // } else if (nuevoValor === "3") {
                      //   setSwConviviente(true);
                      //   setSwCasado(false);
                      // } else {
                      //   setSwConviviente(false);
                      //   setSwCasado(false);
                      // }
                    }}
                    name="id_estado_civil"
                    isValid={!!touched.id_estado_civil}
                  >
                    {listaestadocivil.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* <Form.Group className="m-0">
                  {swCasado && (
                    <>
                      <Form.Label ></Form.Label>

                      <Col md="8" className="mt-2">
                        <Form.Control
                          type="file"
                          name="file_casado"
                          accept="application/pdf"
                          onChange={(e) => handleFileChange(e)}
                        />
                        <p className="small text-muted">
                          Copia de partida de matrimonio civil y copia de DNI de
                          la esposa
                        </p>
                      </Col>
                    </>
                  )}
                  {swConviviente && (
                    <>
                      <Form.Label ></Form.Label>

                      <Col md="8" className="mt-2">
                        <Form.Control
                          type="file"
                          name="file_conviviente"
                          accept="application/pdf"
                          onChange={(e) => handleFileChange(e)}
                        />

                        <p className="small text-muted">
                          Copia de DNI de su pareja, más documento que sustente
                          el vínculo
                        </p>
                      </Col>
                    </>
                  )}
                </Form.Group> */}
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Carné</Form.Label>

                  <Form.Control
                    value={values.carne}
                    onChange={handleChange}
                    name="carne"
                    type="text"
                    maxLength="20"
                    isInvalid={!!errors.carne & touched.carne}
                    isValid={!!touched.carne}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.carne}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Pasaporte</Form.Label>

                  <Form.Control
                    value={values.pasaporte}
                    onChange={handleChange}
                    name="pasaporte"
                    type="text"
                    maxLength="20"
                    isInvalid={!!errors.pasaporte & touched.pasaporte}
                    isValid={!!touched.pasaporte}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.pasaporte}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Libreta del Adolesc.</Form.Label>

                  <Form.Control
                    value={values.libreta}
                    onChange={handleChange}
                    name="libreta"
                    type="text"
                    maxLength="20"
                    isInvalid={!!errors.libreta & touched.libreta}
                    isValid={!!touched.libreta}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.numerodocumento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>RUC</Form.Label>

                  <Form.Control
                    value={values.ruc}
                    onChange={handleChange}
                    name="ruc"
                    type="text"
                    maxLength="12"
                    isInvalid={!!errors.ruc & touched.ruc}
                    isValid={!!touched.ruc}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.ruc}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="p-3 mb-4">
          <Card.Body>
            <h5 className=" fw-semibold text-dark mb-4">Datos de dirección</h5>
            <Row className="g-3">
              <Col md="4" lg="4">
                <Form.Group className="m-0">
                  <Form.Label>Departamento</Form.Label>

                  <Form.Select
                    value={values.departamento}
                    onChange={(e) => {
                      let cad = e.target.value;
                      setFieldValue("departamento", cad);
                      get_lista_provincia(cad);
                      setFieldValue("provincia", "0");
                      //setListadistrito([]);
                    }}
                    name="departamento"
                    isValid={!!touched.departamento}
                  >
                    {listadepartamento.map((data, index) => (
                      <option key={index} value={data.departamento}>
                        {data.dep}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="4" lg="4">
                <Form.Group className="m-0">
                  <Form.Label>Provincia</Form.Label>

                  <Form.Select
                    value={values.provincia}
                    onChange={(e) => {
                      let cad = e.target.value;
                      setFieldValue("provincia", cad);
                      get_lista_distrito(values.departamento, cad);
                      setFieldValue("distrito", "0");
                    }}
                    name="provincia"
                    isValid={!!touched.provincia}
                  >
                    {listaprovincia.map((data, index) => (
                      <option key={index} value={data.provincia}>
                        {data.pro}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="4" lg="4">
                <Form.Group className="m-0">
                  <Form.Label>Distrito</Form.Label>

                  <Form.Select
                    value={values.distrito}
                    onChange={handleChange}
                    name="distrito"
                    isValid={!!touched.distrito}
                  >
                    {listadistrito.map((data, index) => (
                      <option key={index} value={data.distrito}>
                        {data.dis}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="6" lg="12">
                <Form.Group className="m-0 ">
                  <Form.Label>Domicilio</Form.Label>

                  <InputGroup>
                    <Form.Select
                      className="md-6"
                      value={values.id_tipo_via}
                      onChange={handleChange}
                      name="id_tipo_via"
                    >
                      {listavia.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.descripcion}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control
                      className="md-6"
                      required
                      value={values.domicilio}
                      onChange={handleChange}
                      name="domicilio"
                      type="text"
                      maxLength={25}
                      isInvalid={!!errors.domicilio && touched.domicilio}
                      isValid={!!touched.domicilio}
                      style={{ width: "70%" }}
                    />
                  </InputGroup>

                  <Form.Control.Feedback type="invalid">
                    {errors.lugar}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="p-3 mb-4">
          <Card.Body>
            <h5 className=" fw-semibold text-dark mb-4">Datos otros</h5>
            <Row className="g-3">
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>Registro ARIRHSP</Form.Label>
                  <Col md="12">
                    <Form.Control
                      required
                      value={values.arirhsp}
                      onChange={handleChange}
                      name="arirhsp"
                      type="text"
                      maxLength="35"
                      isInvalid={!!errors.arirhsp & touched.arirhsp}
                      isValid={!!touched.arirhsp}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.arirhsp}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>SIAG - MCPP (RDP)</Form.Label>
                  <Col md="12">
                    <Form.Control
                      required
                      value={values.rdp}
                      onChange={handleChange}
                      name="rdp"
                      type="text"
                      maxLength="35"
                      isInvalid={!!errors.rdp & touched.rdp}
                      isValid={!!touched.rdp}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    {errors.fijo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>SIAG - MCPP (RDL)</Form.Label>

                  <Form.Control
                    required
                    value={values.rdl}
                    onChange={handleChange}
                    name="rdl"
                    type="text"
                    maxLength="35"
                    isInvalid={!!errors.rdl & touched.rdl}
                    isValid={!!touched.rdl}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.rdl}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>SISPER</Form.Label>

                  <Form.Control
                    required
                    value={values.sisper}
                    onChange={handleChange}
                    name="sisper"
                    type="text"
                    maxLength="35"
                    isInvalid={!!errors.sisper & touched.sisper}
                    isValid={!!touched.sisper}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.sisper}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>T-Registro</Form.Label>

                  <Form.Control
                    required
                    value={values.tregistro}
                    onChange={handleChange}
                    name="tregistro"
                    type="text"
                    maxLength="35"
                    isInvalid={!!errors.tregistro & touched.tregistro}
                    isValid={!!touched.tregistro}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.tregistro}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>SIGA</Form.Label>

                  <Form.Control
                    required
                    value={values.siga}
                    onChange={handleChange}
                    name="siga"
                    type="text"
                    maxLength="35"
                    isInvalid={!!errors.siga & touched.siga}
                    isValid={!!touched.siga}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.fijo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6" lg="6">
                <Form.Group className="m-0">
                  <Form.Label>ESSALUD</Form.Label>

                  <Form.Control
                    required
                    value={values.essalud}
                    onChange={handleChange}
                    name="essalud"
                    type="text"
                    maxLength="35"
                    isInvalid={!!errors.essalud & touched.essalud}
                    isValid={!!touched.essalud}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.essalud}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center ">
          {values.operacion === "1" ? (
            <Button className="mt-4  mb-4" variant="danger" type="submit">
              Modificar
            </Button>
          ) : (
            <Button className="mt-4 mb-4" variant="primary" type="submit">
              Guardar
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default Componente;
