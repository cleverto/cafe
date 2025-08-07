import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import TrabajadorForm from "./TrabajadorForm";
import { useLocation } from "react-router-dom";

const TrabajadorRegistrar = () => {
  const [listadepartamento, setListadepartamento] = useState([]);
  const [listaprovincia, setListaprovincia] = useState([]);
  const [listadistrito, setListadistrito] = useState([]);
  const [listaestadocivil, setListaEstadoCivil] = useState([]);
  const [listavia, setListaVia] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      modulo(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    get_lista_departamento();
    get_lista_provincia("06");
    get_lista_distrito("06", "08");
    get_lista_estado_civil();
    get_lista_via();

    // eslint-disable-next-line
  }, []);

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/trabajador/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("id_trabajador", res.data.items.id_trabajador);
          formik.setFieldValue("id_tipo_via", res.data.items.id_tipo_via);
          formik.setFieldValue(
            "id_estado_civil",
            res.data.items.id_estado_civil
          );
          formik.setFieldValue(
            "id_tipo_trabajador",
            res.data.items.id_tipo_trabajador
          );
          formik.setFieldValue("dni", res.data.items.dni);
          formik.setFieldValue("paterno", res.data.items.paterno);
          formik.setFieldValue("materno", res.data.items.materno);
          formik.setFieldValue("nombres", res.data.items.nombres);
          formik.setFieldValue("carne", res.data.items.carne);
          formik.setFieldValue("pasaporte", res.data.items.pasaporte);
          formik.setFieldValue("libreta", res.data.items.libreta);
          formik.setFieldValue("sexo", res.data.items.sexo);
          formik.setFieldValue("nacimiento", res.data.items.nacimiento);
          formik.setFieldValue("domicilio", res.data.items.domicilio);
          formik.setFieldValue("distrito", res.data.items.distrito);
          formik.setFieldValue("provincia", res.data.items.provincia);
          formik.setFieldValue("departamento", res.data.items.departamento);
          formik.setFieldValue("fijo", res.data.items.fijo);
          formik.setFieldValue("celular", res.data.items.celular);
          formik.setFieldValue("correo", res.data.items.correo);
          formik.setFieldValue("institucional", res.data.items.institucional);
          formik.setFieldValue("ruc", res.data.items.ruc);
          formik.setFieldValue("essalud", res.data.items.essalud);
          formik.setFieldValue("privada", res.data.items.privada);
          formik.setFieldValue("publica", res.data.items.publica);
          formik.setFieldValue("arirhsp", res.data.items.arirhsp);
          formik.setFieldValue("rdp", res.data.items.rdp);
          formik.setFieldValue("rdl", res.data.items.rdl);
          formik.setFieldValue("sisper", res.data.items.sisper);
          formik.setFieldValue("tregistro", res.data.items.tregistro);
          formik.setFieldValue("siga", res.data.items.siga);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const get_lista_estado_civil = async () => {
    let _datos = JSON.stringify({
      modulo: "estado_civil",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaEstadoCivil(res.data.items);
    formik.setFieldValue("id_estado_civil", "1");
  };
  const get_lista_via = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_via",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaVia(res.data.items);
    formik.setFieldValue("id_tipo_via", res.data.items[0].id_tipo_via);
  };
  const get_lista_departamento = async () => {
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_departamento"
    );
    setListadepartamento(res.data.items);
  };
  const get_lista_provincia = async (cad) => {
    let _datos = JSON.stringify({ departamento: cad });
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_provincia",
      _datos
    );
    setListaprovincia(res.data.items);
  };
  const get_lista_distrito = async (departamento, provincia) => {
    let _datos = JSON.stringify({
      departamento: departamento,
      provincia: provincia,
    });
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_distrito",
      _datos
    );
    setListadistrito(res.data.items);
  };

  const buscar_dni = (e) => {
    const nuevoValor = e;
    if (
      nuevoValor &&
      typeof nuevoValor === "string" &&
      nuevoValor.length === 8
    ) {
      formik.setFieldValue("swdni", true);

      get_dni_externo(nuevoValor);
    }
  };

  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({ tipo: "dni", nro: cad });
    formik.setFieldValue("dni", "");
    formik.setFieldValue("nombres", "");
    formik.setFieldValue("paterno", "");
    formik.setFieldValue("materno", "");
    formik.setFieldValue("", "");
    await Axios.post(
      window.globales.url + "/funciones/get_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("dni", cad);
        formik.setFieldValue("nombres", res.data.items.nombres);
        formik.setFieldValue("paterno", res.data.items.paterno);
        formik.setFieldValue("materno", res.data.items.materno);
      }
      formik.setFieldValue("swdni", false);
    });
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/trabajador/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
           Swal.fire({ text: res.data.msg, icon: "info" });
          
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
    numerodocumento_buscar: "",
    swdni: false,
    id_trabajador: "",
    id_tipo_via: "1",
    id_estado_civil: "1",
    id_tipo_trabajador: "1",
    paterno: "",
    materno: "",
    nombres: "",
    dni: "",
    carne: "",
    pasaporte: "",
    libreta: "",
    sexo: "M",
    nacimiento: "",
    lugar: "",
    domicilio: "",
    distrito: "01",
    provincia: "08",
    departamento: "06",
    fijo: "",
    celular: "",
    correo: "",
    institucional: "",
    ruc: "",
    essalud: "",
    privada: "",
    publica: "",
    arirhsp: "",
    rdp: "",
    rdl: "",
    sisper: "",
    tregistro: "",
    siga: "",
    essalud: "",
  };

  const validationSchema = Yup.object({
    paterno: Yup.string().required("Requerido"),
    materno: Yup.string().required("Requerido"),
    nombres: Yup.string().required("Requerido"),
    dni: Yup.string()
      .required("Requerido")
      .matches(/^\d{8}$/, "DNI debe tener 8 dígitos"),
    correo: Yup.string()
      .required("Requerido")
      .email("Correo personal inválido"),
    institucional: Yup.string()
    .required("Requerido")
    .matches(/^[a-zA-Z0-9._%+-]+@unj\.edu\.pe$/, "Solo se permiten correos @unj.edu.pe"),
    nacimiento: Yup.date()
      .required("La fecha es obligatoria")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Debes tener al menos 18 años"
      )
      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    celular: Yup.string().required("Requerido"),
    departamento: Yup.string().required("Requerido"),
    provincia: Yup.string().required("Requerido"),
    distrito: Yup.string().required("Requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      guardar(values);
    },
  });

  return (
    <Dashboard
      componente={
        <TrabajadorForm
          {...formik}
          listadepartamento={listadepartamento}
          listaprovincia={listaprovincia}
          listadistrito={listadistrito}
          listaestadocivil={listaestadocivil}
          listavia={listavia}
          buscar_dni={buscar_dni}
          get_lista_provincia={get_lista_provincia}
          get_lista_distrito={get_lista_distrito}
        />
      }
    />
  );
};

export default TrabajadorRegistrar;
