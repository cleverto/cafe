import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";

const RegistrarProceso = ({ handleClose, inserta, modifica, rowdata, idmodulo }) => {
  //const [listasede, setListasede] = useState([]);
  const [listamacro, setListamacro] = useState([]);
  const [listasemestre, setListasemestre] = useState([]);
  const [listatipoproceso, setListatipoproceso] = useState([]);
  const inputRefdescripcion = useRef();


  useEffect(() => {

    inputRefdescripcion.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (idmodulo) {
      get_modulo(idmodulo);
    }
    // eslint-disable-next-line
  }, [idmodulo]);

  const initialValues = {
    operacion: "0",
    id: idmodulo ? idmodulo : "",
    descripcion: "",
    resolucion: "",
    fecha: new Date().toISOString().split("T")[0],
    sede: "01",
    macro: "",
    semestre: "",
    desc_tipoproceso: "",
    tipoproceso: "",
    preguntas: "50",
    buenas: "4.039",
    malas: "-0.151",
    presidente: "",
    secretario: "",
    vocal: "",
    observacion: "",
    activo: true,
    valido: true,
    virtual: false,
  };

  const get_modulo = async (id) => {
    let _datos = JSON.stringify({ id: id });
    await Axios.post(window.globales.url + "/proceso/modulo", _datos).then(
      (res) => {
        let fecha = new Date(res.data.items[0].fecharesolucion);

        fecha = fecha.toISOString().split("T")[0];

        setFieldValue("operacion", "1");

      }
    );
  };
 

  const guardar = async (data) => {

    let _datos = JSON.stringify(data);
    await Axios.post(window.globales.url + "/proceso/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "true") {
         
            const obj = {
              nro: rowdata.length + 1,
              proceso: data.operacion === "0" ? res.data.id : data.id,
              proceso_desc: data.descripcion.toUpperCase(),
              desc_tipoproceso: values.desc_tipoproceso,
              activo: Boolean(data["activo"]) & "1",
              virtual: Boolean(data["virtual"]) & "1",

            };
            if (data.operacion === "0") {
              inserta(obj);
            } else {
              modifica(obj);
            }            

          
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const validationSchema = Yup.object({
    descripcion: Yup.string().required(
      "Por favor ingrese la descripcion del proceso"
    ),
    resolucion: Yup.string().required(
      "Por favor, ingrese la descripción del proceso"
    ),
    fecha: Yup.string().required(
      "Por favor, ingrese la descripcion del proceso"
    ),
    preguntas: Yup.string().required("Falta este dato"),
    buenas: Yup.string().required("Falta este dato"),
    malas: Yup.string().required("Falta este"),
    presidente: Yup.string().required("Ingrese el presidente"),
    secretario: Yup.string().required("Ingrese el secretario"),
    vocal: Yup.string().required("Ingrese el vocal"),
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      guardar(values);

      inputRefdescripcion.current.focus();
    },
  });
  return (
    <>
      <Container>
        <Form noValidate onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Descripción del proceso</Form.Label>
            <Form.Control
              ref={inputRefdescripcion}
              required
              value={values.descripcion}
              onChange={handleChange}
              name="descripcion"
              type="text"
              placeholder="Descripción"
              style={{ textTransform: "uppercase" }}
              isInvalid={!!errors.descripcion & touched.descripcion}
            />

            {/* !!errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div> */}
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Resolución</Form.Label>
            <Form.Control
              required
              value={values.resolucion}
              onChange={handleChange}
              name="resolucion"
              type="text"
              placeholder="Resolución"
              style={{ textTransform: "uppercase" }}
              isInvalid={!!errors.resolucion & touched.resolucion}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Macro</Form.Label>
            <Form.Select
              value={values.macro}
              onChange={handleChange}
              name="macro"
            >
              {listamacro.map((data, index) => (
                <option key={index} value={data.procesogeneral}>
                  {data.descripcion}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Tipo de proceso</Form.Label>
            <Form.Select
              value={values.tipoproceso}
              onChange={(e) => {
                setFieldValue("desc_tipoproceso", e.target.options[e.target.selectedIndex].text);
                handleChange(e);
              }}
              name="tipoproceso"
              className=""
            >
              {listatipoproceso.map((data, index) => (
                <option key={index} value={data.tipoproceso}>
                  {data.descripcion}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={values.fecha}
                onChange={handleChange}
                name="fecha"
                type="date"
                isInvalid={!!errors.fecha & touched.fecha}
              />
            </Form.Group>

            {/* <Form.Group  as={Col}  className="mb-3">
              <Form.Label >Sede</Form.Label>
                  <Form.Select 
                    value={values.sede}
                    onChange={handleChange}
                    name="sede">
                    {listasede.map((data, index) => (
                        <option key={index} value={data.sede}>{data.descripcion}</option>
                    ))}
                  </Form.Select>
            </Form.Group> */}

            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Semestre</Form.Label>
              <Form.Select
                value={values.semestre}
                onChange={handleChange}
                name="semestre"
                className=""
              >
                {listasemestre.map((data, index) => (
                  <option key={index} value={data.semestre}>
                    {data.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <div className="d-grid">
            <Button className="mt-4 btn-block" variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default RegistrarProceso;
