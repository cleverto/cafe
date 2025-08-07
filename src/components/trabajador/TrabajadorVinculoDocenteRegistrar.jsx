import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TrabajadorVinculoDocenteRegistrar = (props) => {
  const [listaContrato, setlistaContrato] = useState([]);
  const [listaCategoria, setlistaCategoria] = useState([]);
  const [listaDedicacion, setlistaDedicacion] = useState([]);
  const [listaCarrera, setlistaCarrera] = useState([]);
  const [listaDepartamentoAcademico, setListaDepartamentoAcademico] = useState(
    []
  );
  const [listaResolucion, setListaResolucion] = useState([]);
  const [listaRemuneracion, setlistaRemuneracion] = useState([]);

  const [listaDependencia, setlistaDependencia] = useState([]);
  const [listaRegimen, setListaRegimen] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idm = searchParams.get("id");

  useEffect(() => {
    get_lista_contrato();
    get_lista_categoria();
    get_lista_dedicacion();
    get_lista_remuneracion();
    get_lista_dependencia();
    get_lista_regimen();
    get_lista_carrera();
    get_lista_departamento_academico();

    if (props.idmodulo) {
      get_modulo();
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const get_modulo = async () => {
    let _datos = JSON.stringify({ id: props.idmodulo });
    await Axios.post(
      window.globales.url + "/trabajadorvinculodocente/modulo",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        if (res.data.items !== null) {
          let fecha = new Date(res.data.items.fecha_resolucion);
          fecha = fecha.toISOString().split("T")[0];
          let ingreso = new Date(res.data.items.ingreso);
          ingreso = ingreso.toISOString().split("T")[0];

          const finRaw = res.data.items.fin;

          const fin =
            finRaw && !isNaN(new Date(finRaw).getTime())
              ? new Date(finRaw).toISOString().split("T")[0]
              : "";
          setFieldValue("fin", fin);
          setFieldValue("ingreso", ingreso);
          setFieldValue("operacion", "1");
          setFieldValue("id_tipo_contrato", res.data.items.id_tipo_contrato);
          setFieldValue("id_categoria", res.data.items.id_categoria);
          setFieldValue("id_dedicacion", res.data.items.id_dedicacion);
          setFieldValue("id_carrera", res.data.items.id_carrera);
          setFieldValue(
            "id_departamento_academico",
            res.data.items.id_departamento_academico
          );
          setFieldValue(
            "id_tipo_remuneracion",
            res.data.items.id_tipo_remuneracion
          );
          setFieldValue("remuneracion", res.data.items.remuneracion);
          setFieldValue("horas", res.data.items.remuneracion);
          setFieldValue("documento", res.data.items.documento);
          setFieldValue("nro_resolucion", res.data.items.nro_resolucion);
          setFieldValue("nro_plaza", res.data.items.remuneracion);
          setFieldValue("fecha_resolucion", fecha);
        }
      }
    });
  };

  const get_lista_contrato = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_contrato",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaContrato(res.data.items);
    setFieldValue("id_tipo_contrato", res.data.items[0].id);
    console.log("entra");
  };

  const get_lista_categoria = async () => {
    let _datos = JSON.stringify({
      modulo: "categoria",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaCategoria(res.data.items);
    setFieldValue("id_categoria", res.data.items[0].id);
  };
  const get_lista_dedicacion = async () => {
    let _datos = JSON.stringify({
      modulo: "dedicacion",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaDedicacion(res.data.items);
    setFieldValue("id_dedicacion", res.data.items[0].id);
  };
  const get_lista_remuneracion = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_remuneracion",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaRemuneracion(res.data.items);
    setFieldValue("id_tipo_remuneracion", res.data.items[0].id);
  };
  const get_lista_carrera = async () => {
    let _datos = JSON.stringify({
      modulo: "carrera",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaCarrera(res.data.items);
    setFieldValue("id_carrera", res.data.items[0].id);
  };
  const get_lista_departamento_academico = async () => {
    let _datos = JSON.stringify({
      modulo: "departamento_academico",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaDepartamentoAcademico(res.data.items);
    setFieldValue("id_departamento_academico", res.data.items[0].id);
  };

  const get_lista_dependencia = async () => {
    let _datos = JSON.stringify({
      modulo: "dependencia",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaDependencia(res.data.items);
    setFieldValue("id_dependencia", res.data.items[0].id);
  };
  const get_lista_regimen = async () => {
    let _datos = JSON.stringify({
      modulo: "regimen",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaRegimen(res.data.items);
    setFieldValue("id_regimen", res.data.items[0].id);
  };
  const obtenerDescripcion = (lista, id, campo, campoId) => {
    const item = lista.find((el) => el[campoId] === id);
    return item ? item[campo] : "Desconocido";
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/trabajadorvinculodocente/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({ text: res.data.msg, icon: "info" });

          const obj = {
            ingreso: data.ingreso,
            id_trabajador_vinculo:
              data.operacion === "0" ? res.data.id : data.idmodulo,
            tipo_contrato: obtenerDescripcion(
              listaContrato,
              data.id_tipo_contrato,
              "descripcion",
              "id"
            ),
            categoria: obtenerDescripcion(
              listaCategoria,
              data.id_categoria,
              "descripcion",
              "id"
            ),
            dedicacion: obtenerDescripcion(
              listaDedicacion,
              data.id_dedicacion,
              "descripcion",
              "id"
            ),
            documento: data.documento,
          };

          if (data.operacion === "0") {
            props.inserta(obj);
          } else {
            props.modifica(obj);
          }
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const initialValues = {
    operacion: "0",
    idmodulo: props.idmodulo ? props.idmodulo : "",
    id_trabajador: idm,
    ingreso: new Date().toISOString().slice(0, 10),
    id_tipo_contrato: "",
    id_categoria: "",
    id_dedicacion: "",
    id_carrera: "",
    id_departamento_academico: "",
    id_tipo_remuneracion: "",
    documento: "",
    nro_resolucion: "",
    nro_plaza: "",
    remuneracion: "",
    horas: "",
    fin: "",
    fecha_resolucion: new Date().toISOString().slice(0, 10),
  };

  const validationSchema = Yup.object({
    ingreso: Yup.date()
      .required("La fecha es obligatoria")
      .max(new Date(), "La fecha no puede ser mayor a hoy")

      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    fin: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .test(
        "fin-mayor-que-inicio",
        "La fecha de cese debe ser posterior o igual a la de ingreso",
        function (fin) {
          const { ingreso } = this.parent;
          if (!fin) return true; // ✅ Si no hay fecha de fin, pasa
          return new Date(fin) >= new Date(ingreso); // ✅ Solo valida si hay valor
        }
      ),
    fecha_resolucion: Yup.date()
      .required("La fecha es obligatoria")
      .max(new Date(), "La fecha no puede ser mayor a hoy")

      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    remuneracion: Yup.number()
      .typeError("Debe ser un número válido")
      .min(0, "El valor debe ser 0 o mayor")
      .required("Por favor, ingrese la remuneración"),
    horas: Yup.number()
      .typeError("Debe ser un número válido")
      .min(0, "El valor debe ser 0 o mayor")
      .required("Por favor, ingrese la remuneración"),
    nro_plaza: Yup.number()
      .typeError("Debe ser un número válido")
      .min(0, "El valor debe ser 0 o mayor")
      .required("Por favor, ingrese la remuneración"),
  });
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        guardar(values);
      },
    });
  const componente = (
    <>
      <Container className="">
        <Form
          noValidate
          id={props.formId}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Row className="g-3">
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Ingreso a la UNJ</Form.Label>

                <Form.Control
                  value={values.ingreso}
                  onChange={handleChange}
                  name="ingreso"
                  type="date"
                  isInvalid={!!errors.ingreso & touched.ingreso}
                  isValid={!!touched.ingreso}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ingreso}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Tipo Contrato</Form.Label>

                <Form.Select
                  value={values.id_tipo_contrato}
                  onChange={handleChange}
                  name="id_tipo_contrato"
                  isValid={!!touched.id}
                  isInvalid={!!errors.id_tipo_contrato & touched.id}
                >
                  {listaContrato.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Categoria</Form.Label>

                <Form.Select
                  value={values.id_categoria}
                  onChange={handleChange}
                  name="id_categoria"
                  isValid={!!touched.id}
                  isInvalid={!!errors.id & touched.id}
                >
                  {listaCategoria.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Horas</Form.Label>

                <Form.Control
                  required
                  value={values.horas}
                  onChange={handleChange}
                  name="horas"
                  type="number"
                  maxLength="10"
                  isInvalid={!!errors.horas & touched.horas}
                  isValid={!!touched.horas}
                />
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Dedicación</Form.Label>

                <Form.Select
                  value={values.id_dedicacion}
                  onChange={handleChange}
                  name="id_dedicacion"
                  isValid={!!touched.id}
                  isInvalid={!!errors.id & touched.id}
                >
                  {listaDedicacion.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Régimen laboral</Form.Label>

                <Form.Select
                  value={values.id_regimen}
                  onChange={handleChange}
                  name="id_regimen"
                  isValid={!!touched.id}
                  isInvalid={!!errors.id & touched.id}
                >
                  {listaRegimen.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Dep. académico</Form.Label>

                <Form.Select
                  value={values.id}
                  onChange={handleChange}
                  name="id_departamento_academico"
                  isValid={!!touched.id}
                  isInvalid={!!errors.id & touched.id}
                >
                  {listaDepartamentoAcademico.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.descripcion}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Tipo y nro documento</Form.Label>

                <Form.Control
                  required
                  value={values.documento}
                  onChange={handleChange}
                  name="documento"
                  type="text"
                  maxlength="50"
                />
              </Form.Group>
            </Col>

            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Nro de resolución</Form.Label>

                <Form.Control
                  value={values.nro_resolucion}
                  onChange={handleChange}
                  name="nro_resolucion"
                  type="text"
                  maxLength="10"
                />
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Remuneracion</Form.Label>

                <Form.Control
                  type="number"
                  step="0.01"
                  value={values.remuneracion}
                  onChange={handleChange}
                  name="remuneracion"
                  isValid={!!touched.remuneracion}
                  isInvalid={!!errors.remuneracion && touched.remuneracion}
                />
              </Form.Group>
            </Col>

            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Nro de resolución</Form.Label>
                <Col lg="3">
                  <Form.Control
                    required
                    value={values.nro_resolucion}
                    onChange={handleChange}
                    name="nro_resolucion"
                    type="text"
                    maxLength="10"
                    isInvalid={!!errors.nro_resolucion & touched.nro_resolucion}
                    isValid={!!touched.nro_resolucion}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Nro de plaza</Form.Label>
                <Col lg="3">
                  <Form.Control
                    required
                    value={values.nro_plaza}
                    onChange={handleChange}
                    name="nro_plaza"
                    type="text"
                    maxLength="10"
                    isInvalid={!!errors.nro_plaza & touched.nro_plaza}
                    isValid={!!touched.nro_plaza}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Fecha de resolución</Form.Label>
                <Col lg="12">
                  <Form.Control
                    value={values.fecha_resolucion}
                    onChange={handleChange}
                    name="fecha_resolucion"
                    type="date"
                    isInvalid={
                      !!errors.fecha_resolucion & touched.fecha_resolucion
                    }
                    isValid={!!touched.fecha_resolucion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fecha_resolucion}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" lg="6">
              <Form.Group>
                <Form.Label>Fecha de cese</Form.Label>
                <Col lg="12">
                  <Form.Control
                    value={values.fin}
                    onChange={handleChange}
                    name="fin"
                    type="date"
                    isInvalid={!!errors.fin & touched.fin}
                    isValid={!!touched.fin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fin}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          {/* <div className="mt-4 text-end">
            {values.operacion === "1" ? (
              <Button className="" variant="danger" type="submit">
                Modificar
              </Button>
            ) : (
              <Button className="mb-4" variant="primary" type="submit">
                Guardar
              </Button>
            )}
          </div> */}
        </Form>
      </Container>
    </>
  );

  return <>{componente}</>;
};

export default TrabajadorVinculoDocenteRegistrar;
