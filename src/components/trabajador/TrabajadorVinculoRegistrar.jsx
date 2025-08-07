import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import TrabajadorMain from "./TrabajadorMain";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TrabajadorVinculoRegistrar = (props) => {
  const [listaCargo, setlistaCargo] = useState([]);
  const [listaRegimen, setlistaRegimen] = useState([]);
  const [listaResolucion, setListaResolucion] = useState([]);
  const [listaRemuneracion, setlistaRemuneracion] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idm = searchParams.get("id");

  useEffect(() => {
    get_lista_cargo();
    get_lista_regimen();
    get_lista_remuneracion();
    get_lista_resolucion();
    if (props.idmodulo) {
      get_modulo();
    }

    // eslint-disable-next-line
  }, [props.idmodulo]);

  const get_modulo = async () => {
    let _datos = JSON.stringify({ id: props.idmodulo });
    await Axios.post(
      window.globales.url + "/trabajadorvinculo/modulo",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
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

        setFieldValue("operacion", "1");
        setFieldValue("ingreso", ingreso);
        setFieldValue("cargo", res.data.items.cargo);
        setFieldValue("dependencia", res.data.items.dependencia);
        setFieldValue("documento", res.data.items.documento);
        setFieldValue("id_regimen", res.data.items.id_regimen);
        setFieldValue("id_tipo_resolucion", res.data.items.id_tipo_resolucion);
        setFieldValue("remuneracion", res.data.items.remuneracion);
        setFieldValue("fecha_resolucion", fecha);
      }
    });
  };

  const get_lista_cargo = async () => {
    let _datos = JSON.stringify({
      modulo: "cargo",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaCargo(res.data.items);
    setFieldValue("id_cargo", res.data.items[0].id);
  };
  const get_lista_regimen = async () => {
    let _datos = JSON.stringify({
      modulo: "regimen",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setlistaRegimen(res.data.items);
    setFieldValue("id_regimen", res.data.items[0].id);
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

  const get_lista_resolucion = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_resolucion",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaResolucion(res.data.items);
    setFieldValue("id_tipo_resolucion", res.data.items[0].id);
  };
  const obtenerDescripcion = (lista, id, campo, campoId) => {
    const item = lista.find((el) => el[campoId] === id);
    return item ? item[campo] : "Desconocido";
  };
  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/trabajadorvinculo/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          const obj = {
            ingreso: data.ingreso,
            cargo: data.cargo,
            id_trabajador_vinculo:
              data.operacion === "0" ? res.data.id : data.idmodulo,
            regimen: obtenerDescripcion(
              listaRegimen,
              data.id_regimen,
              "descripcion",
              "id"
            ),
            tipo_resolucion: obtenerDescripcion(
              listaResolucion,
              data.id_tipo_resolucion,
              "descripcion",
              "id"
            ),

            documento: data.documento,
            dependencia: data.dependencia,
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
    cargo: "",
    dependencia: "",
    documento: "",
    id_regimen: "",
    id_tipo_resolucion: "",
    remuneracion: "",
    fecha_resolucion: new Date().toISOString().slice(0, 10),
    fin: "",
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
    cargo: Yup.string().required(
      "Por favor, ingrese la denominación del cargo"
    ),
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
      <Container className="mt-3">
        <Form
          noValidate
          id={props.formId}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Row className="g-3">
            <Col md="6" lg="6">
              <Form.Label>Ingreso</Form.Label>

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
            </Col>
            <Col md="6" lg="6">
              <Form.Label>Denominación del cargo</Form.Label>
              <Form.Control
                required
                value={values.cargo}
                onChange={handleChange}
                name="cargo"
                type="text"
                maxlength="50"
                isValid={!!touched.cargo}
                isInvalid={!!errors.cargo & touched.cargo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cargo}
              </Form.Control.Feedback>
            </Col>

            <Col md="6" lg="6">
              <Form.Label>Régimen laboral</Form.Label>

              <Form.Select
                value={values.id_regimen}
                onChange={handleChange}
                name="id_regimen"
                isValid={!!touched.id_regimen}
                isInvalid={!!errors.id_regimen & touched.id_regimen}
              >
                {listaRegimen.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.id_regimen}
              </Form.Control.Feedback>
            </Col>
            <Col md="6" lg="6">
              <Form.Label>Tipo Resolución</Form.Label>

              <Form.Select
                value={values.id_tipo_resolucion}
                onChange={handleChange}
                name="id_tipo_resolucion"
                isValid={!!touched.id_tipo_resolucion}
                isInvalid={
                  !!errors.id_tipo_resolucion & touched.id_tipo_resolucion
                }
              >
                {listaResolucion.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.id_tipo_resolucion}
              </Form.Control.Feedback>
            </Col>
            <Col md="6" lg="6">
              <Form.Label>Dependencia</Form.Label>

              <Form.Control
                required
                value={values.dependencia}
                onChange={handleChange}
                name="dependencia"
                type="text"
                maxlength="50"
              />
            </Col>
            <Col md="6" lg="6">
              <Form.Label>Tipo y nro documento</Form.Label>

              <Form.Control
                required
                value={values.documento}
                onChange={handleChange}
                name="documento"
                type="text"
                maxlength="50"
              />
            </Col>
            <Col md="6" lg="6">
              <Form.Label>Fecha de documento</Form.Label>

              <Form.Control
                value={values.fecha_resolucion}
                onChange={handleChange}
                name="fecha_resolucion"
                type="date"
                isInvalid={!!errors.fecha_resolucion & touched.fecha_resolucion}
                isValid={!!touched.fecha_resolucion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fecha_resolucion}
              </Form.Control.Feedback>
            </Col>
            <Col md="6" lg="6">
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
            </Col>

            <Col md="6" lg="6">
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
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );

  return <>{componente}</>;
};

export default TrabajadorVinculoRegistrar;
